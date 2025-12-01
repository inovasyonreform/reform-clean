"use client";
import { sendEmail } from "@/lib/email";
import { useState } from "react";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ContactSection() {
  const [form, setForm] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEmail(form);
      setStatus("sent");
      setForm({ from_name: "", from_email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="iletisim" className="relative py-24 md:py-32 bg-linear-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white overflow-hidden">
      <BackgroundBeams className="absolute inset-0 z-0" />

      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-800/10 rounded-full blur-3xl -z-10 opacity-40" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-900/10 rounded-full blur-3xl -z-10 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-6xl lg:text-7xl font-light tracking-wider text-white mb-2">
            Bize Ulaşın
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-red-600 to-red-500 mx-auto mb-3" />
          <p className="text-neutral-300 text-lg max-w-2xl mx-auto font-light">
            Projeleriniz hakkında konuşmaya hazırız. Size uygun bir zaman seçin ve iletişime geçin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Sol taraf: İletişim bilgileri */}
          <div className="space-y-10">
            <div>
              <h3 className="text-2xl lg:text-3xl font-light text-white mb-4">
                İletişim Bilgileri
              </h3>
              <div className="w-12 h-1 bg-linear-to-r from-red-600 to-red-500" />
            </div>

            {/* Contact Items */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-4 group">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600/20 group-hover:bg-red-600/40 transition-colors duration-300">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-light text-white mb-1">Adres</h4>
                  <p className="text-neutral-300 font-light">
                    Fevzi Çakmak Mah. 10436.Sokak No:1<br />
                     Karatay | KONYA
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4 group">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600/20 group-hover:bg-red-600/40 transition-colors duration-300">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 00.502.756l2.048 1.024a11.05 11.05 0 01-5 8.5H5a2 2 0 01-2-2V5z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-light text-white mb-1">Telefon</h4>
                  <a
                    href="tel:+905326283381"
                    className="text-neutral-300 font-light hover:text-red-500 transition-colors duration-300"
                  >
                    0 (532) 425 33 88
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 group">
                <div className="shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-red-600/20 group-hover:bg-red-600/40 transition-colors duration-300">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-light text-white mb-1">E-posta</h4>
                  <a
                    href="mailto:info@reforminovasyon.com"
                    className="text-neutral-300 font-light hover:text-red-500 transition-colors duration-300"
                  >
                    info@reforminovasyon.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-neutral-700">
              <h4 className="text-lg font-light text-white mb-4">Sosyal Medya</h4>
              <div className="flex gap-4">
                {["instagram", "facebook", "linkedin"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-800 hover:bg-red-600/30 border border-red-700 hover:border-red-500/50 transition-all duration-300"
                  >
                    <span className="text-red-500 text-sm font-light">
                      {social.charAt(0).toUpperCase()}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sağ taraf: Form */}
          <div className="lg:pt-0">
            <div className="bg-linear-to-br from-neutral-800/50 to-neutral-900/50 rounded-2xl p-8 lg:p-10 backdrop-blur-xl border border-neutral-700/50 hover:border-red-500/30 transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="group">
                  <label className="block text-sm font-light text-neutral-300 mb-2">
                    Adınız Soyadınız
                  </label>
                  <input
                    type="text"
                    placeholder="Reform İnovasyon"
                    value={form.from_name}
                    onChange={(e) => setForm({ ...form, from_name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:outline-none transition-all duration-300 font-light"
                  />
                </div>

                {/* Email Input */}
                <div className="group">
                  <label className="block text-sm font-light text-neutral-300 mb-2">
                    E-posta Adresiniz
                  </label>
                  <input
                    type="email"
                    placeholder="ornek@email.com"
                    value={form.from_email}
                    onChange={(e) => setForm({ ...form, from_email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:outline-none transition-all duration-300 font-light"
                  />
                </div>

                {/* Subject Input */}
                <div className="group">
                  <label className="block text-sm font-light text-neutral-300 mb-2">
                    Konu
                  </label>
                  <input
                    type="text"
                    placeholder="Proje Danışmanlığı"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:outline-none transition-all duration-300 font-light"
                  />
                </div>

                {/* Message Input */}
                <div className="group">
                  <label className="block text-sm font-light text-neutral-300 mb-2">
                    Mesajınız
                  </label>
                  <textarea
                    placeholder="Mesajınızı yazın..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-neutral-900/50 text-white placeholder-neutral-500 border border-neutral-700 focus:border-red-500 focus:outline-none transition-all duration-300 font-light resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "sent" && (
                  <div className="p-4 rounded-lg bg-emerald-600/20 border border-red-500/50 text-red-300 text-sm font-light">
                    ✓ Mesajınız başarıyla gönderildi. En kısa zamanda sizinle iletişime geçeceğiz.
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-lg bg-red-600/20 border border-red-500/50 text-red-300 text-sm font-light">
                    ✗ Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 bg-linear-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-light rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-600/50"
                >
                  {status === "sending" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Gönderiliyor...
                    </span>
                  ) : (
                    "Mesajı Gönder"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}