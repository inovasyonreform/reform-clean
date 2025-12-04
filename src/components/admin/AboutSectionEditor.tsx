"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Section = { id: number; title: string; content: string; slug: string };

export default function AboutSection({ slug }: { slug: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
     const { data, error } = await supabase
  .from("about_sections")
  .select("*")
  .eq("slug", slug)
  .single(); // tek kayıt bekleniyorsa

        setSections(data ?? null); // Section | null

      if (error) {
        console.error(error.message);
        setSections([]);
      } else {
        // Her zaman diziye çevir
        const normalized = Array.isArray(data) ? data : data ? [data as Section] : [];
        setSections(normalized);
      }
      setLoading(false);
    })();
  }, [slug]);

  if (loading) return <p>Yükleniyor…</p>;

  return (
    <div className="space-y-6">
      {sections.map((s) => (
        <article key={s.id}>
          <h2 className="text-2xl font-bold">{s.title}</h2>
          <p className="text-neutral-300">{s.content}</p>
        </article>
      ))}
      {sections.length === 0 && <p className="text-neutral-500">İçerik bulunamadı.</p>}
    </div>
  );
}