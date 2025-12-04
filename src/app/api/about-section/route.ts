// app/api/about-section/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Tüm CRUD işlemleri için SERVICE ROLE KEY ile Supabase istemcisini oluştur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TABLE = "about_sections";

// GET: Tüm kurumsal bölümleri (Hakkımızda, Misyon, Değerler vb.) sırasına göre listele
export async function GET() {
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("order_index", { ascending: true })
    .order("id", { ascending: true }); // Aynı sıraya sahip olanları id'ye göre sırala

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(Array.isArray(data) ? data : []); 
}

// POST: Yeni bir kurumsal bölüm oluştur
// body: { title: string, slug: string, content: string, order_index?: number }
export async function POST(req: Request) {
  const body = await req.json();
  const { title, slug, content, order_index } = body;

  if (typeof title !== "string" || title.trim().length === 0 ||
      typeof slug !== "string" || slug.trim().length === 0 ||
      typeof content !== "string") {
    return NextResponse.json({ error: "title, slug ve content gereklidir." }, { status: 400 });
  }

  // Yeni kaydı ekle
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ title: title.trim(), slug: slug.trim(), content, order_index }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PUT: Var olan bir bölümü güncelle
// body: { id: number, title?: string, content?: string, order_index?: number }
export async function PUT(req: Request) {
  const body = await req.json();
  const { id, title, content, order_index } = body;

  if (typeof id !== "number") {
    return NextResponse.json({ error: "id gereklidir." }, { status: 400 });
  }

  const update: Record<string, unknown> = {};
  if (typeof title === "string") update.title = title.trim();
  if (typeof content === "string") update.content = content;
  if (typeof order_index === "number") update.order_index = order_index;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Güncellenecek alan yok." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DELETE: Bir bölümü sil
// body: { id: number }
export async function DELETE(req: Request) {
  const body = await req.json();

  if (typeof body?.id !== "number") {
    return NextResponse.json({ error: "id gereklidir." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", body.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}