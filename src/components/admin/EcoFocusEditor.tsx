"use client";
import { useEffect, useState } from "react";

interface FocusArea {
  id: number;
  icon: string;
  title: string;
  description: string;
  vurgu: string;
  is_active: boolean;
}

export default function EcoFocusEditor() {
  const [focusAreas, setFocusAreas] = useState<FocusArea[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/eco/focus", { cache: "no-store" });
    const json = await res.json();
    setFocusAreas(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveFocus = async (focus: FocusArea) => {
    const res = await fetch("/api/eco/focus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(focus),
    });
    const json = await res.json();
    setFocusAreas(focusAreas.map((f) => (f.id === focus.id ? json : f)));
  };

  const addFocus = async () => {
    const res = await fetch("/api/eco/focus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        icon: "BoltIcon",
        title: "Yeni Odak Alanı",
        description: "",
        vurgu: "text-red-500",
        is_active: true,
      }),
    });
    const json = await res.json();
    setFocusAreas([...focusAreas, json]);
  };

  const deleteFocus = async (id: number) => {
    await fetch("/api/eco/focus", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setFocusAreas(focusAreas.filter((f) => f.id !== id));
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">Sürdürülebilirlik Odak Alanları Editor</h2>
      <button onClick={addFocus} className="px-4 py-2 bg-red-600 text-white rounded">
        + Yeni Odak Alanı
      </button>

      {focusAreas.map((f) => (
        <div key={f.id} className="border border-neutral-700 p-4 rounded space-y-2">
          <input
            value={f.icon}
            onChange={(e) =>
              setFocusAreas(focusAreas.map((fa) => (fa.id === f.id ? { ...fa, icon: e.target.value } : fa)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Icon adı"
          />
          <input
            value={f.title}
            onChange={(e) =>
              setFocusAreas(focusAreas.map((fa) => (fa.id === f.id ? { ...fa, title: e.target.value } : fa)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Başlık"
          />
          <textarea
            value={f.description}
            onChange={(e) =>
              setFocusAreas(focusAreas.map((fa) => (fa.id === f.id ? { ...fa, description: e.target.value } : fa)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Açıklama"
          />
          <input
            value={f.vurgu}
            onChange={(e) =>
              setFocusAreas(focusAreas.map((fa) => (fa.id === f.id ? { ...fa, vurgu: e.target.value } : fa)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Vurgu rengi"
          />
          <label className="flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={f.is_active}
              onChange={(e) =>
                setFocusAreas(focusAreas.map((fa) => (fa.id === f.id ? { ...fa, is_active: e.target.checked } : fa)))
              }
            />
            Aktif mi?
          </label>
          <div className="flex gap-2">
            <button onClick={() => saveFocus(f)} className="px-3 py-1 bg-green-600 text-white rounded">
              Kaydet
            </button>
            <button onClick={() => deleteFocus(f.id)} className="px-3 py-1 bg-red-700 text-white rounded">
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}