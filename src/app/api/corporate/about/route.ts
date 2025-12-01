// app/api/corporate/about/route.ts
import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@/lib/supabase/server'; // Önceki adımda düzelttiğimiz import

// Arayüz (interface) burada tanımlanmalıdır
interface CorporateAboutData {
    id: number | null; 
    hero_title: string;
    hero_subtitle: string;
    story_title: string;       // Image 26213f hatasını çözmek için eklediğimiz alan
    story_text: string;
    story_highlight: string;
    story_image_url: string;
    mission_text: string;
    vision_text: string;
    values_list: string[] | string; // Gelen veriye göre tip
    cta_heading: string;
}

// ... GET fonksiyonu burada olmalı ...

// POST: Tek bir kayıtı ekle (INSERT) veya güncelle (UPDATE)
export async function POST(req: Request) {
    const supabase = createRouteHandlerClient();
    // Front-end'den gelen veri, `values_list` artık dizi (string[]) olmalıdır!
    const dataToSave: CorporateAboutData = await req.json();

    try {
        // ID'yi çıkartıyoruz, böylece sadece içerik sütunları kalır.
        const { id, ...data } = dataToSave;
        
        // Supabase Upsert işlemi
        // Conflict on: 'id' dediğimizde, eğer id=1 olan kayıt varsa günceller, yoksa ekler.
        const { data: updatedData, error: upsertError } = await supabase
            .from('corporate_about')
            .upsert([
                { 
                    // id'yi manuel olarak 1 olarak ayarlamak, tekil kayıt tutmayı garantiler
                    id: 1, 
                    ...data,
                }
            ])
            .select()
            .single(); // Sadece tek bir obje döneceği için single() kullanın

        if (upsertError) {
            console.error('Supabase UPSERT Hatası:', upsertError);
            return NextResponse.json({ error: 'Veri güncellenirken hata oluştu.' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Kurumsal sayfa metni başarıyla güncellendi.', data: updatedData }, { status: 200 });
    } catch (error) {
        console.error('Sunucu Hatası:', error);
        return NextResponse.json({ error: 'Sunucu tarafında bir hata oluştu.' }, { status: 500 });
    }
}