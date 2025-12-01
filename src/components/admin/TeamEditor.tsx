"use client";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/supabase/uploadImage";
import { mutate } from "swr";

// TypeScript Arayüzü
type TeamMember = {
  id: number;
  name: string;
  title: string;
  image_url: string;
  order?: number;
};

// Vurgu renkleri
const ACCENT_PRIMARY_CLASS = "bg-red-600 hover:bg-red-500";
const ACCENT_SECONDARY_CLASS = "bg-blue-600 hover:bg-blue-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-700"; // Form alanları için
const CARD_BG_CLASS = "bg-neutral-800"; // Ana kart arka planı
const BORDER_CLASS = "border-neutral-700";

export default function TeamEditor() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [newMember, setNewMember] = useState<TeamMember>({
    id: 0,
    name: "",
    title: "",
    image_url: "",
    order: 0,
  });
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Veri Çekme
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/team")
      .then((res) => {
        if (!res.ok) throw new Error("Ekip verisi yüklenemedi.");
        return res.json();
      })
      .then((data: TeamMember[]) => {
        const sorted = [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setMembers(sorted);
      })
      .catch((err) => {
        setError(err.message || "Ekip verisi yüklenirken hata oluştu.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Yeni Üye Ekleme
  const addMember = async () => {
    setSaving(true);
    setError(null);
    const { id, ...payload } = newMember;

    try {
        const res = await fetch("/api/team", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || `Hata kodu: ${res.status}`);
        }

        const created: TeamMember = await res.json();
        setMembers((prev) => [...prev, created].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        setNewMember({ id: 0, name: "", title: "", image_url: "", order: 0 });
        mutate("/api/team");
    } catch (err) {
        setError(`Üye eklenemedi: ${err instanceof Error ? err.message : "Bilinmeyen Hata"}`);
    } finally {
        setSaving(false);
    }
  };

  // Üye Silme
  const deleteMember = async (id: number) => {
    const confirmed = confirm("Bu ekip üyesini silmek istediğine emin misin?");
    if (!confirmed) return;
    setError(null);

    try {
        const res = await fetch("/api/team", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        
        if (!res.ok) throw new Error("Silme başarısız.");

        setMembers(members.filter((m) => m.id !== id));
        mutate("/api/team");
    } catch (err) {
        setError("Silme işlemi başarısız oldu.");
    }
  };

  // Sıralamayı Güncelleme
  const updateOrder = async () => {
    setSaving(true);
    setError(null);
    try {
        for (const member of members) {
            await fetch("/api/team", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(member),
            });
        }
        alert("Sıralama başarıyla güncellendi.");
        mutate("/api/team");
    } catch (e) {
        setError("Sıralama güncellenirken hata oluştu.");
    } finally {
        setSaving(false);
    }
  };

  // Üye Düzenleme (PUT)
  const updateMember = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);

    try {
        const res = await fetch("/api/team", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        
        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error || "Güncelleme başarısız.");
        }

        const updated: TeamMember = await res.json();
        setMembers((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
        setEditing(null);
        mutate("/api/team");
    } catch (err) {
        setError(`Güncelleme başarısız: ${err instanceof Error ? err.message : "Bilinmeyen Hata"}`);
    } finally {
        setSaving(false);
    }
  };

  // Yükleme durumu
  if (loading) return (
    <div className={`p-6 ${CARD_BG_CLASS} rounded-xl shadow-lg text-white ${BORDER_CLASS}`}>
        <p className="flex items-center gap-2 text-neutral-400">
            <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Ekip bilgileri yükleniyor...
        </p>
    </div>
  );

  return (
    // Ana Kapsayıcı
    <section className={`p-8 rounded-xl shadow-2xl text-white border ${BORDER_CLASS} ${CARD_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b ${BORDER_CLASS} pb-2 ${TEXT_ACCENT_CLASS}`}>
        👥 Ekibimiz Yönetimi
      </h2>

      {/* Hata Mesajı */}
      {error && (
        <div className="p-3 mb-6 rounded-lg font-medium bg-red-600/30 border border-red-500 text-red-300">
          Hata: {error}
        </div>
      )}

      {/* 1. Ekip Üyesi Kartları (Liste) */}
      <h3 className="text-xl font-semibold mb-4 text-neutral-200">Mevcut Ekip Üyeleri ({members.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {members.map((m) => (
          <div key={m.id} className={`p-4 rounded-lg relative border ${BORDER_CLASS} ${CARD_BG_CLASS} shadow-md transition hover:bg-neutral-700`}>
            
            <div className="flex gap-4 items-center">
                {m.image_url && (
                    <img
                        src={m.image_url}
                        alt={m.name}
                        className="w-20 h-20 object-cover rounded-full border-2 border-red-500 shrink-0"
                    />
                )}
                <div>
                    <p className="text-lg font-bold text-red-300">{m.name}</p>
                    <p className="text-sm text-neutral-400">{m.title}</p>
                </div>
            </div>

            {/* Aksiyon Butonları */}
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={() => setEditing(m)}
                    className="text-sm text-blue-400 hover:text-blue-300 font-medium transition"
                >
                    Düzenle
                </button>
                <button
                    onClick={() => deleteMember(m.id)}
                    className="text-sm text-red-400 hover:text-red-300 font-medium transition"
                >
                    Sil
                </button>
            </div>
            
            {/* Sıra Alanı */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neutral-600">
                <label className="text-xs text-neutral-400">Sıra:</label>
                <input
                    type="number"
                    value={m.order ?? 0}
                    onChange={(e) => {
                        const value = parseInt(e.target.value);
                        const updated = members.map((item) =>
                            item.id === m.id
                                ? { ...item, order: isNaN(value) ? 0 : value }
                                : item
                        ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
                        setMembers(updated);
                    }}
                    className={`w-16 border ${BORDER_CLASS} p-1 rounded-md text-sm ${INPUT_BG_CLASS} text-white text-center focus:ring-red-500`}
                    placeholder="0"
                />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={updateOrder}
        disabled={saving}
        className={`
          ${ACCENT_SECONDARY_CLASS} text-white font-semibold 
          px-6 py-3 rounded-lg shadow-lg 
          transition duration-200 
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {saving ? "💾 Sıralama Kaydediliyor..." : "Sıralamayı Kaydet"}
      </button>


      {/* 2. Düzenleme Formu */}
      {editing && (
        <div className={`p-6 rounded-lg mt-6 space-y-4 border ${BORDER_CLASS} bg-neutral-800 shadow-xl`}>
          <h3 className={`text-xl font-semibold border-b ${BORDER_CLASS} pb-2 ${TEXT_ACCENT_CLASS}`}>
            ✏️ "{editing.name}" Düzenle
          </h3>
          
          <label htmlFor="edit_name" className="block text-sm font-medium text-neutral-300">Ad Soyad</label>
          <input
            id="edit_name"
            type="text"
            value={editing.name}
            onChange={(e) => setEditing({ ...editing, name: e.target.value })}
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            placeholder="Ad"
            disabled={saving}
          />
          
          <label htmlFor="edit_title" className="block text-sm font-medium text-neutral-300">Görev</label>
          <input
            id="edit_title"
            type="text"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            placeholder="Görev"
            disabled={saving}
          />
          
          <label htmlFor="edit_image" className="block text-sm font-medium text-neutral-300">Görsel Yükle (Değiştirmek için)</label>
          <input
            id="edit_image"
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setSaving(true);
              const url = await uploadImage(file);
              setEditing((prev) => (prev ? { ...prev, image_url: url } : null));
              setSaving(false);
            }}
            className={`w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600`}
            disabled={saving}
          />
          
          {editing.image_url && (
            <div className="mt-3">
                <p className="text-sm text-neutral-400 mb-1">Mevcut Görsel Önizleme:</p>
                <img
                    src={editing.image_url}
                    alt="Yüklenen görsel"
                    className="w-32 h-32 object-cover rounded-full border-2 border-neutral-600"
                />
            </div>
          )}
          
          <label htmlFor="edit_order" className="block text-sm font-medium text-neutral-300">Sıra Numarası</label>
          <input
            id="edit_order"
            type="number"
            value={editing.order ?? 0}
            onChange={(e) =>
              setEditing({ ...editing, order: parseInt(e.target.value) })
            }
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            placeholder="Sıra"
            disabled={saving}
          />
          
          <div className="flex gap-3 pt-2">
            <button
              onClick={updateMember}
              disabled={saving}
              className={`
                bg-green-600 text-white px-6 py-2 rounded-lg font-semibold 
                hover:bg-green-700 disabled:opacity-50 transition
              `}
            >
              {saving ? "💾 Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className={`
                bg-neutral-600 text-white px-6 py-2 rounded-lg font-semibold 
                hover:bg-neutral-500 transition
              `}
            >
              İptal
            </button>
          </div>
        </div>
      )}

      
      {/* 3. Yeni Üye Ekleme Formu */}
      <div className={`p-6 rounded-lg mt-6 space-y-4 border ${BORDER_CLASS} bg-neutral-800 shadow-xl`}>
        <h3 className={`text-xl font-semibold border-b ${BORDER_CLASS} pb-2 ${TEXT_ACCENT_CLASS}`}>
            ➕ Yeni Üye Ekle
        </h3>
        
        <label htmlFor="new_name" className="block text-sm font-medium text-neutral-300">Ad Soyad</label>
        <input
          id="new_name"
          type="text"
          value={newMember.name}
          onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
          placeholder="Ad"
          disabled={saving}
        />
        
        <label htmlFor="new_title" className="block text-sm font-medium text-neutral-300">Görev</label>
        <input
          id="new_title"
          type="text"
          value={newMember.title}
          onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
          className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
          placeholder="Görev"
          disabled={saving}
        />
        
        <label htmlFor="new_image" className="block text-sm font-medium text-neutral-300">Görsel Yükle</label>
        <input
          id="new_image"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setSaving(true);
            const url = await uploadImage(file);
            setNewMember({ ...newMember, image_url: url });
            setSaving(false);
          }}
          className={`w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600`}
          disabled={saving}
        />
        
        {newMember.image_url && (
            <div className="mt-3">
                <p className="text-sm text-neutral-400 mb-1">Görsel Önizleme:</p>
                <img
                    src={newMember.image_url}
                    alt="Yüklenen görsel"
                    className="w-32 h-32 object-cover rounded-full border-2 border-neutral-600"
                />
            </div>
        )}

        <label htmlFor="new_order" className="block text-sm font-medium text-neutral-300">Sıra Numarası</label>
        <input
          id="new_order"
          type="number"
          value={newMember.order ?? 0}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setNewMember({ ...newMember, order: isNaN(value) ? 0 : value });
          }}
          className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
          placeholder="Sıra"
          disabled={saving}
        />
        
        <button
          onClick={addMember}
          disabled={saving || !newMember.name || !newMember.title}
          className={`
            bg-red-600 text-white px-6 py-2 rounded-lg font-semibold 
            hover:bg-red-700 transition disabled:opacity-50
          `}
        >
          {saving ? "➕ Ekleniyor..." : "Ekip Üyesi Ekle"}
        </button>
      </div>
    </section>
  );
}