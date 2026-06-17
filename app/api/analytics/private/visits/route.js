import { NextResponse } from "next/server";
import { getVisits, getVisitStats } from "@/lib/analytics/analytics-store";
import { timingSafeTokenEqual } from "@/lib/analytics/request-utils";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const expectedToken = process.env.ANALYTICS_ADMIN_TOKEN;
  const receivedToken = request.headers.get("x-analytics-token");

  if (!timingSafeTokenEqual(receivedToken, expectedToken)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") || 50);
  const page = Number(searchParams.get("page") || 1);
  const [visitPage, stats] = await Promise.all([getVisits({ limit, page }), getVisitStats()]);

  return NextResponse.json({
    visits: visitPage.visits,
    pagination: {
      total: visitPage.total,
      limit: visitPage.limit,
      page: visitPage.page,
    },
    stats,
  });
}
