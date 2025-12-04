"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type CorporateValue = {
  id: number;
  title: string;
  description: string;
  icon?: string;
  color_class?: string;
  shadow_class?: string;
  order_index?: number;
  is_active?: boolean;
};

export default function DegerlerimizEditor() {
  const [values, setValues] = useState<CorporateValue[]>([]);
  const [editedValues, setEditedValues] = useState<Record<number, Partial<CorporateValue>>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValues = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("corporate_values")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      setError(error.message);
      setValues([]);
    } else {
      setValues(data ?? []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchValues();
  }, []);

  const addValue = async () => {
    const { error } = await supabase.from("corporate_values").insert([
      {
        title: "Yeni Değer",
        description: "Açıklama buraya...",
        icon: "SparklesIcon",
        order_index: values.length + 1,
        is_active: true,
      },
    ]);
    if (error) setError(error.message);
    else fetchValues();
  };

  const handleEdit = (id: number, field: keyof CorporateValue, value: any) => {
    setEditedValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleSave = async (id: number) => {
    const updates = editedValues[id];
    if (!updates) return;

    const { error } = await supabase
      .from("corporate_values")
      .update(updates)
      .eq("id", id);

    if (error) setError(error.message);
    else {
      setEditedValues((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      fetchValues();
    }
  };

  const deleteValue = async (id: number) => {
    const { error } = await supabase.from("corporate_values").delete().eq("id", id);
    if (error) setError(error.message);
    else fetchValues();
  };

  if (loading) return <p className="text-neutral-400">Yükleniyor...</p>;
  if (error) return <p className="text-red-500">Hata: {error}</p>;

  return (
    <div className="space-y-6">
      <button
        onClick={addValue}
        className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-500"
      >
        + Yeni Değer Ekle
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        {values.map((val) => {
          const edited = editedValues[val.id] || {};
          return (
            <div
              key={val.id}
              className="p-6 bg-neutral-800 rounded-lg border border-neutral-700 shadow space-y-3"
            >
              <input
                type="text"
                value={edited.title ?? val.title}
                onChange={(e) => handleEdit(val.id, "title", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <textarea
                value={edited.description ?? val.description}
                onChange={(e) => handleEdit(val.id, "description", e.target.value)}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <input
                type="text"
                value={edited.icon ?? val.icon ?? ""}
                onChange={(e) => handleEdit(val.id, "icon", e.target.value)}
                placeholder="Icon adı (örn: SparklesIcon)"
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
              />
              <input
                type="number"
                value={edited.order_index ?? val.order_index ?? 0}
                onChange={(e) => handleEdit(val.id, "order_index", Number(e.target.value))}
                className="w-full p-2 bg-neutral-900 border border-neutral-700 rounded text-white"
                placeholder="Sıralama"
              />
              <label className="flex items-center gap-2 text-neutral-300">
                <input
                  type="checkbox"
                  checked={edited.is_active ?? val.is_active ?? true}
                  onChange={(e) => handleEdit(val.id, "is_active", e.target.checked)}
                />
                Aktif mi?
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(val.id)}
                  disabled={!editedValues[val.id]}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => deleteValue(val.id)}
                  className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600"
                >
                  Sil
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}