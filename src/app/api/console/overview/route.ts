import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { EMPTY_OVERVIEW, periodRange } from "@/lib/console/overview";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json(EMPTY_OVERVIEW);

  const { searchParams } = new URL(request.url);
  const { from, to } = periodRange(searchParams.get("period") || "30d");

  try {
    const { data, error } = await supabase.rpc("get_overview", {
      from_date: from,
      to_date: to,
    });
    if (error || !data) return NextResponse.json(EMPTY_OVERVIEW);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(EMPTY_OVERVIEW);
  }
}
