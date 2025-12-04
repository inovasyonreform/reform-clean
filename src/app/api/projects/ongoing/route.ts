import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/server";

const supabaseAdmin = createRouteHandlerClient();

const TABLE = "ongoing_projects";

// Listeleme (aktif projeler)
export async function GET() {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select("*")
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

// Yeni proje ekleme
export async function POST(req: Request) {
  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .insert(body)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// Proje güncelleme
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, ...fields } = body;

  if (!id) {
    return NextResponse.json({ error: "id gerekli" }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .update(fields)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// Proje silme
export async function DELETE(req: Request) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "id gerekli" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}