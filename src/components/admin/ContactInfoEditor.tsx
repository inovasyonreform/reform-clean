"use client";
import { useEffect, useState } from "react";

interface ContactInfo {
  id: number;
  icon: string;
  title: string;
  details: string[];
  link_prefix?: string;
  map_link?: string;
  is_active: boolean;
}

export default function ContactInfoEditor() {
  const [infos, setInfos] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/contact/info", { cache: "no-store" });
    const json = await res.json();
    setInfos(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveInfo = async (info: ContactInfo) => {
    const res = await fetch("/api/contact/info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
    });
    const json = await res.json();
    setInfos(infos.map((i) => (i.id === info.id ? json : i)));
  };

  const addInfo = async () => {
    const res = await fetch("/api/contact/info", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        icon: "PhoneIcon",
        title: "Yeni İletişim Bilgisi",
        details: ["Detay 1", "Detay 2"],
        link_prefix: "tel:",
        is_active: true,
      }),
    });
    const json = await res.json();
    setInfos([...infos, json]);
  };

  const deleteInfo = async (id: number) => {
    await fetch("/api/contact/info", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setInfos(infos.filter((i) => i.id !== id));
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">İletişim Bilgileri Editor</h2>
      <button onClick={addInfo} className="px-4 py-2 bg-red-600 text-white rounded">
        + Yeni Bilgi
      </button>

      {infos.map((i) => (
        <div key={i.id} className="border border-neutral-700 p-4 rounded space-y-2">
          <input
            value={i.icon}
            onChange={(e) =>
              setInfos(infos.map((ci) => (ci.id === i.id ? { ...ci, icon: e.target.value } : ci)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Icon adı"
          />
          <input
            value={i.title}
            onChange={(e) =>
              setInfos(infos.map((ci) => (ci.id === i.id ? { ...ci, title: e.target.value } : ci)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Başlık"
          />
          <textarea
            value={i.details.join("\n")}
            onChange={(e) =>
              setInfos(infos.map((ci) => (ci.id === i.id ? { ...ci, details: e.target.value.split("\n") } : ci)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Detaylar (her satır ayrı)"
          />
          <input
            value={i.link_prefix || ""}
            onChange={(e) =>
              setInfos(infos.map((ci) => (ci.id === i.id ? { ...ci, link_prefix: e.target.value } : ci)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Link prefix (tel:, mailto:)"
          />
          <input
            value={i.map_link || ""}
            onChange={(e) =>
              setInfos(infos.map((ci) => (ci.id === i.id ? { ...ci, map_link: e.target.value } : ci)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Harita linki"
          />
          <label className="flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={i.is_active}
              onChange={(e) =>
                setInfos(infos.map((ci) => (ci.id === i.id ? { ...ci, is_active: e.target.checked } : ci)))
              }
            />
            Aktif mi?
          </label>
          <div className="flex gap-2">
            <button onClick={() => saveInfo(i)} className="px-3 py-1 bg-green-600 text-white rounded">
              Kaydet
            </button>
            <button onClick={() => deleteInfo(i.id)} className="px-3 py-1 bg-red-700 text-white rounded">
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}