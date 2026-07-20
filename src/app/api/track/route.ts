import { trackSchema } from "@/lib/analytics/schema";
import { resolveVisitorAndSession } from "@/lib/analytics/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isAnalyticsEnabled } from "@/lib/env";
import { rateLimit } from "@/lib/rate-limit";
import { getClientIp } from "@/lib/request";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAnalyticsEnabled()) return Response.json({ ok: true });

  const ip = getClientIp(request.headers);
  if (!rateLimit(`track:${ip}`, 120, 60_000)) {
    return Response.json({ ok: false }, { status: 429 });
  }

  const parsed = trackSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });

  const { sessionId, meta, events } = parsed.data;

  try {
    const resolved = await resolveVisitorAndSession(
      request.headers,
      sessionId,
      meta ?? {},
    );
    const supabase = getSupabaseAdmin();
    if (!resolved || !supabase) return Response.json({ ok: true });

    const pageViews = events
      .filter((event) => event.name === "page_view")
      .map((event) => ({
        session_id: sessionId,
        visitor_id: resolved.visitorId,
        path: event.path,
        locale: meta?.locale ?? null,
      }));

    const others = events
      .filter((event) => event.name !== "page_view")
      .map((event) => ({
        session_id: sessionId,
        visitor_id: resolved.visitorId,
        name: event.name,
        category: event.category ?? null,
        label: event.label ?? null,
        path: event.path,
        locale: meta?.locale ?? null,
        theme: meta?.theme ?? null,
        value: event.value ?? null,
        metadata: event.metadata ?? {},
      }));

    if (pageViews.length > 0) await supabase.from("page_views").insert(pageViews);
    if (others.length > 0) await supabase.from("events").insert(others);
  } catch {
    /* analytics must never break the site */
  }

  return Response.json({ ok: true });
}
