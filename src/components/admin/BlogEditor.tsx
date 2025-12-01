"use client";
import { useEffect, useState, useCallback } from "react";
import { uploadImage } from "@/lib/supabase/uploadImage"; // Supabase işlevi olduğu varsayılmıştır
import { mutate } from "swr";
import Image from 'next/image'; // Next.js Image bileşenini kullanmak daha iyidir

// TypeScript Arayüzü
type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  image_url: string;
  slug: string;
  order?: number;
};

// Vurgu renkleri (Önceki AdminPanel ile uyumlu: red)
const ACCENT_PRIMARY_CLASS = "bg-red-600 hover:bg-red-500";
const ACCENT_SECONDARY_CLASS = "bg-green-600 hover:bg-green-500";
const TEXT_ACCENT_CLASS = "text-red-400";
const INPUT_BG_CLASS = "bg-neutral-700";
const CARD_BG_CLASS = "bg-neutral-800"; // Ana kart arka planı

export default function BlogEditor() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState<BlogPost>({
    id: 0,
    title: "",
    excerpt: "",
    date: new Date().toISOString().split('T')[0], // Varsayılan olarak bugünün tarihi
    image_url: "",
    slug: "",
    order: 0,
  });
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const data: BlogPost[] = await res.json();
      setPosts(data.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    } catch (error) {
      console.error("Blog yazılarını çekerken hata:", error);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, postState: BlogPost | null, setter: React.Dispatch<React.SetStateAction<any>>) => {
    const file = e.target.files?.[0];
    if (!file || !postState) return;
    
    // Güvenlik: Dosya tipi kontrolü
    if (!file.type.startsWith('image/')) {
        alert("Lütfen bir görsel dosyası seçin.");
        return;
    }

    setUploading(true);
    try {
        // Bu fonksiyonun (uploadImage) doğru şekilde çalıştığı varsayılmıştır.
        const url = await uploadImage(file); 
        setter({ ...postState, image_url: url });
    } catch (error) {
        console.error("Görsel yüklenirken hata oluştu:", error);
        alert("Görsel yüklenirken bir sorun oluştu.");
    } finally {
        setUploading(false);
    }
  };

  const addPost = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (saving || uploading) return; // Kayıt veya yükleme devam ediyorsa engelle
    setSaving(true);
    
    // ... (Mevcut addPost mantığınız) ...
    const payload = {
      title: newPost.title,
      excerpt: newPost.excerpt,
      date: newPost.date,
      image_url: newPost.image_url,
      slug: newPost.slug,
      order: newPost.order,
    };

    const res = await fetch("/api/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Blog eklenemedi", await res.text());
      setSaving(false);
      return;
    }

    const created = await res.json();
    setPosts((prev) => [...prev, created].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));

    setNewPost({
      id: 0,
      title: "",
      excerpt: "",
      date: new Date().toISOString().split('T')[0],
      image_url: "",
      slug: "",
      order: 0,
    });
    setSaving(false);
    mutate("/api/blog");
  };

  const deletePost = async (id: number) => {
    if (!confirm("Bu yazıyı silmek istediğine emin misin?")) return;
    
    // Optimistik güncelleme
    const originalPosts = posts;
    setPosts(posts.filter((p) => p.id !== id));
    
    try {
        const res = await fetch("/api/blog", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        if (!res.ok) {
             setPosts(originalPosts); // Geri al
             throw new Error("Silme başarısız.");
        }
        mutate("/api/blog");
    } catch (error) {
        console.error("Silme hatası:", error);
        alert("Yazı silinirken bir hata oluştu.");
    }
  };

  const updateOrder = async () => {
    setSaving(true);
    try {
        // Sadece sırası değişenleri göndermek daha verimli olabilir, ancak toplu PUT da çalışır
        const res = await fetch("/api/blog/batch-update-order", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(posts.map(p => ({ id: p.id, order: p.order }))),
        });

        if (!res.ok) throw new Error("Sıralama güncellenirken hata oluştu.");
        alert("✨ Sıralama başarıyla güncellendi!");
    } catch (error) {
        console.error("Sıralama hatası:", error);
        alert("Sıralama güncellenemedi.");
    } finally {
        setSaving(false);
    }
    mutate("/api/blog");
  };

  const updatePost = async () => {
    if (!editing) return;
    setSaving(true);
    try {
        const res = await fetch("/api/blog", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editing),
        });
        
        if (!res.ok) throw new Error("Güncelleme başarısız.");
        
        const updated = await res.json();
        setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
        setEditing(null);
        alert("✅ Yazı başarıyla güncellendi!");
        mutate("/api/blog");
    } catch (error) {
        console.error("Güncelleme hatası:", error);
        alert(`Güncelleme başarısız: ${error}`);
    } finally {
        setSaving(false);
    }
  };
  
  // Ortak Input Bileşeni
  const InputField = ({ label, placeholder, type, value, onChange, disabled = false }: { label: string, placeholder?: string, type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, disabled?: boolean }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-neutral-300">{label}</label>
        {type === 'textarea' ? (
             <textarea
                value={value as string}
                onChange={onChange}
                rows={4}
                className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder={placeholder}
                disabled={disabled}
            />
        ) : (
             <input
                type={type}
                value={value}
                onChange={onChange}
                className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-white focus:ring-red-500 focus:border-red-500 transition duration-150`}
                placeholder={placeholder}
                disabled={disabled}
            />
        )}
       
    </div>
  );


  return (
    <section className={`p-8 rounded-xl shadow-2xl text-white border border-neutral-700 ${CARD_BG_CLASS}`}>
      
      <h2 className={`text-2xl font-bold mb-6 border-b border-neutral-700 pb-2 ${TEXT_ACCENT_CLASS}`}>
        📰 Blog Yazıları Yönetimi
      </h2>

      {/* Yazı Listesi ve Sıralama */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-neutral-300 mb-4">Mevcut Yazılar ({posts.length})</h3>
        
        {loading ? (
            <p className="flex items-center gap-2 text-neutral-400">
                <svg className="animate-spin h-5 w-5 text-red-400" viewBox="0 0 24 24">...</svg> Yazılar Yükleniyor...
            </p>
        ) : (
            <div className="grid gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {posts.map((p) => (
                <div 
                  key={p.id} 
                  className="p-4 rounded-xl relative flex gap-4 items-start border border-neutral-700 bg-neutral-700/50 hover:bg-neutral-700 transition duration-150"
                >
                    {/* Görsel Önizleme */}
                    {p.image_url ? (
                        <div className="w-20 h-20 shrink-0 relative overflow-hidden rounded-lg">
                            <Image
                                src={p.image_url}
                                alt={p.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div className="w-20 h-20 shrink-0 rounded-lg bg-neutral-600 flex items-center justify-center text-xs text-neutral-400">
                            Görsel Yok
                        </div>
                    )}

                    {/* Metin ve Kontroller */}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold truncate text-lg text-neutral-100">{p.title}</p>
                        <p className="text-sm text-neutral-400 mb-2">{p.date}</p>
                        
                        {/* Sıra Numarası Girişi */}
                        <div className="flex items-center gap-2">
                             <label htmlFor={`order-${p.id}`} className="text-sm text-neutral-400">Sıra:</label>
                             <input
                                id={`order-${p.id}`}
                                type="number"
                                value={p.order ?? 0}
                                onChange={(e) => {
                                    const newOrder = parseInt(e.target.value) || 0;
                                    setPosts((prev) => 
                                        prev.map((item) =>
                                            item.id === p.id ? { ...item, order: newOrder } : item
                                        ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) // Sıralama anında yansıtılır
                                    );
                                }}
                                className={`w-16 border border-neutral-600 ${INPUT_BG_CLASS} p-1 rounded text-sm text-center focus:ring-red-500`}
                                min="0"
                             />
                        </div>
                    </div>

                    {/* Aksiyon Butonları Grubu */}
                    <div className="flex flex-col space-y-2 ml-4 shrink-0">
                        <button
                            onClick={() => setEditing(p)}
                            className="bg-sky-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-sky-500 transition duration-150"
                        >
                            ✏️ Düzenle
                        </button>
                        <button
                            onClick={() => deletePost(p.id)}
                            className="bg-red-600 text-white px-3 py-1 text-sm rounded-lg hover:bg-red-500 transition duration-150"
                        >
                            🗑️ Sil
                        </button>
                    </div>
                </div>
              ))}
            </div>
        )}
        
        {/* Sıralama Kaydet Butonu */}
        <button
          onClick={updateOrder}
          disabled={saving || loading}
          className={`mt-6 ${ACCENT_PRIMARY_CLASS} text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {saving ? "Sıralama Kaydediliyor..." : "Sıralamayı Kaydet ve Güncelle"}
        </button>
      </div>

      <hr className="border-neutral-700 my-8"/>

      {/* 2. Düzenleme Formu (Modal/Ayrı Bölüm) */}
      {editing && (
        <div className={`p-6 rounded-xl mb-8 space-y-4 shadow-xl border border-sky-600 bg-neutral-900/80`}>
          <h3 className={`font-semibold text-xl border-b border-neutral-700 pb-2 text-sky-400`}>"{editing.title}" Düzenleniyor</h3>
          
          <InputField label="Başlık" type="text" value={editing.title} 
                      onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
          <InputField label="Özet" type="textarea" value={editing.excerpt} 
                      onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />
          
          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Yayın Tarihi" type="date" value={editing.date} 
                        onChange={(e) => setEditing({ ...editing, date: e.target.value })} />
            <InputField label="Slug (URL)" type="text" value={editing.slug} 
                        onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="örnek-blog-yazisi" />
          </div>

          {/* Görsel Yükleme Alanı */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 block">Görsel Yükle / Değiştir</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, editing, setEditing)}
              className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-neutral-400 focus:ring-red-500 focus:border-red-500 transition duration-150 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500/20 file:text-red-400 hover:file:bg-red-500/30`}
              disabled={uploading}
            />
            {uploading && <p className="text-yellow-400 text-sm mt-2">Görsel Yükleniyor...</p>}
            {editing.image_url && (
                <div className="relative mt-3">
                    <img src={editing.image_url} alt="Yüklenen görsel" className="w-full max-h-64 object-cover rounded-lg border border-neutral-700" />
                    <button
                        onClick={() => setEditing({ ...editing, image_url: "" })}
                        className="absolute top-2 right-2 bg-red-600/80 backdrop-blur-sm text-white px-2 py-1 text-xs rounded hover:bg-red-700 transition"
                    >
                        Kaldır
                    </button>
                </div>
            )}
          </div>

          <div className="flex gap-4 pt-2 justify-end">
            <button
              onClick={updatePost}
              disabled={saving || uploading}
              className={`${ACCENT_SECONDARY_CLASS} text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {saving ? "Kaydediliyor..." : "Kaydet ve Kapat"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="bg-neutral-600 text-white px-6 py-3 rounded-lg hover:bg-neutral-700 transition"
            >
              İptal
            </button>
          </div>
        </div>
      )}
        
      {/* 3. Yeni Yazı Ekleme Formu */}
      <div className={`p-6 rounded-xl shadow-xl border border-neutral-700 ${CARD_BG_CLASS}`}>
        <h3 className={`font-semibold text-xl mb-4 border-b border-neutral-700 pb-2 text-red-400`}>Yeni Yazı Ekle</h3>
        <form onSubmit={addPost} className="space-y-4">
          <InputField label="Başlık" type="text" value={newPost.title} 
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="Yeni yazı başlığı" />
          <InputField label="Özet" type="textarea" value={newPost.excerpt} 
                      onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })} placeholder="Kısa bir özet metni" />
          
          <div className="grid md:grid-cols-2 gap-4">
            <InputField label="Yayın Tarihi" type="date" value={newPost.date} 
                        onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} />
             <InputField label="Slug (URL)" type="text" value={newPost.slug} 
                        onChange={(e) => setNewPost({ ...newPost, slug: e.target.value })} placeholder="yeni-yazi-slug" />
          </div>

          {/* Görsel Yükleme Alanı */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-neutral-300 block">Kapak Görseli Yükle</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, newPost, setNewPost)}
              className={`w-full border border-neutral-600 p-3 rounded-lg ${INPUT_BG_CLASS} text-neutral-400 focus:ring-red-500 focus:border-red-500 transition duration-150 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-500/20 file:text-red-400 hover:file:bg-red-500/30`}
              disabled={uploading}
            />
            {uploading && <p className="text-yellow-400 text-sm mt-2">Görsel Yükleniyor...</p>}
            {newPost.image_url && (
              <div className="relative mt-3">
                <img src={newPost.image_url} alt="Yüklenen görsel" className="w-full max-h-64 object-cover rounded-lg border border-neutral-700" />
                <button
                  onClick={() => setNewPost({ ...newPost, image_url: "" })}
                  className="absolute top-2 right-2 bg-red-600/80 backdrop-blur-sm text-white px-2 py-1 text-xs rounded hover:bg-red-700 transition"
                >
                  Kaldır
                </button>
              </div>
            )}
          </div>
          
          <InputField label="Sıra Numarası" type="number" value={newPost.order ?? 0} 
                        onChange={(e) => setNewPost({ ...newPost, order: parseInt(e.target.value) })} placeholder="Sıra (0, 1, 2...)" />

          <button
            type="submit"
            disabled={saving || uploading}
            className={`w-full ${ACCENT_PRIMARY_CLASS} text-white font-semibold px-4 py-3 rounded-lg hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {saving ? "Yazı Ekleniyor..." : "Yazıyı Ekle"}
          </button>
        </form>
      </div>
    </section>
  );
}