"use client";
import { useEffect, useState } from "react";

interface Project {
  id: number;
  title: string;
  location: string;
  status: string;
  completion: string;
  description: string;
  image_src: string;
  vurgu_color: string;
  tag: string;
  is_active: boolean;
}

export default function OngoingProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Veriyi çek
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/projects/ongoing", { cache: "no-store" });
    const json = await res.json();
    setProjects(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Backend'e kaydet
  const saveProject = async (project: Project) => {
    const res = await fetch("/api/projects/ongoing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(project),
    });
    const json = await res.json();
    setProjects(projects.map((p) => (p.id === project.id ? json : p)));
  };

  // Yeni proje ekle
  const addProject = async () => {
    const res = await fetch("/api/projects/ongoing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Yeni Proje",
        location: "",
        status: "",
        completion: "",
        description: "",
        image_src: "/refwhite.png",
        vurgu_color: "text-red-500",
        tag: "",
        is_active: true,
      }),
    });
    const json = await res.json();
    setProjects([...projects, json]);
  };

  // Sil
  const deleteProject = async (id: number) => {
    await fetch("/api/projects/ongoing", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProjects(projects.filter((p) => p.id !== id));
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">Devam Eden Projeler Editor</h2>
      <button
        onClick={addProject}
        className="px-4 py-2 bg-red-600 text-white rounded"
      >
        + Yeni Proje
      </button>

      {projects.map((p) => (
        <div key={p.id} className="border border-neutral-700 p-4 rounded space-y-2">
          <input
            value={p.title}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, title: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Başlık"
          />
          <input
            value={p.location}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, location: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Konum"
          />
          <input
            value={p.status}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, status: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Durum"
          />
          <input
            value={p.completion}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, completion: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Tamamlanma"
          />
          <textarea
            value={p.description}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, description: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Açıklama"
          />
          <input
            value={p.image_src}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, image_src: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Görsel yolu"
          />
          <input
            value={p.vurgu_color}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, vurgu_color: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Vurgu rengi (Tailwind class)"
          />
          <input
            value={p.tag}
            onChange={(e) =>
              setProjects(projects.map((proj) =>
                proj.id === p.id ? { ...proj, tag: e.target.value } : proj
              ))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Etiket"
          />
          <label className="flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={p.is_active}
              onChange={(e) =>
                setProjects(projects.map((proj) =>
                  proj.id === p.id ? { ...proj, is_active: e.target.checked } : proj
                ))
              }
            />
            Aktif mi?
          </label>

          {/* Kaydet ve Sil butonları */}
          <div className="flex gap-2">
            <button
              onClick={() => saveProject(p)}
              className="px-3 py-1 bg-green-600 text-white rounded"
            >
              Kaydet
            </button>
            <button
              onClick={() => deleteProject(p.id)}
              className="px-3 py-1 bg-red-700 text-white rounded"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}