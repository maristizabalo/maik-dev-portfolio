import { sessionSchema } from "@/lib/analytics/schema";
import { resolveVisitorAndSession } from "@/lib/analytics/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { isAnalyticsEnabled } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!isAnalyticsEnabled()) return Response.json({ ok: true });

  const parsed = sessionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false }, { status: 400 });

  const { sessionId, event, meta, duration } = parsed.data;

  try {
    if (event === "start") {
      await resolveVisitorAndSession(request.headers, sessionId, meta ?? {});
    } else {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        await supabase
          .from("sessions")
          .update({
            ended_at: new Date().toISOString(),
            duration_seconds: duration ?? null,
          })
          .eq("id", sessionId);
      }
    }
  } catch {
    /* analytics must never break the site */
  }

  return Response.json({ ok: true });
}
