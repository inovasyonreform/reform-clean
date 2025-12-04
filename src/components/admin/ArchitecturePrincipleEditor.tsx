"use client";
import { useEffect, useState } from "react";

interface Principle {
  id: number;
  icon: string;
  title: string;
  description: string;
  vurgu: string;
  is_active: boolean;
}

export default function ArchitecturePrinciplesEditor() {
  const [principles, setPrinciples] = useState<Principle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/architecture/principles", { cache: "no-store" });
    const json = await res.json();
    setPrinciples(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const savePrinciple = async (principle: Principle) => {
    const res = await fetch("/api/architecture/principles", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(principle),
    });
    const json = await res.json();
    setPrinciples(principles.map((p) => (p.id === principle.id ? json : p)));
  };

  const addPrinciple = async () => {
    const res = await fetch("/api/architecture/principles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        icon: "CubeTransparentIcon",
        title: "Yeni Prensip",
        description: "",
        vurgu: "text-red-500",
        is_active: true,
      }),
    });
    const json = await res.json();
    setPrinciples([...principles, json]);
  };

  const deletePrinciple = async (id: number) => {
    await fetch("/api/architecture/principles", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPrinciples(principles.filter((p) => p.id !== id));
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">Modern Mimari Prensipler Editor</h2>
      <button onClick={addPrinciple} className="px-4 py-2 bg-red-600 text-white rounded">
        + Yeni Prensip
      </button>

      {principles.map((p) => (
        <div key={p.id} className="border border-neutral-700 p-4 rounded space-y-2">
          <input
            value={p.icon}
            onChange={(e) =>
              setPrinciples(principles.map((pr) => (pr.id === p.id ? { ...pr, icon: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Icon adı"
          />
          <input
            value={p.title}
            onChange={(e) =>
              setPrinciples(principles.map((pr) => (pr.id === p.id ? { ...pr, title: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Başlık"
          />
          <textarea
            value={p.description}
            onChange={(e) =>
              setPrinciples(principles.map((pr) => (pr.id === p.id ? { ...pr, description: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Açıklama"
          />
          <input
            value={p.vurgu}
            onChange={(e) =>
              setPrinciples(principles.map((pr) => (pr.id === p.id ? { ...pr, vurgu: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Vurgu rengi"
          />
          <label className="flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={p.is_active}
              onChange={(e) =>
                setPrinciples(principles.map((pr) => (pr.id === p.id ? { ...pr, is_active: e.target.checked } : pr)))
              }
            />
            Aktif mi?
          </label>
          <div className="flex gap-2">
            <button onClick={() => savePrinciple(p)} className="px-3 py-1 bg-green-600 text-white rounded">
              Kaydet
            </button>
            <button onClick={() => deletePrinciple(p.id)} className="px-3 py-1 bg-red-700 text-white rounded">
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}