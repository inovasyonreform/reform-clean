import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["lncqrkhiunclmwtflexc.supabase.co"], // ✅ Supabase Storage domain
    remotePatterns: [
      {
        protocol: 'https', // veya 'https'
        hostname: 'googleusercontent.com', // Hatanın bahsettiği host adı
        port: '',
        pathname: '/image_collection/image_retrieval/some_id_string**', // İsteğe bağlı, belirli bir yolu kısıtlayabilirsiniz
      },
      // Eğer başka harici görsel kaynaklarınız varsa onları da buraya ekleyin
    ],
  },
};

export default nextConfig;