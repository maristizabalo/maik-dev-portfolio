import { getSupabaseAdmin } from "@/lib/supabase/server";
import { getClientIp, hashValue, getGeo } from "@/lib/request";
import {
  isBot,
  detectDevice,
  detectOs,
  detectBrowser,
  classifySource,
} from "./events";

export type IngestMeta = {
  locale?: string;
  theme?: string;
  referrer?: string | null;
  source?: string | null;
  screenW?: number;
  screenH?: number;
  viewportW?: number;
  viewportH?: number;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  utm_term?: string | null;
  entryPath?: string;
};

export async function resolveVisitorAndSession(
  headers: Headers,
  sessionId: string,
  meta: IngestMeta,
): Promise<{ visitorId: string; sessionId: string } | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const userAgent = headers.get("user-agent");
  if (isBot(userAgent)) return null;

  const ip = getClientIp(headers);
  const visitorHash = hashValue(`${ip}:${userAgent ?? ""}`);
  const geo = getGeo(headers);
  const device = detectDevice(userAgent ?? "");
  const os = detectOs(userAgent ?? "");
  const browser = detectBrowser(userAgent ?? "");

  const { data: visitor } = await supabase
    .from("visitors")
    .upsert(
      {
        visitor_hash: visitorHash,
        last_seen_at: new Date().toISOString(),
        country_code: geo.country,
        region: geo.region,
        city: geo.city,
        timezone: geo.timezone,
        language: meta.locale ?? null,
        device_type: device,
        os,
        browser,
        screen_width: meta.screenW ?? null,
        screen_height: meta.screenH ?? null,
      },
      { onConflict: "visitor_hash" },
    )
    .select("id")
    .single();

  if (!visitor) return null;

  await supabase.from("sessions").upsert(
    {
      id: sessionId,
      visitor_id: visitor.id,
      referrer: meta.referrer ?? null,
      source: meta.source ?? classifySource(meta.referrer ?? null),
      utm_source: meta.utm_source ?? null,
      utm_medium: meta.utm_medium ?? null,
      utm_campaign: meta.utm_campaign ?? null,
      utm_content: meta.utm_content ?? null,
      utm_term: meta.utm_term ?? null,
      locale: meta.locale ?? null,
      theme: meta.theme ?? null,
      country_code: geo.country,
      city: geo.city,
      device_type: device,
      os,
      browser,
      viewport_width: meta.viewportW ?? null,
      viewport_height: meta.viewportH ?? null,
      entry_path: meta.entryPath ?? null,
    },
    { onConflict: "id", ignoreDuplicates: false },
  );

  return { visitorId: visitor.id as string, sessionId };
}
