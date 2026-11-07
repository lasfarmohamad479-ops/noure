"use client";

import { motion } from "framer-motion";
import { Sparkles, GraduationCap, BookMarked } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import { tajweedRules, tajweedLegend } from "@/lib/tajweed-data";

export default function TajweedPage() {
  return (
    <div>
      <PageHeader
        title="أحكَامُ التَّجويد"
        subtitle="علومُ قراءة القرآن صحيحاً — شرح مبسّط لأحكام التجويد من كتب التجويد المعتمدة، مع الأمثلة القرآنية والدليل اللوني المستخدم في المصحف"
      >
        <div className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 mt-6">
          <GraduationCap size={16} className="text-emerald-glow" />
          <span className="text-sm text-cream-300">
            «وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا» [المزمل: ٤]
          </span>
        </div>
      </PageHeader>

      {/* color legend */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <SectionHeading
          icon={Sparkles}
          title="الدليل اللوني في المصحف"
          subtitle="هذه الألوان تظهر على حروف التجويد في نصوص القرآن بالموقع، لتعرف الحكم مباشرة أثناء القراءة"
          center
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tajweedLegend.map((l, i) => (
            <motion.div
              key={l.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="glass rounded-2xl p-5 flex items-center gap-4"
            >
              <span
                className="w-11 h-11 rounded-xl grid place-items-center font-quran text-2xl"
                style={{ background: `${l.color}1f`, color: l.color, border: `1px solid ${l.color}55` }}
              >
                ◉
              </span>
              <div>
                <div className="font-bold text-cream-100 text-[15px]">{l.label}</div>
                <div className="text-cream-500 text-xs mt-0.5">{l.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* rules */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <SectionHeading
          icon={BookMarked}
          title="أبواب التجويد بالتفصيل"
          subtitle="التعريف والحروف والأمثلة القرآنية لكل باب من أبواب التجويد"
        />
        <div className="grid md:grid-cols-2 gap-6">
          {tajweedRules.map((r, i) => (
            <motion.article
              key={r.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 2) * 0.08, duration: 0.5 }}
              className="glass luxury-frame rounded-2xl p-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="w-10 h-10 rounded-xl grid place-items-center font-kufi font-bold text-lg bg-gold-500/12 border border-gold-500/30 text-gold-300">
                  {(i + 1).toLocaleString("ar-EG")}
                </span>
                <h3 className="font-kufi text-xl font-bold text-gold-300">
                  {r.title}
                </h3>
              </div>

              <p className="text-cream-100/90 font-amiri text-lg leading-[2.1]">
                {r.definition}
              </p>

              {r.letters && (
                <div className="mt-4 flex items-start gap-2 text-sm">
                  <span className="text-gold-400 shrink-0 mt-0.5">الحروف:</span>
                  <span className="font-quran text-xl text-emerald-glow/90 leading-relaxed">
                    {r.letters}
                  </span>
                </div>
              )}

              {r.example && (
                <div className="mt-4 rounded-xl bg-night-800/60 border border-emerald-glow/15 px-5 py-4">
                  <span className="text-xs text-emerald-glow/80 block mb-1.5">مثال:</span>
                  <span className="font-quran text-2xl text-cream-100 leading-[2]">
                    {r.example}
                  </span>
                  {r.exampleRef && (
                    <span className="block text-xs text-cream-500 mt-2">
                      {r.exampleRef}
                    </span>
                  )}
                </div>
              )}

              {r.notes && (
                <ul className="mt-5 space-y-3">
                  {r.notes.map((n, j) => (
                    <li key={j} className="flex gap-3 text-sm leading-7 text-cream-300/85">
                      <span className="text-gold-500 shrink-0 mt-1">◆</span>
                      <span className="font-amiri text-[15.5px]">{n}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.article>
          ))}
        </div>
      </section>

      {/* practice */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="glass-strong luxury-frame rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 pattern-dense opacity-60" />
          <div className="relative">
            <p className="font-amiri text-2xl md:text-3xl leading-[2.3] text-cream-100 max-w-3xl mx-auto">
              «يُتَعَلَّمُ الْقُرْآنُ بِالْمَشْقَةِ وَالْمُجَاوَرَةِ»
            </p>
            <p className="text-gold-400 text-sm mt-3">
              فتعلّم التجويد عند مشايخ القراءات هو الأصل — وهذا الموقع عونٌ على الفهم لا بديلٌ عنها
            </p>
            <a
              href="/quran"
              className="inline-block mt-8 bg-gradient-to-l from-gold-500 to-gold-600 text-night-950 font-bold px-8 py-3.5 rounded-xl hover:-translate-y-0.5 transition-all shadow-[0_8px_30px_rgba(212,175,55,0.3)]"
            >
              طبّق ما تعلمت في القرآن
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
