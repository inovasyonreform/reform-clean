// components/admin/CorporateFeaturesEditor.tsx
"use client";
import React, { useState, useEffect } from 'react';
import {
    InformationCircleIcon,
    PlusCircleIcon,
    TrashIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    LightBulbIcon,
    UserGroupIcon,
    PuzzlePieceIcon,
    PencilSquareIcon
} from "@heroicons/react/24/solid";

// Veri Yapısı
interface WhyUsFeature {
    id: number | null; // Yeni kayıtlar için null olabilir (Front-end'de geçici olarak kullanılır)
    title: string;
    description: string;
    icon_name: string;
    color_class: string;
    border_class: string;
}

// Varsayılan Özellik Şablonu
const newFeatureTemplate: WhyUsFeature = {
    id: null,
    title: 'Yeni Özellik Başlığı',
    description: 'Bu özellik, müşterilerimize sağladığımız bir avantajı kısaca açıklar.',
    icon_name: 'CheckCircleIcon',
    color_class: 'text-red-500',
    border_class: 'border-red-500',
};

// İkon Seçenekleri Map'i
const ICON_OPTIONS: { name: string, component: React.ElementType }[] = [
    { name: 'CheckCircleIcon', component: CheckCircleIcon },
    { name: 'LightBulbIcon', component: LightBulbIcon },
    { name: 'UserGroupIcon', component: UserGroupIcon },
    { name: 'PuzzlePieceIcon', component: PuzzlePieceIcon },
];

export default function CorporateFeaturesEditor() {
    const [features, setFeatures] = useState<WhyUsFeature[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

    const clearMessage = () => {
        setTimeout(() => setMessage(null), 5000);
    };

    // --- Veri Çekme Fonksiyonu ---
    const fetchFeatures = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/corporate/why-us', { method: 'GET' });
            const result = await response.json();

            if (response.ok) {
                setFeatures(Array.isArray(result) ? result : []);
                setMessage({ type: 'info', text: 'Özellikler yüklendi.' });
            } else {
                setMessage({ type: 'error', text: `Hata: Veri çekilemedi.` });
                setFeatures([]);
            }
        } catch (error) {
            console.error("Fetch Hatası:", error);
            setMessage({ type: 'error', text: 'Ağ bağlantı hatası oluştu.' });
        } finally {
            setIsLoading(false);
            clearMessage();
        }
    };

    useEffect(() => {
        fetchFeatures();
    }, []);

    // --- Özellik Ekleme/Silme/Güncelleme Fonksiyonları ---

    const addFeature = () => {
        // Geçici id olarak Date.now() kullanmak sorunsuz çalışacaktır.
        setFeatures([...features, { ...newFeatureTemplate, id: Date.now() }]);
    };

    const removeFeature = (tempId: number | null) => {
        setFeatures(features.filter(f => f.id !== tempId));
    };

    const handleFeatureChange = (tempId: number | null, field: keyof WhyUsFeature, value: string) => {
        setFeatures(features.map(f =>
            f.id === tempId ? { ...f, [field]: value } : f
        ));
    };

    // --- Veri Kaydetme Fonksiyonu (Tüm listeyi POST eder) ---
    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage({ type: 'info', text: 'Kaydediliyor...' });

        // 🚨 KRİTİK DÜZELTME: API'ye SADECE veritabanı sütunlarını içeren diziyi gönderiyoruz.
        const dataToSave = features.map(f => ({
            title: f.title,
            description: f.description,
            icon_name: f.icon_name,
            color_class: f.color_class,
            border_class: f.border_class,
            // NOT: id'yi göndermiyoruz. Supabase bunu kendi yönetecek (DELETE/INSERT)
        }));

        try {
            const response = await fetch('/api/corporate/why-us', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // DÜZELTME: SADECE temizlenmiş listeyi gönderiyoruz.
                body: JSON.stringify(dataToSave),
            });

            const result = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Neden Biz Özellikleri **Başarıyla Kaydedildi!**' });
                // Kayıt sonrası veriyi tekrar çekmek, yeni atanan id'leri yakalamak için iyi bir pratik
                fetchFeatures();
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

    const getMessageClasses = (type: 'success' | 'error' | 'info') => {
        switch (type) {
            case 'success': return 'bg-green-600/20 text-green-400 border-l-4 border-green-500';
            case 'error': return 'bg-red-600/20 text-red-400 border-l-4 border-red-500';
            case 'info': return 'bg-blue-600/20 text-blue-400 border-l-4 border-blue-500';
            default: return 'bg-neutral-800 text-neutral-300';
        }
    };

    if (isLoading) return <div className="p-8 text-center text-red-500">Özellikler yükleniyor...</div>;


    return (
        <form onSubmit={handleSave} className="space-y-8">
            <div className="bg-neutral-800 p-3 rounded-lg flex items-center gap-3 text-sm text-red-400 border-l-4 border-red-500">
                <InformationCircleIcon className="w-5 h-5" />
                Bu bölüm, "Hakkımızda" sayfasındaki **"Neden Bizi Seçmelisiniz?"** kartlarını yönetir. Lütfen en fazla 4-6 özellik eklemeye özen gösterin.
            </div>

            {/* Mesaj Alanı */}
            {message && (
                <p className={`text-sm text-center font-medium p-3 rounded-lg ${getMessageClasses(message.type)}`}>
                    {message.text}
                </p>
            )}

            <div className="space-y-6">
                {features.map((feature, index) => {
                    const CurrentIcon = ICON_OPTIONS.find(i => i.name === feature.icon_name)?.component || PencilSquareIcon;

                    return (
                        <div key={feature.id} className="p-6 border border-neutral-700 rounded-xl bg-neutral-800/50 shadow-md">
                            <h4 className="text-lg font-bold mb-4 flex justify-between items-center text-red-300">
                                {index + 1}. Özellik
                                <button
                                    type="button"
                                    onClick={() => removeFeature(feature.id)}
                                    className="text-neutral-400 hover:text-red-500 transition"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </h4>

                            {/* Başlık */}
                            <label className="block text-xs font-medium text-neutral-400 mt-4">Başlık</label>
                            <input
                                type="text"
                                value={feature.title}
                                onChange={(e) => handleFeatureChange(feature.id, 'title', e.target.value)}
                                className="w-full p-2 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600"
                                required
                            />

                            {/* Açıklama */}
                            <label className="block text-xs font-medium text-neutral-400 mt-4">Açıklama</label>
                            <textarea
                                rows={2}
                                value={feature.description}
                                onChange={(e) => handleFeatureChange(feature.id, 'description', e.target.value)}
                                className="w-full p-2 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600"
                                required
                            />

                            {/* İkon Seçimi ve Renk Sınıfları */}
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label className="block text-xs font-medium text-neutral-400">İkon Adı</label>
                                    <select
                                        value={feature.icon_name}
                                        onChange={(e) => handleFeatureChange(feature.id, 'icon_name', e.target.value)}
                                        className="w-full p-2 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600"
                                    >
                                        {ICON_OPTIONS.map(icon => (
                                            <option key={icon.name} value={icon.name}>{icon.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-neutral-400">İkon Rengi (Tailwind Class)</label>
                                    <input
                                        type="text"
                                        value={feature.color_class}
                                        onChange={(e) => handleFeatureChange(feature.id, 'color_class', e.target.value)}
                                        className="w-full p-2 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600"
                                        placeholder="Örn: text-red-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-neutral-400">Border Rengi (Tailwind Class)</label>
                                    <input
                                        type="text"
                                        value={feature.border_class}
                                        onChange={(e) => handleFeatureChange(feature.id, 'border_class', e.target.value)}
                                        className="w-full p-2 bg-neutral-700 rounded-lg text-white focus:ring-red-500 focus:border-red-500 border border-transparent hover:border-neutral-600"
                                        placeholder="Örn: border-red-500"
                                        required
                                    />
                                </div>

                                <div className="flex items-center justify-center p-3 bg-neutral-700 rounded-lg">
                                    <CurrentIcon className={`w-8 h-8 ${feature.color_class}`} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-neutral-700">
                <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 px-4 py-2 bg-neutral-700 text-neutral-300 font-medium rounded-lg transition hover:bg-neutral-600"
                >
                    <PlusCircleIcon className="w-5 h-5 text-red-400" />
                    Yeni Özellik Ekle
                </button>

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
                        <span>Özellik Listesini Kaydet</span>
                    )}
                </button>
            </div>
        </form>
    );
}