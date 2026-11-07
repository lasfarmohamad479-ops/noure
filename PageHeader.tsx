"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Star, Search, BadgeCheck } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { asmaAllah } from "@/lib/content-data";

export default function AsmaPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => asmaAllah.filter((a) => a.name.includes(q.trim()) || a.meaning.includes(q.trim())),
    [q]
  );

  return (
    <div>
      <PageHeader
        title="أَسمَاءُ اللَّهِ الحُسنَى"
        subtitle="التسعة والتسعون اسماً كما وردت في الحديث الصحيح، مع معانيها المختصرة — «إِنَّ لِلَّهِ تِسْعَةً وَتِسْعِينَ اسْمًا، مَائِةً إِلَّا وَاحِدًا، مَنْ أَحْصَاهَا دَخَلَ الْجَنَّةَ»"
      >
        <div className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 mt-6">
          <BadgeCheck size={16} className="text-emerald-glow" />
          <span className="text-sm text-cream-300">متفق عليه — البخاري (٢٧٣٦) ومسلم (٢٦٧٧)</span>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="relative max-w-xl mx-auto mb-10">
          <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-500" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ابحث عن اسم أو معنى…"
            className="input-lux w-full pr-12 text-center"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 8) * 0.035 }}
              className="group glass luxury-frame rounded-2xl p-6 hover:bg-white/[0.04] transition-all hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <span className="w-9 h-9 rounded-lg grid place-items-center bg-gold-500/10 border border-gold-500/25 text-gold-400">
                  <Star size={15} />
                </span>
                <span className="text-[11px] text-cream-500 font-kufi">
                  {(i + 1).toLocaleString("ar-EG")}
                </span>
              </div>
              <h3 className="font-ruqaa text-[1.65rem] text-gold-300 mt-4 group-hover:text-gold-200 transition-colors leading-relaxed">
                {a.name}
              </h3>
              <p className="text-cream-300/75 text-[13px] leading-6 mt-2">
                {a.meaning}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-cream-300/60 py-16">لا توجد نتائج مطابقة</p>
        )}
      </div>
    </div>
  );
}
