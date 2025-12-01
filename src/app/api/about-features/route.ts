// app/api/about-features/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: list features (sorted by order asc, then id asc)
export async function GET() {
  const { data, error } = await supabase
    .from("about_features")
    .select("*")
    .order("order", { ascending: true, nullsFirst: true })
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data ?? []);
}

// POST: create feature
// body: { text: string, order?: number, about_id?: number }
export async function POST(req: Request) {
  const body = await req.json();

  if (typeof body?.text !== "string" || body.text.trim().length === 0) {
    return NextResponse.json({ error: "text is required" }, { status: 400 });
  }

  // Optional: default order to max(order)+1
  let payload = { text: body.text.trim() } as {
    text: string;
    order?: number | null;
    about_id?: number;
  };

  if (typeof body.order === "number") {
    payload.order = body.order;
  } else {
    // get next order
    const { data: maxRows } = await supabase
      .from("about_features")
      .select("order")
      .order("order", { ascending: false })
      .limit(1);

    const nextOrder =
      (Array.isArray(maxRows) && typeof maxRows[0]?.order === "number"
        ? maxRows[0].order + 1
        : 1);
    payload.order = nextOrder;
  }

  if (typeof body.about_id === "number") {
    payload.about_id = body.about_id;
  }

  const { data, error } = await supabase
    .from("about_features")
    .insert([payload])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// PUT: update feature
// body: { id: number, text?: string, order?: number, about_id?: number }
export async function PUT(req: Request) {
  const body = await req.json();

  if (typeof body?.id !== "number") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const update: Record<string, unknown> = {};

  if (typeof body.text === "string") {
    update.text = body.text.trim();
  }
  if (typeof body.order === "number") {
    update.order = body.order;
  }
  if (typeof body.about_id === "number") {
    update.about_id = body.about_id;
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "no fields to update" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("about_features")
    .update(update)
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

// DELETE: remove feature
// body: { id: number }
export async function DELETE(req: Request) {
  const body = await req.json();

  if (typeof body?.id !== "number") {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  // Return deleted row for optimistic UI
  const { data, error } = await supabase
    .from("about_features")
    .delete()
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}