"use client";
import { useEffect, useState } from "react";
import { uploadImage } from "@/lib/supabase/uploadImage";
import { mutate } from "swr";

// TypeScript Arayüzleri
type IncomingProject = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  order?: number;
  status: string;
};

type UiProject = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  order?: number;
  status: "active" | "inactive"; // Durum tiplerini kısıtladık
};

// Vurgu renkleri (red)
const ACCENT_PRIMARY_CLASS = "bg-red-600 hover:bg-red-500";
const ACCENT_SECONDARY_CLASS = "bg-blue-600 hover:bg-blue-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-700";
const CARD_BG_CLASS = "bg-neutral-800";
const BORDER_CLASS = "border-neutral-700";

export default function ProjectEditor() {
  const [projects, setProjects] = useState<UiProject[]>([]);
  const [newProject, setNewProject] = useState<UiProject>({
    id: 0,
    title: "",
    description: "",
    image_url: "",
    order: 0,
    status: "active",
  });
  const [editing, setEditing] = useState<UiProject | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true); // Yükleme state'i eklendi
  const [error, setError] = useState<string | null>(null); // Hata state'i eklendi

  // Veri çekme (fetch) işlemi
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/projects")
      .then((res) => {
        if (!res.ok) throw new Error("Projeler yüklenirken hata oluştu.");
        return res.json();
      })
      .then((data: IncomingProject[]) => {
        const mapped = data.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image_url: p.image_url,
          order: p.order ?? 0,
          status: p.status as UiProject["status"],
        }));
        setProjects(mapped.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Yeni Proje Ekleme
  const addProject = async () => {
    setSaving(true);
    setError(null);
    const { id, ...payload } = newProject; // id alanını gönderme

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? `Hata kodu: ${res.status}`);
      }

      const created: IncomingProject = await res.json();
      const newUiProject: UiProject = {
        ...created,
        status: created.status as UiProject["status"],
        order: created.order ?? 0,
      };
      
      setProjects((prev) => [...prev, newUiProject].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
      setNewProject({ id: 0, title: "", description: "", image_url: "", status: "active", order: 0 });
      mutate("/api/projects");
    } catch (err) {
      setError(`Proje eklenemedi: ${err instanceof Error ? err.message : "Bilinmeyen Hata"}`);
    } finally {
      setSaving(false);
    }
  };

  // Proje Silme
  const deleteProject = async (id: number) => {
    const confirmed = confirm("Bu projeyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz!");
    if (!confirmed) return;
    
    try {
        const res = await fetch("/api/projects", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        
        if (!res.ok) throw new Error("Silme başarısız.");
        
        setProjects((prev) => prev.filter((p) => p.id !== id));
        mutate("/api/projects");
    } catch (err) {
        setError("Silme işlemi başarısız oldu.");
    }
  };

  // Sıralamayı Güncelleme
  const updateOrder = async () => {
    setSaving(true);
    try {
        // Sıralamayı doğru şekilde kaydetmek için sadece order alanını göndermek daha verimli olabilir
        // Ancak mevcut API yapınıza uyum sağlamak için tüm projeyi gönderiyorum:
        for (const project of projects) {
            const payload: IncomingProject = {
                id: project.id,
                title: project.title,
                description: project.description,
                image_url: project.image_url,
                order: project.order,
                status: project.status,
            };
            await fetch("/api/projects", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        }
        alert("Sıralama başarıyla güncellendi.");
        mutate("/api/projects");
    } catch (e) {
        alert("Sıralama güncellenirken hata oluştu.");
    } finally {
        setSaving(false);
    }
  };

  // Proje Düzenleme (PUT)
  const updateProject = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);

    const payload: IncomingProject = {
      id: editing.id,
      title: editing.title,
      description: editing.description,
      image_url: editing.image_url,
      order: editing.order,
      status: editing.status,
    };

    try {
        const res = await fetch("/api/projects", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err?.error || "Güncelleme başarısız.");
        }

        const returned: IncomingProject = await res.json();
        const updated: UiProject = {
            id: returned.id,
            title: returned.title,
            description: returned.description,
            image_url: returned.image_url,
            order: returned.order ?? 0,
            status: returned.status as UiProject["status"],
        };

        setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setEditing(null);
        mutate("/api/projects");
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
            Projeler yükleniyor...
        </p>
    </div>
  );

  return (
    // Ana Kapsayıcı
    <section className={`p-8 rounded-xl shadow-2xl text-white border ${BORDER_CLASS} ${CARD_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b ${BORDER_CLASS} pb-2 ${TEXT_ACCENT_CLASS}`}>
        💼 Proje Yönetimi
      </h2>

      {/* Hata Mesajı */}
      {error && (
        <div className="p-3 mb-6 rounded-lg font-medium bg-red-600/30 border border-red-500 text-red-300">
          Hata: {error}
        </div>
      )}

      {/* 1. Proje Kartları (Liste) */}
      <h3 className="text-xl font-semibold mb-4 text-neutral-200">Mevcut Projeler ({projects.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {projects.map((p) => (
          <div key={p.id} className={`p-4 rounded-lg relative border ${BORDER_CLASS} bg-neutral-700/50 shadow-md transition hover:bg-neutral-700`}>
            {/* Durum Etiketi */}
            <span className={`absolute top-0 right-0 m-1 px-2 py-1 text-xs rounded-full font-semibold ${
                p.status === 'active' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}>
                {p.status === 'active' ? 'AKTİF' : 'PASİF'}
            </span>

            {p.image_url && (
              <img
                src={p.image_url}
                alt={p.title}
                className="w-full h-32 object-cover rounded mb-3 border border-neutral-600"
              />
            )}
            
            <p className="text-lg font-bold text-red-300">{p.title}</p>
            <p className="text-sm text-neutral-400 mb-2 truncate">{p.description}</p>
            
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-600">
                {/* Sıra Alanı */}
                <div className="flex items-center gap-2">
                    <label className="text-xs text-neutral-400">Sıra:</label>
                    <input
                        type="number"
                        value={p.order ?? 0}
                        onChange={(e) => {
                            const value = parseInt(e.target.value);
                            const updated = projects.map((item) =>
                                item.id === p.id
                                    ? { ...item, order: isNaN(value) ? 0 : value }
                                    : item
                            );
                            setProjects(updated);
                        }}
                        className={`w-16 border ${BORDER_CLASS} p-1 rounded-md text-sm ${INPUT_BG_CLASS} text-white text-center focus:ring-red-500`}
                        placeholder="0"
                    />
                </div>
                
                {/* Aksiyon Butonları */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setEditing(p)}
                        className="text-sm text-blue-400 hover:text-blue-300 font-medium transition"
                    >
                        Düzenle
                    </button>
                    <button
                        onClick={() => deleteProject(p.id)}
                        className="text-sm text-red-400 hover:text-red-300 font-medium transition"
                    >
                        Sil
                    </button>
                </div>
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

      {/* 2. Düzenleme Alanı */}
      {editing && (
        <div className={`p-6 rounded-lg mt-6 space-y-4 border ${BORDER_CLASS} bg-neutral-800 shadow-xl`}>
          <h3 className={`text-xl font-semibold border-b ${BORDER_CLASS} pb-2 text-red-400`}>
            ✏️ "{editing.title}" Projesini Düzenle
          </h3>
          
          <label htmlFor="edit_title" className="block text-sm font-medium text-neutral-300">Proje Adı</label>
          <input
            id="edit_title"
            type="text"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            placeholder="Proje Adı"
            disabled={saving}
          />
          
          <label htmlFor="edit_desc" className="block text-sm font-medium text-neutral-300">Görev/Açıklama</label>
          <textarea
            id="edit_desc"
            rows={3}
            value={editing.description}
            onChange={(e) => setEditing({ ...editing, description: e.target.value })}
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            placeholder="Proje hakkında detaylı açıklama"
            disabled={saving}
          />
          
          <label htmlFor="edit_status" className="block text-sm font-medium text-neutral-300">Durum</label>
          <select
            id="edit_status"
            value={editing.status}
            onChange={(e) => setEditing({ ...editing, status: e.target.value as UiProject['status'] })}
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            disabled={saving}
          >
            <option value="active">✅ Aktif</option>
            <option value="inactive">🚫 Pasif</option>
          </select>
          
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
                    className="w-full h-48 object-cover rounded-lg border border-neutral-600"
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
              onClick={updateProject}
              disabled={saving}
              className={`
                bg-green-600 text-white px-6 py-2 rounded-lg font-semibold 
                hover:bg-green-700 disabled:opacity-50 transition
              `}
            >
              {saving ? "💾 Kaydediliyor..." : "Değişiklikleri Kaydet"}
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

      {/* 3. Yeni Proje Ekleme Alanı */}
      <div className={`p-6 rounded-lg mt-6 space-y-4 border ${BORDER_CLASS} bg-neutral-800 shadow-xl`}>
        <h3 className={`text-xl font-semibold border-b ${BORDER_CLASS} pb-2 text-red-400`}>
            ➕ Yeni Proje Ekle
        </h3>
        
        <label htmlFor="new_title" className="block text-sm font-medium text-neutral-300">Proje Adı</label>
        <input
          id="new_title"
          type="text"
          value={newProject.title}
          onChange={(e) =>
            setNewProject({ ...newProject, title: e.target.value })
          }
          className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
          placeholder="Yeni Projenin Adı"
          disabled={saving}
        />
        
        <label htmlFor="new_desc" className="block text-sm font-medium text-neutral-300">Görev/Açıklama</label>
        <textarea
            id="new_desc"
            rows={3}
            value={newProject.description}
            onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
            }
            className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
            placeholder="Proje hakkında detaylı açıklama"
            disabled={saving}
        />

        <label htmlFor="new_status" className="block text-sm font-medium text-neutral-300">Durum</label>
        <select
          id="new_status"
          value={newProject.status}
          onChange={(e) =>
            setNewProject({ ...newProject, status: e.target.value as UiProject['status'] })
          }
          className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
          disabled={saving}
        >
          <option value="active">✅ Aktif</option>
          <option value="inactive">🚫 Pasif</option>
        </select>
        
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
            setNewProject((prev) => ({ ...prev, image_url: url }));
            setSaving(false);
          }}
          className={`w-full text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-red-500 file:text-white hover:file:bg-red-600`}
          disabled={saving}
        />

        {newProject.image_url && (
            <div className="mt-3">
                <p className="text-sm text-neutral-400 mb-1">Görsel Önizleme:</p>
                <img
                    src={newProject.image_url}
                    alt="Yüklenen görsel"
                    className="w-full h-48 object-cover rounded-lg border border-neutral-600"
                />
            </div>
        )}
        
        <label htmlFor="new_order" className="block text-sm font-medium text-neutral-300">Sıra Numarası</label>
        <input
          id="new_order"
          type="number"
          value={newProject.order ?? 0}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setNewProject({ ...newProject, order: isNaN(value) ? 0 : value });
          }}
          className={`w-full border ${BORDER_CLASS} p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500`}
          placeholder="Sıra"
          disabled={saving}
        />
        
        <button
          onClick={addProject}
          disabled={saving}
          className={`
            ${ACCENT_PRIMARY_CLASS} text-white px-6 py-2 rounded-lg font-semibold 
            hover:bg-red-500 transition disabled:opacity-50
          `}
        >
          {saving ? "➕ Ekleniyor..." : "Proje Ekle"}
        </button>
      </div>
    </section>
  );
}