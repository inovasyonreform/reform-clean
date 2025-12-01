// lib/supabase/server.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Eğer types/supabase.ts dosyanız yoksa veya hata veriyorsa, burayı yorum satırı yapın.
// import { Database } from "@/types/supabase";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// API Route'lar için kullanılacak dışa aktarılmış fonksiyon.
// Eğer Database tipiniz yoksa, T tipi yerine any kullanın veya dışarıda bırakın.
export const createRouteHandlerClient = (): SupabaseClient<any> => {
    return createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false, 
        },
    });
};