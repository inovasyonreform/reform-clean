import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TABLE = "blog_posts";

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

  const { data, error } = await supabase.from(TABLE).insert([body]).select();
  console.log("Gelen veri:", body);

  if (error) return new Response(error.message, { status: 500 });
  return NextResponse.json(data[0]);
}

export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...rest } = body;

  const { data, error } = await supabase
    .from(TABLE)
    .update(rest)
    .eq("id", id)
    .select(); // güncellenen satırı döndür

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data[0]); // tek kaydı döndür
}

export async function DELETE(req: Request) {
  const body = await req.json();
  const { id } = body;

  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}