import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ submissions: [] });

  const { data } = await supabase
    .from("contact_submissions")
    .select("id,name,email,company,project_type,budget_range,message,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ submissions: data ?? [] });
}

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "read", "replied", "archived", "spam"]),
});

export async function PATCH(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: false }, { status: 503 });

  const parsed = patchSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 });

  await supabase
    .from("contact_submissions")
    .update({ status: parsed.data.status })
    .eq("id", parsed.data.id);

  return NextResponse.json({ ok: true });
}
