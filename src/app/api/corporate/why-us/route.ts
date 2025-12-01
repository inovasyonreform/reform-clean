// app/api/corporate/why-us/route.ts

// ... diğer import'lar ve GET fonksiyonu ...
import { createRouteHandlerClient } from '@/lib/supabase/server'; 
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient();
    // Front-end'den gelen ve id'leri temizlenmiş yeni özellik listesi
    const newFeatures = await req.json();

    try {
        // 1. ADIM: Tablodaki TÜM eski kayıtları silin.
        // Bu, veritabanını temizler ve yeni listeye yer açar.
        const { error: deleteError } = await supabase
            .from('why_us_features')
            .delete()
            .neq('id', 0); // "id 0'a eşit olmayanları sil" (yani hepsini sil)

        if (deleteError) {
            console.error('Supabase DELETE Hatası:', deleteError);
            return NextResponse.json({ error: 'Eski veriler silinirken hata oluştu.' }, { status: 500 });
        }

        // 2. ADIM: Yeni listeyi ekleyin.
        // Supabase bu aşamada her kayıt için otomatik olarak yeni bir 'id' atayacaktır.
        const { data: insertedData, error: insertError } = await supabase
            .from('why_us_features')
            .insert(newFeatures) // Front-end'den gelen ve id'leri temizlenmiş veri
            .select('*');

        if (insertError) {
            console.error('Supabase INSERT Hatası:', insertError);
            return NextResponse.json({ error: 'Yeni veriler kaydedilirken hata oluştu.' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Neden Biz Özellikleri başarıyla güncellendi.', data: insertedData }, { status: 200 });
    } catch (error) {
        console.error('Sunucu Hatası:', error);
        return NextResponse.json({ error: 'Sunucu tarafında bir hata oluştu.' }, { status: 500 });
    }
}