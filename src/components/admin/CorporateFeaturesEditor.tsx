// components/admin/CorporateAboutEditor.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { 
    InformationCircleIcon, 
    PhotoIcon,
    ArrowPathIcon // Kaydetme sırasında yüklenme ikonu
} from "@heroicons/react/24/solid";

// Veri yapısı (Aynı kaldı)
interface CorporateAboutData {
    id: number;
    hero_title: string;
    hero_subtitle: string;
    story_title: string;
    story_text: string;
    mission_text: string;
    vision_text: string;
    values_list: string[]; 
    cta_heading: string;
    story_highlight: string; // <<< YENİ ALAN
    story_image_url: string; // <<< YENİ ALAN
}

// Varsayılan boş değerler (Aynı kaldı)
const initialData: CorporateAboutData = {
    id: 1, 
    hero_title: 'İnovasyon. Güven. Gelecek.', // Varsayılan değerler eklendi
    hero_subtitle: 'Sıradan yapıları, kalıcı değere sahip ikonik yaşam alanlarına dönüştürüyoruz.',
    story_title: 'Başlangıcımızdan Bugüne',
    story_text: '', 
    mission_text: '', 
    vision_text: '', 
    values_list: ['Dürüstlük', 'Şeffaflık', 'İnovasyon'], // Varsayılan liste eklendi
    cta_heading: 'Vizyonunuzu Gerçeğe Dönüştürelim',
    story_image_url: '', 
    story_highlight: '',
};

export default function CorporateAboutEditor() {
    const [data, setData] = useState<CorporateAboutData>(initialData);
    const [isLoading, setIsLoading] = useState(true); // Veri çekme durumu
    const [isSaving, setIsSaving] = useState(false); // Kaydetme durumu
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

    // Mesajı belli bir süre sonra temizleme
    const clearMessage = () => {
        setTimeout(() => setMessage(null), 5000);
    };

    // --- Veri Çekme Fonksiyonu ---
    const fetchAboutData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/corporate/about', { 
                method: 'GET' 
            });
            const result = await response.json();

            if (response.ok && result.id) {
                const fetchedData = {
                    ...result,
                    // values_list'in dizi olduğundan emin olma
                    values_list: Array.isArray(result.values_list) ? result.values_list : [],
                    story_image_url: result.story_image_url || '',
                    story_highlight: result.story_highlight || '',
                };
                setData(fetchedData);
                setMessage({ type: 'info', text: 'Veriler yüklendi.' });
            } else if (response.ok && !result.id) {
                // Veritabanında kayıt yoksa, initialData ile başlat
                setData(initialData);
                setMessage({ type: 'info', text: 'Yeni kurumsal sayfa kaydı oluşturuluyor.' });
            } else {
                setMessage({ type: 'error', text: `Hata: ${result.error || 'Veri çekilemedi.'}` });
            }
        } catch (error) {
            console.error("Fetch Hatası:", error);
            setMessage({ type: 'error', text: 'Ağ bağlantı hatası oluştu.' });
        } finally {
            setIsLoading(false);
            clearMessage();
        }
    };

    // --- Veri Kaydetme Fonksiyonu ---
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: 'info', text: 'Kaydediliyor...' });
        
        // id'yi 1 olarak zorlar (Singleton yapı)
        const dataToSave = { ...data, id: 1 };

        try {
            const response = await fetch('/api/corporate/about', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });
            
            const result = await response.json();
            
            if (response.ok) {
                setMessage({ type: 'success', text: 'Kurumsal Sayfa Metinleri **Başarıyla Kaydedildi!**' });
            } else {
                setMessage({ type: 'error', text: `Kaydetme Hatası: ${result.error || 'Bilinmeyen Hata'}` });
            }
        } catch (error) {
            console.error("POST Hatası:", error);
            setMessage({ type: 'error', text: 'Ağ bağlantı hatası oluştu.' });
        } finally {
            setIsSaving(false);
            clearMessage();
        }
    };

    useEffect(() => {
        fetchAboutData();
    }, []);

    // Helper: Mesaj stillerini belirleme
    const getMessageClasses = (type: 'success' | 'error' | 'info') => {
        switch (type) {
            case 'success':
                return 'bg-green-600/20 text-green-400 border-l-4 border-green-500';
            case 'error':
                return 'bg-red-600/20 text-red-400 border-l-4 border-red-500';
            case 'info':
                return 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500';
            default:
                return 'bg-neutral-800 text-neutral-300';
        }
    };

    if (isLoading) return <div className="p-8 text-center text-red-500">Veriler yükleniyor...</div>;

    return (
        <form onSubmit={handleSave} className="space-y-6 bg-neutral-900 p-6 rounded-xl shadow-xl">
            <div className="bg-neutral-800 p-3 rounded-lg flex items-center gap-3 text-sm text-red-400 border-l-4 border-red-500">
                <InformationCircleIcon className="w-5 h-5" />
                Bu formdaki tüm metinler Kurumsal Hakkımızda sayfasındaki ana bölümleri **(Tekil Kayıt)** günceller.
            </div>

            {/* Mesaj Alanı */}
            {message && (
                <p className={`text-sm text-center font-medium p-3 rounded-lg ${getMessageClasses(message.type)}`}>
                    {message.text}
                </p>
            )}

            {/* HERO Bölümü */}
            <h3 className="text-xl font-semibold border-b border-neutral-700 pb-2 text-red-400">Giriş (Hero) Bölümü</h3>
            
            <label className="block text-sm font-medium text-neutral-300">Ana Başlık (Örn: İnovasyon. Güven. Gelecek.)</label>
            <input 
                type="text" 
                value={data.hero_title} 
                onChange={(e) => setData({ ...data, hero_title: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />
            
            <label className="block text-sm font-medium text-neutral-300">Başlık Altı Özet Metin</label>
            <textarea 
                rows={2} 
                value={data.hero_subtitle} 
                onChange={(e) => setData({ ...data, hero_subtitle: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />
            
            {/* HİKAYEMİZ Bölümü */}
            <h3 className="text-xl font-semibold border-b border-neutral-700 pb-2 text-red-400 pt-4">Hikayemiz</h3>
            
            <label className="block text-sm font-medium text-neutral-300">Bölüm Başlığı</label>
            <input 
                type="text" 
                value={data.story_title} 
                onChange={(e) => setData({ ...data, story_title: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />
            
            {/* HİKAYE GÖRSELİ URL'si */}
            <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <PhotoIcon className="w-5 h-5 text-red-400"/>
                Hikayemiz Görsel URL'si 
                <span className="text-xs text-neutral-500">(Örn: Harici bir görsel depolama linki)</span>
            </label>
            <input 
                type="url" 
                value={data.story_image_url} 
                onChange={(e) => setData({ ...data, story_image_url: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                placeholder="Görsel linkini buraya yapıştırın"
            />

            <label className="block text-sm font-medium text-neutral-300">Hikaye Ana Metni</label>
            <textarea 
                rows={5} 
                value={data.story_text} 
                onChange={(e) => setData({ ...data, story_text: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />
            
            {/* HİKAYE VURGULAMA PARAGRAFI (Özel Stil) */}
            <label className="block text-sm font-medium text-neutral-300">Hikaye Vurgu Paragrafı</label>
            <p className="text-xs text-neutral-500 mb-1">Bu metin sayfada özel bir vurgu kutusu içinde (altta kırmızı çizgi) gösterilecektir.</p>
            <textarea 
                rows={3} 
                value={data.story_highlight} 
                onChange={(e) => setData({ ...data, story_highlight: e.target.value })} 
                className="w-full p-3 rounded-lg text-white border-l-4 border-red-500 bg-neutral-800 focus:ring-red-500 focus:border-red-500" 
            />
            
            {/* PRENSİPLER Bölümü */}
            <h3 className="text-xl font-semibold border-b border-neutral-700 pb-2 text-red-400 pt-4">Misyon & Vizyon</h3>
            
            <label className="block text-sm font-medium text-neutral-300">Misyon Metni</label>
            <textarea 
                rows={3} 
                value={data.mission_text} 
                onChange={(e) => setData({ ...data, mission_text: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />
            
            <label className="block text-sm font-medium text-neutral-300">Vizyon Metni</label>
            <textarea 
                rows={3} 
                value={data.vision_text} 
                onChange={(e) => setData({ ...data, vision_text: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />

            {/* DEĞERLER Bölümü (Dizi Girişi) */}
            <h3 className="text-xl font-semibold border-b border-neutral-700 pb-2 text-red-400 pt-4">Değerler Listesi</h3>
            <p className="text-sm text-neutral-500 mb-2">Lütfen değerleri **virgülle (,)** ayırarak girin. (Örn: Dürüstlük, Şeffaflık, İnovasyon)</p>
            <textarea
                rows={2}
                value={Array.isArray(data.values_list) ? data.values_list.join(', ') : ''}
                onChange={(e) => setData({ 
                    ...data, 
                    // Stringi diziye çevirirken temizler.
                    values_list: e.target.value.split(',').map(item => item.trim()).filter(item => item.length > 0) 
                })}
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600"
                placeholder="Değer 1, Değer 2, Değer 3"
            />
            
            {/* CTA Bölümü */}
            <h3 className="text-xl font-semibold border-b border-neutral-700 pb-2 text-red-400 pt-4">Sayfa Sonu Çağrıya Harekete Geçiren Alan (CTA)</h3>
            <label className="block text-sm font-medium text-neutral-300">CTA Başlığı</label>
            <input 
                type="text" 
                value={data.cta_heading} 
                onChange={(e) => setData({ ...data, cta_heading: e.target.value })} 
                className="w-full p-3 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600" 
                required 
            />

            <div className="flex items-center justify-end pt-6">
                <button 
                    type="submit" 
                    className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg transition hover:bg-red-500 disabled:opacity-50 flex items-center gap-2"
                    disabled={isSaving || isLoading}
                >
                    {isSaving ? (
                        <>
                            <ArrowPathIcon className="w-5 h-5 animate-spin" />
                            <span>Kaydediliyor...</span>
                        </>
                    ) : (
                        <span>Kurumsal Sayfa Metinlerini Kaydet</span>
                    )}
                </button>
            </div>
        </form>
    );
}