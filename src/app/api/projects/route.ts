import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

const TABLE = "projects";

export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { error } = await supabase.from(TABLE).insert([body]);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...rest } = body;
  const { error } = await supabase.from(TABLE).update(rest).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}