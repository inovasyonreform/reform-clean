// lib/supabase/server.ts
import { createClient } from '@supabase/supabase-js';

// **DÜZELTME 1:** Tip dosyanızın yolunu kontrol edin ve doğru yolu kullanın.
// Eğer "src" klasörü kullanıyorsanız: @/lib/types/database.types
// Eğer "src" kullanmıyorsanız: ../types/database.types (veya doğru göreceli yol)
// Varsayım: Doğru yol **@/lib/types/database.types**'dir.
import { Database } from '@/lib/types/database.types'; 

// Ortam değişkenlerinin tanımlı olduğundan emin olun
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; 


// **DÜZELTME 2:** Yalnızca tek bir fonksiyonu (createRouteHandlerClient) dışa aktarın.
// Tüm API Route'larınızda (projects/route.ts, why-us/route.ts vb.) bunu kullanın.
export const createRouteHandlerClient = () => {
    return createClient<Database>(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false, 
        },
    });
};

// **DÜZELTME 3:** createClient'ı dışa aktarmayın (image_593d12.png hatasını çözer).
// export const createClient = ... gibi bir satır olmamalıdır.