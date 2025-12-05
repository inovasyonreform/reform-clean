import { NextResponse } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase/server";

const supabaseAdmin = createRouteHandlerClient();

export async function PUT(req: Request) {
  const updates = await req.json(); // [{ id, sort_order }]
  const promises = updates.map((item: { id: number; sort_order: number }) =>
    supabaseAdmin.from("home_blog_posts").update({ sort_order: item.sort_order }).eq("id", item.id)
  );

  try {
    await Promise.all(promises);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Sıralama güncellenemedi" }, { status: 500 });
  }
}