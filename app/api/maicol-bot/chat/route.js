import { NextResponse } from "next/server";
import { getMaicolBotFallbackAnswer } from "@/lib/maicol-bot-fallback";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const locale = typeof body.locale === "string" ? body.locale : "es";

  if (!message) {
    return NextResponse.json({
      answer: "Escríbeme una pregunta sobre Maicol y te respondo con gusto.",
      allowed: true,
      source: "local_fallback",
    });
  }

  const apiUrl = process.env.MAICOL_BOT_API_URL || "http://localhost:8000";

  try {
    const response = await fetch(`${apiUrl}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, locale }),
      cache: "no-store",
      signal: AbortSignal.timeout(4500),
    });

    if (!response.ok) {
      throw new Error(`Maicol Bot API responded with ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json({
      answer: data.answer,
      allowed: data.allowed,
      source: data.source || "local_knowledge",
    });
  } catch (error) {
    console.warn("Maicol Bot API unavailable, using local fallback.", error);
    return NextResponse.json(getMaicolBotFallbackAnswer({ message, locale }));
  }
}
