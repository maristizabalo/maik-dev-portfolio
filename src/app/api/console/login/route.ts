import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyPassword } from "@/lib/console/password";
import { createSessionToken, CONSOLE_COOKIE } from "@/lib/console/session";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({ password: z.string().min(1).max(200) });

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!rateLimit(`console-login:${ip}`, 6, 5 * 60_000)) {
    return NextResponse.json({ error: "Too many attempts" }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  const hash = process.env.CONSOLE_PASSWORD_HASH;
  if (!hash || !verifyPassword(parsed.data.password, hash)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(CONSOLE_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: Number(process.env.CONSOLE_SESSION_HOURS || 12) * 3600,
  });
  return response;
}
