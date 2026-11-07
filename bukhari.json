import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "نُورُ اليَقين | القرآن بالتجويد وصحيح البخاري والأذكار",
    template: "%s | نُورُ اليَقين",
  },
  description:
    "منصة إسلامية شاملة: القرآن الكريم كاملاً بعلامات التجويد الملوّنة، أكثر من 1100 حديث من صحيح البخاري، أذكار الصباح والمساء من حصن المسلم، سبحة إلكترونية، ومواقيت الصلاة مع اتجاه القبلة.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-night-950 text-cream-100 antialiased pattern-bg">
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
