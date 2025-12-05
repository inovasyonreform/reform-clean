"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  published_date: string; // ISO veya YYYY-MM-DD
  image_url: string;
  slug: string;
  sort_order: number;
}

const initialPost: BlogPost = {
  id: 0,
  title: "",
  excerpt: "",
  published_date: new Date().toISOString().split("T")[0],
  image_url: "",
  slug: "",
  sort_order: 0,
};

export default function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState<BlogPost>(initialPost);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/blog/home-posts", { cache: "no-store" });
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const json = (await res.json()) as BlogPost[] | { error: string };
      if (Array.isArray(json)) {
        setPosts(
          json.sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        );
      } else {
        throw new Error(json?.error || "Unknown error");
      }
    } catch (e: any) {
      setError(e?.message || "Veri çekilirken hata");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const saveNewPost = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        title: newPost.title.trim(),
        excerpt: newPost.excerpt.trim(),
        published_date: newPost.published_date,
        image_url: newPost.image_url.trim(),
        slug: newPost.slug.trim(),
        sort_order: newPost.sort_order ?? 0,
      };
      const res = await fetch("/api/blog/home-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`POST failed: ${res.status}`);
      const created = (await res.json()) as BlogPost;
      setPosts((prev) =>
        [...prev, created].sort((a, b) => a.sort_order - b.sort_order)
      );
      setNewPost(initialPost);
    } catch (e: any) {
      setError(e?.message || "Kaydetme hatası");
    } finally {
      setSaving(false);
    }
  };

  const saveEdit = async () => {
    if (!editing) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/blog/home-posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) throw new Error(`PUT failed: ${res.status}`);
      const updated = (await res.json()) as BlogPost;
      setPosts((prev) =>
        prev
          .map((p) => (p.id === updated.id ? updated : p))
          .sort((a, b) => a.sort_order - b.sort_order)
      );
      setEditing(null);
    } catch (e: any) {
      setError(e?.message || "Güncelleme hatası");
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (id: number) => {
    if (!confirm("Silmek istediğine emin misin?")) return;
    setError(null);
    const original = posts;
    setPosts(posts.filter((p) => p.id !== id));
    try {
      const res = await fetch("/api/blog/home-posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        setPosts(original);
        throw new Error(`DELETE failed: ${res.status}`);
      }
    } catch (e: any) {
      setError(e?.message || "Silme hatası");
    }
  };

  const updateOrder = async () => {
    setSaving(true);
    setError(null);
    try {
      const payload = posts.map((p) => ({
        id: p.id,
        sort_order: Number.isFinite(p.sort_order) ? p.sort_order : 0,
      }));
      const res = await fetch("/api/blog/home-posts/batch-update-order", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`ORDER PUT failed: ${res.status}`);
      alert("Sıralama güncellendi");
    } catch (e: any) {
      setError(e?.message || "Sıralama güncellenemedi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-neutral-900 text-white rounded-xl space-y-8 border border-neutral-700">
      <h2 className="text-2xl font-bold text-red-400">
        📰 Blog Yazıları Yönetimi
      </h2>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Yeni Yazı Ekle */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-neutral-300">
          Yeni Yazı Ekle
        </h3>
        <input
          type="text"
          placeholder="Başlık"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          className="w-full p-3 rounded bg-neutral-800 text-white"
        />
        <textarea
          placeholder="Özet"
          value={newPost.excerpt}
          onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
          className="w-full p-3 rounded bg-neutral-800 text-white"
        />
        <input
          type="date"
          value={newPost.published_date}
          onChange={(e) =>
            setNewPost({ ...newPost, published_date: e.target.value })
          }
          className="w-full p-3 rounded bg-neutral-800 text-white"
        />
        <input
          type="text"
          placeholder="Slug (örnek-yazi)"
          value={newPost.slug}
          onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })}
          className="w-full p-3 rounded bg-neutral-800 text-white"
        />
        <input
          type="text"
          placeholder="Görsel URL"
          value={newPost.image_url}
          onChange={(e) =>
            setNewPost({ ...newPost, image_url: e.target.value })
          }
          className="w-full p-3 rounded bg-neutral-800 text-white"
        />
        <input
          type="number"
          placeholder="Sıra"
          value={newPost.sort_order}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            setNewPost({ ...newPost, sort_order: Number.isNaN(n) ? 0 : n });
          }}
          className="w-full p-3 rounded bg-neutral-800 text-white"
        />
        <button
          onClick={saveNewPost}
          disabled={saving}
          className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-500 disabled:opacity-50"
        >
          {saving ? "Kaydediliyor..." : "Yazıyı Ekle"}
        </button>
      </div>

      <hr className="border-neutral-700" />

      {/* Mevcut Yazılar */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-neutral-300">
          Mevcut Yazılar
        </h3>
        {loading ? (
          <p className="text-neutral-400">Yükleniyor...</p>
        ) : posts.length === 0 ? (
          <p className="text-neutral-400">Henüz yazı yok.</p>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-neutral-800 rounded-lg flex gap-4 items-start"
            >
              <div className="w-20 h-20 relative rounded overflow-hidden">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700 flex items-center justify-center text-xs text-neutral-400">
                    Görsel Yok
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-lg font-bold">{p.title}</h4>
                <p className="text-sm text-neutral-400">{p.published_date}</p>
                <label className="text-xs text-neutral-400">Sıra</label>
                <input
                  type="number"
                  value={p.sort_order}
                  onChange={(e) => {
                    const n = parseInt(e.target.value, 10);
                    const safe = Number.isNaN(n) ? 0 : n;
                    setPosts((prev) =>
                      prev
                        .map((post) =>
                          post.id === p.id
                            ? { ...post, sort_order: safe }
                            : post
                        )
                        .sort(
                          (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
                        )
                    );
                  }}
                  className="w-16 p-1 rounded bg-neutral-700 text-center text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setEditing(p)}
                  className="text-sm px-3 py-1 bg-sky-600 rounded hover:bg-sky-500 text-white"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => deletePost(p.id)}
                  className="text-sm px-3 py-1 bg-red-600 rounded hover:bg-red-500 text-white"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
        <button
          onClick={updateOrder}
          disabled={saving || loading}
          className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50"
        >
          Sıralamayı Güncelle
        </button>
      </div>

      {/* Düzenleme Formu */}
      {editing && (
        <div className="mt-8 p-6 bg-neutral-800 rounded-xl space-y-4 border border-sky-600">
          <h3 className="text-xl font-semibold text-sky-400">
            Yazı Düzenleniyor
          </h3>
          <input
            type="text"
            value={editing.title}
            onChange={(e) => setEditing({ ...editing, title: e.target.value })}
            className="w-full p-3 rounded bg-neutral-700 text-white"
          />
          <textarea
            value={editing.excerpt}
            onChange={(e) =>
              setEditing({ ...editing, excerpt: e.target.value })
            }
            className="w-full p-3 rounded bg-neutral-700 text-white"
          />
          <input
            type="date"
            value={editing.published_date}
            onChange={(e) =>
              setEditing({ ...editing, published_date: e.target.value })
            }
            className="w-full p-3 rounded bg-neutral-700 text-white"
          />
          <input
            type="text"
            value={editing.slug}
            onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
            placeholder="örnek-yazi-slug"
            className="w-full p-3 rounded bg-neutral-700 text-white"
          />
          <input
            type="text"
            value={editing.image_url}
            onChange={(e) =>
              setEditing({ ...editing, image_url: e.target.value })
            }
            placeholder="Görsel URL"
            className="w-full p-3 rounded bg-neutral-700 text-white"
          />
          <input
            type="number"
            value={editing.sort_order}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              setEditing({ ...editing, sort_order: Number.isNaN(n) ? 0 : n });
            }}
            className="w-full p-3 rounded bg-neutral-700 text-white"
          />

          <div className="flex gap-4 pt-2 justify-end">
            <button
              onClick={saveEdit}
              disabled={saving}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-500 disabled:opacity-50"
            >
              {saving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="px-6 py-3 bg-neutral-600 text-white rounded hover:bg-neutral-700"
            >
              İptal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
