// app/api/corporate/features/route.ts
import { supabase } from "@/lib/supabase/client";
import { NextResponse } from "next/server";

// ------------------------------------
// GET: Veri Çekme (Tüm listeyi çeker)
// ------------------------------------
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('corporate_features')
            .select('*')
            .order('order_index', { ascending: true }); // Sıralı çekiyoruz

        if (error) {
            console.error("Supabase GET Hatası:", error);
            return NextResponse.json({ error: 'Veri çekme hatası' }, { status: 500 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (e) {
        console.error("Route Handler Hatası:", e);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

// ------------------------------------
// POST: Veri Ekleme veya Güncelleme (UPSERT)
// ------------------------------------
export async function POST(request: Request) {
    try {
        const payload = await request.json(); // Tek bir obje veya obje dizisi gelebilir

        // Tek bir obje veya birden fazla obje (toplu sıralama güncellemesi için) gelebilir.
        // Array olup olmadığını kontrol ederek dinamik Upsert yapısı oluşturuyoruz.
        const dataToUpsert = Array.isArray(payload) ? payload : [payload];

        const { error } = await supabase
            .from('corporate_features')
            .upsert(dataToUpsert, { onConflict: 'id' });

        if (error) {
            console.error("Supabase POST Hatası:", error);
            return NextResponse.json({ error: 'Veri kaydetme hatası' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Başarıyla kaydedildi' }, { status: 200 });
    } catch (e) {
        console.error("Route Handler Hatası:", e);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}

// ------------------------------------
// DELETE: Veri Silme
// ------------------------------------
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Silinecek ID eksik' }, { status: 400 });
        }

        const { error } = await supabase
            .from('corporate_features')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("Supabase DELETE Hatası:", error);
            return NextResponse.json({ error: 'Veri silme hatası' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Başarıyla silindi' }, { status: 200 });
    } catch (e) {
        console.error("Route Handler Hatası:", e);
        return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
    }
}