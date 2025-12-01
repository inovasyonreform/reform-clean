import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-white text-dark">
        
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}