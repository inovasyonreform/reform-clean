"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type WhyUsFeature = {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  color_class: string;
  border_class: string;
  order_index: number;
  is_active: boolean;
};

export default function CorporateWhyUsEditor() {
  const [features, setFeatures] = useState<WhyUsFeature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeatures = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("corporate_why_us")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      setError(error.message);
      setFeatures([]);
    } else {
      setError(null);
      setFeatures(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  const addFeature = async () => {
    const { data, error } = await supabase
      .from("corporate_why_us")
      .insert([
        {
          title: "Yeni Özellik",
          description: "Açıklama...",
          icon_name: "CheckCircleIcon",
          color_class: "text-red-500",
          border_class: "border-red-500",
          order_index: features.length + 1,
          is_active: true,
        },
      ])
      .select("*"); // eklenen kaydı geri al

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // yeni kaydı direkt state'e ekle
      setFeatures([...features, ...(data ?? [])]);
    }
  };

  const updateFeature = async (
    id: number,
    field: keyof WhyUsFeature,
    value: any
  ) => {
    const { error } = await supabase
      .from("corporate_why_us")
      .update({ [field]: value })
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // optimistik update
      setFeatures(
        features.map((f) =>
          f.id === id ? { ...f, [field]: value } : f
        )
      );
    }
  };

  const deleteFeature = async (id: number) => {
    const { error } = await supabase
      .from("corporate_why_us")
      .delete()
      .eq("id", id);

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      setFeatures(features.filter((f) => f.id !== id));
    }
  };

  if (loading) return <p className="text-neutral-400">Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      {error && <p className="text-red-500">Hata: {error}</p>}

      <button
        onClick={addFeature}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500"
      >
        + Yeni Özellik Ekle
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((f) => (
          <div
            key={f.id}
            className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 shadow space-y-3"
          >
            <input
              type="text"
              value={f.title}
              onChange={(e) => updateFeature(f.id, "title", e.target.value)}
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              placeholder="Başlık"
            />
            <textarea
              value={f.description}
              onChange={(e) =>
                updateFeature(f.id, "description", e.target.value)
              }
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              placeholder="Açıklama"
            />
            <input
              type="text"
              value={f.icon_name}
              onChange={(e) =>
                updateFeature(f.id, "icon_name", e.target.value)
              }
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              placeholder="Icon adı (örn: CheckCircleIcon)"
            />
            <input
              type="text"
              value={f.color_class}
              onChange={(e) =>
                updateFeature(f.id, "color_class", e.target.value)
              }
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              placeholder="Renk sınıfı"
            />
            <input
              type="text"
              value={f.border_class}
              onChange={(e) =>
                updateFeature(f.id, "border_class", e.target.value)
              }
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              placeholder="Border sınıfı"
            />
            <input
              type="number"
              value={f.order_index}
              onChange={(e) =>
                updateFeature(f.id, "order_index", Number(e.target.value))
              }
              className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              placeholder="Sıralama"
            />
            <label className="flex items-center gap-2 text-neutral-300">
              <input
                type="checkbox"
                checked={f.is_active}
                onChange={(e) =>
                  updateFeature(f.id, "is_active", e.target.checked)
                }
              />
              Aktif mi?
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => deleteFeature(f.id)}
                className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}