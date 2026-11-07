"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ScrollText,
  HeartHandshake,
  Hash,
  Moon,
  Star,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";
import VerseOfDay from "@/components/VerseOfDay";
import HadithOfDay from "@/components/HadithOfDay";
import chapters from "../../public/data/chapters.json";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, duration: 0.55, ease: "easeOut" as const },
  }),
};

const features = [
  {
    href: "/quran",
    icon: BookOpen,
    title: "القرآن الكريم",
    desc: "القرآن كاملاً بالرسم العثماني مع علامات التجويد الملوّنة، وسماع التلاوة آية آية بصوت الشيخ مشاري العفاسي.",
    tag: "٦٢٣٦ آية",
  },
  {
    href: "/tajweed",
    icon: Sparkles,
    title: "أحكام التجويد",
    desc: "شرح مبسط وموثوق لأحكام التجويد: النون الساكنة، المدود، القلقلة، الإخفاء والإدغام، مع أمثلة من القرآن.",
    tag: "١٢ باباً",
  },
  {
    href: "/hadith",
    icon: ScrollText,
    title: "صحيح البخاري",
    desc: "مكتبة تضم أكثر من ١١٠٠ حديث صحيح من صحيح البخاري مع أرقامها وأبوابها وبحث فوري في النصوص.",
    tag: "١١٠٠+ حديث",
  },
  {
    href: "/adhkar",
    icon: HeartHandshake,
    title: "الأذكار والأدعية",
    desc: "أذكار الصباح والمساء والنوم وأدعية مأثورة من كتاب حصن المسلم مع العدّاد والاستماع الصوتي.",
    tag: "٢٦٧ ذكراً",
  },
  {
    href: "/tasbih",
    icon: Hash,
    title: "السبحة الإلكترونية",
    desc: "سبحة رقمية فاخرة للتسبيح مع أذكار مأثورة، حفظ تلقائي للعدد، واهتزاز وإحصائيات يومية.",
    tag: "تفاعلية",
  },
  {
    href: "/prayers",
    icon: Moon,
    title: "مواقيت الصلاة",
    desc: "مواقيت الصلاة لأي مدينة عالمياً حسب موقعك، مع العد التنازلي للصلاة القادمة وبوصلة القبلة.",
    tag: "٣٣ مدينة",
  },
  {
    href: "/asma",
    icon: Star,
    title: "أسماء الله الحسنى",
    desc: "التسعة والتسعون اسماً مع معانيها المختصرة، «من أحصاها دخل الجنة» — متفق عليه.",
    tag: "٩٩ اسماً",
  },
];

export default function HomePage() {
  const totalAyahs = chapters.reduce((a, c) => a + c.ayahs, 0);

  const stats = [
    { value: "١١٤", label: "سورة كاملة" },
    { value: totalAyahs.toLocaleString("ar-EG"), label: "آية كريمة" },
    { value: "١١٠٠+", label: "حديث من البخاري" },
    { value: "٩٩", label: "اسماً حسنى" },
  ];

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.22]"
          style={{ backgroundImage: "url(/images/mosque-hero.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night-950/70 via-night-950/55 to-night-950" />
        <div className="absolute inset-0 pattern-dense" />
        <div className="absolute top-1/4 right-[10%] w-[420px] h-[420px] rounded-full bg-gold-500/6 blur-[130px]" />
        <div className="absolute bottom-0 left-[8%] w-[380px] h-[380px] rounded-full bg-emerald-glow/7 blur-[120px]" />

        {/* rotating star */}
        <div className="absolute top-24 left-1/2 -translate-x-1/2 opacity-[0.13] pointer-events-none">
          <svg width="640" height="640" viewBox="0 0 200 200" className="animate-spin-slow">
            <g fill="none" stroke="#d4af37" strokeWidth="0.4">
              <polygon points="100,4 122,44 166,34 156,78 196,100 156,122 166,166 122,156 100,196 78,156 34,166 44,122 4,100 44,78 34,34 78,44" />
              <polygon points="100,30 115,58 147,52 141,84 170,100 141,116 147,148 115,142 100,170 85,142 53,148 59,116 30,100 59,84 53,52 85,58" />
              <circle cx="100" cy="100" r="70" />
              <circle cx="100" cy="100" r="40" />
            </g>
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-20 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 mb-8"
          >
            <BadgeCheck size={16} className="text-emerald-glow" />
            <span className="text-sm text-cream-300 font-medium">
              محتوى موثّق من مصادر شرعية معتمدة
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-kufi text-5xl md:text-7xl font-bold leading-tight"
          >
            <span className="gold-text text-glow-gold animate-shimmer">
              نُورُ اليَقين
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="font-amiri text-xl md:text-2xl text-cream-100 mt-8 max-w-3xl mx-auto leading-[2.2]"
          >
            ﴿ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ مُبَارَكٌ لِّيَدَّبَّرُوا آيَاتِهِ
            وَلِيَتَذَكَّرَ أُولُو الْأَلْبَابِ ﴾
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-cream-500 text-sm mt-3"
          >
            [ص: ٢٩] — غاية التنزيل وهدف الدبر والتذكر
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-12"
          >
            <Link
              href="/quran"
              className="group relative inline-flex items-center gap-2.5 bg-gradient-to-l from-gold-500 to-gold-600 text-night-950 font-bold px-8 py-4 rounded-2xl text-lg shadow-[0_10px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_10px_50px_rgba(212,175,55,0.5)] transition-all hover:-translate-y-0.5"
            >
              <BookOpen size={21} />
              اقرأ القرآن بالتجويد
              <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link
              href="/tasbih"
              className="inline-flex items-center gap-2.5 glass gold-border text-cream-100 font-semibold px-8 py-4 rounded-2xl text-lg hover:bg-white/5 transition-all hover:-translate-y-0.5"
            >
              <Hash size={20} className="text-emerald-glow" />
              ابدأ التسبيح
            </Link>
          </motion.div>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-6 gold-border"
              >
                <div className="font-kufi text-3xl md:text-4xl font-bold gold-text">
                  {s.value}
                </div>
                <div className="text-cream-300/75 text-sm mt-2">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-14">
          <h2 className="font-kufi text-4xl font-bold gold-text">
              أقسام المنصة
          </h2>
          <p className="text-cream-300/75 mt-4 max-w-2xl mx-auto leading-8">
            كل ما يحتاجه المسلم للقراءة والذكر والتعلم في مكان واحد، بمحتوى
            موثوق من المصادر المعتمدة
          </p>
          <div className="ornament-divider mt-6 max-w-md mx-auto">
            <span className="text-gold-500 text-lg">﴿﴾</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.href}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
              >
                <Link
                  href={f.href}
                  className="group block glass luxury-frame rounded-2xl p-7 h-full transition-all duration-300 hover:bg-white/[0.04] hover:-translate-y-1.5"
                >
                  <div className="flex items-start justify-between">
                    <span className="w-13 h-13 p-3 rounded-2xl grid place-items-center bg-gradient-to-br from-gold-500/15 to-emerald-glow/10 border border-gold-500/25 text-gold-400 group-hover:text-gold-300 group-hover:scale-110 transition-all">
                      <Icon size={24} />
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-glow/90 border border-emerald-glow/20 bg-emerald-glow/5 rounded-full px-3 py-1">
                      {f.tag}
                    </span>
                  </div>
                  <h3 className="font-kufi text-xl font-bold text-cream-100 mt-5 group-hover:text-gold-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-cream-300/70 text-sm leading-7 mt-3">
                    {f.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-gold-400 text-sm font-semibold mt-5 opacity-0 group-hover:opacity-100 transition-opacity">
                    دخول القسم
                    <ArrowLeft size={15} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= DAILY ================= */}
      <section className="relative max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-6">
          <VerseOfDay />
          <HadithOfDay />
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="relative max-w-7xl mx-auto px-4 py-20">
        <div className="relative glass-strong luxury-frame rounded-3xl px-8 py-16 text-center overflow-hidden">
          <div className="absolute inset-0 pattern-dense opacity-70" />
          <div className="absolute -top-24 right-1/4 w-72 h-72 rounded-full bg-gold-500/10 blur-[100px]" />
          <div className="relative">
            <p className="font-amiri text-2xl md:text-3xl text-cream-100 leading-[2.4] max-w-3xl mx-auto">
              «مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُهُ مَثَلُ
              الْحَيِّ وَالْمَيِّتِ»
            </p>
            <p className="text-gold-400 text-sm mt-4">— صحيح البخاري (٦٤٠٧)</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                href="/adhkar"
                className="bg-gradient-to-l from-gold-500 to-gold-600 text-night-950 font-bold px-7 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_rgba(212,175,55,0.3)]"
              >
                أذكار الصباح والمساء
              </Link>
              <Link
                href="/hadith"
                className="glass gold-border text-cream-100 font-semibold px-7 py-3.5 rounded-xl hover:bg-white/5 transition-all hover:-translate-y-0.5"
              >
                تصفح صحيح البخاري
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
