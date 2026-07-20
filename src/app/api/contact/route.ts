import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp, getGeo } from "@/lib/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().max(160).optional(),
  projectType: z.string().max(60).optional(),
  budget: z.string().max(60).optional(),
  message: z.string().min(1).max(4000),
  website: z.string().max(200).optional(),
});

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  if (!rateLimit(`contact:${ip}`, 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = getSupabaseAdmin();
  if (supabase) {
    const geo = getGeo(request.headers);
    try {
      await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        project_type: parsed.data.projectType || null,
        budget_range: parsed.data.budget || null,
        message: parsed.data.message,
        country_code: geo.country,
      });
    } catch {
      return NextResponse.json({ error: "Storage error" }, { status: 500 });
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notify = process.env.CONTACT_NOTIFY_EMAIL;
  if (resendKey && notify) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio <onboarding@resend.dev>",
          to: notify,
          reply_to: parsed.data.email,
          subject: `Nuevo contacto: ${parsed.data.name}`,
          text: `${parsed.data.name} <${parsed.data.email}>\nEmpresa: ${parsed.data.company || "-"}\nTipo: ${parsed.data.projectType || "-"}\nPresupuesto: ${parsed.data.budget || "-"}\n\n${parsed.data.message}`,
        }),
      });
    } catch {
      /* email notification is best-effort */
    }
  }

  return NextResponse.json({ ok: true });
}
