import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadImage(file: File) {
  const fileName = `${Date.now()}-${file.name}`;
  const { error } = await supabase.storage
    .from("images") // ✅ bucket adını kendine göre değiştir
    .upload(fileName, file);

  if (error) throw error;

  const { data } = supabase.storage.from("images").getPublicUrl(fileName);
  return data.publicUrl; // ✅ image_url alanına kaydedilecek link
}