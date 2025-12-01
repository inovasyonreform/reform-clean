import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TABLE = "team_members";

export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("id", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabase.from(TABLE).insert([body]).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]); // yeni kaydı döndür
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...rest } = body; 
  const { data, error } = await supabase.from(TABLE).update(rest).eq("id", id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]); // güncellenen kaydı döndür
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}