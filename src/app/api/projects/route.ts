// app/api/projects/route.ts

import { NextResponse } from "next/server";
// DÜZELTME 1: createRouteHandlerClient'ı doğru şekilde import edin
import { createRouteHandlerClient } from "@/lib/supabase/server";

const TABLE = "projects";

// DÜZELTME 2: Her metot içinde supabase istemcisini oluşturun
export async function GET() {
  const supabase = createRouteHandlerClient(); // Supabase istemcisi oluşturuldu

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("order", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// DÜZELTME 2: Her metot içinde supabase istemcisini oluşturun
export async function POST(req: Request) {
  const supabase = createRouteHandlerClient(); // Supabase istemcisi oluşturuldu
  
  const body = await req.json();
  const { error } = await supabase.from(TABLE).insert([body]);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DÜZELTME 2: Her metot içinde supabase istemcisini oluşturun
export async function PUT(req: Request) {
  const supabase = createRouteHandlerClient(); // Supabase istemcisi oluşturuldu

  const body = await req.json();
  const { id, ...rest } = body;
  
  const { error } = await supabase.from(TABLE).update(rest).eq("id", id);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DÜZELTME 2: Her metot içinde supabase istemcisini oluşturun
export async function DELETE(req: Request) {
  const supabase = createRouteHandlerClient(); // Supabase istemcisi oluşturuldu

  const body = await req.json();
  const { id } = body;
  
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}