import { NextResponse } from "next/server";
import { generateText } from "ai";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getModel } from "@/lib/ai/provider";
import {
  EMPTY_OVERVIEW,
  periodRange,
  type Overview,
} from "@/lib/console/overview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function facts(overview: Overview): string {
  return [
    `Visitantes: ${overview.totals.visitors}`,
    `Sesiones: ${overview.totals.sessions}`,
    `Páginas vistas: ${overview.totals.pageViews}`,
    `Tasa de rebote: ${overview.totals.bounceRate}%`,
    `Fuentes: ${overview.bySource.map((s) => `${s.label} (${s.count})`).join(", ") || "sin datos"}`,
    `Países: ${overview.byCountry.map((c) => `${c.label} (${c.count})`).join(", ") || "sin datos"}`,
    `Páginas más vistas: ${overview.topPages.map((p) => p.label).join(", ") || "sin datos"}`,
    `Chat: ${overview.chat.conversations} conversaciones, ${overview.chat.unanswered} sin responder`,
    `Contactos: ${overview.contact.total}`,
  ].join("\n");
}

function templated(overview: Overview): string {
  return `Resumen del periodo:
- ${overview.totals.visitors} visitantes en ${overview.totals.sessions} sesiones.
- ${overview.totals.pageViews} páginas vistas, rebote ${overview.totals.bounceRate}%.
- Fuente principal: ${overview.bySource[0]?.label ?? "Directo"}.
- Página más vista: ${overview.topPages[0]?.label ?? "—"}.
- Chat: ${overview.chat.conversations} conversaciones, ${overview.chat.unanswered} sin responder.
- Contactos recibidos: ${overview.contact.total}.

Conecta un proveedor de IA (AI_PROVIDER) para obtener recomendaciones en lenguaje natural.`;
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  let overview: Overview = EMPTY_OVERVIEW;

  const body = await request.json().catch(() => ({}));
  const period = typeof body.period === "string" ? body.period : "30d";

  if (supabase) {
    const { from, to } = periodRange(period);
    try {
      const { data } = await supabase.rpc("get_overview", {
        from_date: from,
        to_date: to,
      });
      if (data) overview = data as Overview;
    } catch {
      /* fall back to empty overview */
    }
  }

  const model = getModel();
  if (!model) {
    return NextResponse.json({ summary: templated(overview) });
  }

  try {
    const { text } = await generateText({
      model,
      prompt: `Eres analista del portfolio de Maicol. Con estos datos reales del periodo, escribe un resumen breve en español (máximo 8 líneas) con lo más relevante y 2-3 recomendaciones accionables. No inventes cifras.\n\n${facts(overview)}`,
      temperature: 0.4,
      maxOutputTokens: 500,
    });
    return NextResponse.json({ summary: text });
  } catch {
    return NextResponse.json({ summary: templated(overview) });
  }
}
