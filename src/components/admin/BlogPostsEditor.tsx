"use client";
import { useEffect, useState } from "react";

interface BlogPost {
  id: number;
  title: string;
  summary: string;
  date: string;
  category: string;
  image_src: string;
  read_time: string;
  is_active: boolean;
}

export default function BlogPostsEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/blog/posts", { cache: "no-store" });
    const json = await res.json();
    setPosts(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const savePost = async (post: BlogPost) => {
    const res = await fetch("/api/blog/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    const json = await res.json();
    setPosts(posts.map((p) => (p.id === post.id ? json : p)));
  };

  const addPost = async () => {
    const res = await fetch("/api/blog/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Yeni Blog Yazısı",
        summary: "",
        date: "04 Aralık 2025",
        category: "Genel",
        image_src: "/refwhite.png",
        read_time: "5 dk okuma",
        is_active: true,
      }),
    });
    const json = await res.json();
    setPosts([...posts, json]);
  };

  const deletePost = async (id: number) => {
    await fetch("/api/blog/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setPosts(posts.filter((p) => p.id !== id));
  };

  if (loading) return <p>Yükleniyor...</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-red-400">Blog Yazıları Editor</h2>
      <button onClick={addPost} className="px-4 py-2 bg-red-600 text-white rounded">
        + Yeni Yazı
      </button>

      {posts.map((p) => (
        <div key={p.id} className="border border-neutral-700 p-4 rounded space-y-2">
          <input
            value={p.title}
            onChange={(e) =>
              setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, title: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Başlık"
          />
          <textarea
            value={p.summary}
            onChange={(e) =>
              setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, summary: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Özet"
          />
          <input
            value={p.date}
            onChange={(e) =>
              setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, date: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Tarih"
          />
          <input
            value={p.category}
            onChange={(e) =>
              setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, category: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Kategori"
          />
          <input
            value={p.image_src}
            onChange={(e) =>
              setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, image_src: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Görsel yolu"
          />
          <input
            value={p.read_time}
            onChange={(e) =>
              setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, read_time: e.target.value } : pr)))
            }
            className="w-full p-2 bg-neutral-900 text-white"
            placeholder="Okuma süresi"
          />
          <label className="flex items-center gap-2 text-neutral-300">
            <input
              type="checkbox"
              checked={p.is_active}
              onChange={(e) =>
                setPosts(posts.map((pr) => (pr.id === p.id ? { ...pr, is_active: e.target.checked } : pr)))
              }
            />
            Aktif mi?
          </label>
          <div className="flex gap-2">
            <button onClick={() => savePost(p)} className="px-3 py-1 bg-green-600 text-white rounded">
              Kaydet
            </button>
            <button onClick={() => deletePost(p.id)} className="px-3 py-1 bg-red-700 text-white rounded">
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}