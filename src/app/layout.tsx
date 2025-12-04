"use client"
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin sayfasında navbar ve footer gizlensin
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="tr">
      <body className="bg-neutral-900 text-white antialiased">
        {!isAdmin && <Navbar />} {/* Admin’de gizlenir */}

        <div className="min-h-screen">
          {children}
        </div>

        {!isAdmin && <Footer />} {/* Admin’de gizlenir */}
        {!isAdmin && <ScrollToTop />} {/* Admin’de gizlenir */}
      </body>
    </html>
  );
}