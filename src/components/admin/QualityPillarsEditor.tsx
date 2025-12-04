"use client";
import { useEffect, useState } from "react";

interface Pillar {
  id: number;
  icon: string;
  title: string;
  description: string;
  vurgu: string;
  is_active: boolean;
}

export default function QualityPillarsEditor() {
  const [pillars, setPillars] = useState<Pillar[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/quality/pillars", { cache: "no-store" });
    const json = await res.json();
    setPillars(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const savePillar = async (pillar: Pillar) => {
    const res = await fetch("/api/quality/pillars", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pillar),
    });
    const json = await res.json();
    setPillars(pillars.map((p) => (p.id === pillar.id ? json : p)));
  };

  const addPillar = async () => {
    const res = await fetch("/api/quality/pillars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        icon: "ShieldCheckIcon",
        title: "Yeni Kalite İlkesi",
        description: "",
        vurgu: "text-red-500",
        is_active: true,
      }),
    });
    const json = await res.json();
    setPillars([...pillars, json]);
  };

  const deletePillar = async (id: number) => {
    await fetch("/api/quality/pillars", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPillars(pillars.filter((p) => p.id !== id));
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">Kalite İlkeleri Editor</h2>
      <button onClick={addPillar} className="px-4 py-2 bg-red-600 text-white rounded">
        + Yeni İlke
      </button>

      {pillars.map((p) => (
        <div key={p.id} className="border border-neutral-700 p-4 rounded space-y-2">
          <input
            value={p.icon}
            onChange={(e) =>
              setPillars(pillars.map((pr) => (pr.id === p.id ? { ...pr, icon: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Icon adı"
          />
          <input
            value={p.title}
            onChange={(e) =>
              setPillars(pillars.map((pr) => (pr.id === p.id ? { ...pr, title: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Başlık"
          />
          <textarea
            value={p.description}
            onChange={(e) =>
              setPillars(pillars.map((pr) => (pr.id === p.id ? { ...pr, description: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Açıklama"
          />
          <input
            value={p.vurgu}
            onChange={(e) =>
              setPillars(pillars.map((pr) => (pr.id === p.id ? { ...pr, vurgu: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Vurgu rengi"
          />
          <label className="flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={p.is_active}
              onChange={(e) =>
                setPillars(pillars.map((pr) => (pr.id === p.id ? { ...pr, is_active: e.target.checked } : pr)))
              }
            />
            Aktif mi?
          </label>
          <div className="flex gap-2">
            <button onClick={() => savePillar(p)} className="px-3 py-1 bg-green-600 text-white rounded">
              Kaydet
            </button>
            <button onClick={() => deletePillar(p.id)} className="px-3 py-1 bg-red-700 text-white rounded">
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}