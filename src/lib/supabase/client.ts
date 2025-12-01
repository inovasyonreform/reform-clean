// lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";

// Ortam değişkenlerinizin Next.js'te (sunucu/istemci tarafında) erişilebilir olduğundan emin olun.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Anon Key (Anonim Anahtar) ile istemci tarafında kullanılacak client oluşturulur.
// Güvenlik kurallarını (Row Level Security - RLS) Supabase'de aktif ettiğinizden emin olun!
export const supabase = createClient(supabaseUrl, supabaseKey);

// NOT: Sunucu tarafı işlemler için (route.ts), Secret Key ile yetkilendirilmiş 
// ayrı bir client kullanmak daha güvenli olabilir. Ancak Admin paneli RLS ile korunuyorsa bu yeterlidir.