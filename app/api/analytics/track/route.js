import { NextResponse } from "next/server";
import { trackVisit } from "@/lib/analytics/analytics-store";
import {
  createVisitId,
  detectBrowser,
  detectDevice,
  detectOs,
  getBogotaDateParts,
  getClientIp,
  getCountry,
  hashIp,
  isAnalyticsEnabled,
} from "@/lib/analytics/request-utils";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    if (!isAnalyticsEnabled()) {
      return NextResponse.json({ success: true });
    }

    const body = await request.json().catch(() => ({}));
    const path = typeof body.path === "string" ? body.path.slice(0, 300) : "/";
    const locale = typeof body.locale === "string" ? body.locale.slice(0, 12) : "unknown";
    const referrer = typeof body.referrer === "string" && body.referrer ? body.referrer.slice(0, 500) : null;
    const userAgent = request.headers.get("user-agent");
    const { date, time } = getBogotaDateParts();
    const ip = getClientIp(request.headers);

    await trackVisit({
      id: createVisitId(),
      createdAt: new Date().toISOString(),
      date,
      time,
      path,
      locale,
      referrer,
      userAgent,
      device: detectDevice(userAgent || ""),
      browser: detectBrowser(userAgent || ""),
      os: detectOs(userAgent || ""),
      country: getCountry(request.headers),
      ipHash: hashIp(ip),
    });
  } catch (error) {
    console.error("Analytics tracking failed", error);
  }

  return NextResponse.json({ success: true });
}
