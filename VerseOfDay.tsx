"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ScrollText,
  ShieldCheck,
  Loader2,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  X,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useBookmarks } from "@/lib/visitor";

type Hadith = { id: number; number: number; chapter: string; text: string };

export default function HadithPage() {
  const [hadiths, setHadiths] = useState<Hadith[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const [chapter, setChapter] = useState("");
  const [chapters, setChapters] = useState<{ chapter: string; c: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);
  const { toggle, isSaved } = useBookmarks();
  const perPage = 20;
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/hadiths/chapters")
      .then((r) => r.json())
      .then((d) => setChapters(d.chapters || []))
      .catch(() => {});
  }, []);

  const fetchHadiths = useCallback(
    async (p: number, query: string, ch: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(p),
          perPage: String(perPage),
        });
        if (query) params.set("q", query);
        if (ch) params.set("chapter", ch);
        const res = await fetch(`/api/hadiths?${params}`);
        const data = await res.json();
        setHadiths(data.hadiths || []);
        setTotal(data.total || 0);
      } catch {
        setHadiths([]);
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchHadiths(1, q, chapter);
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, chapter]);

  useEffect(() => {
    if (!initialLoading) fetchHadiths(page, q, chapter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const goToPage = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const totalPages = Math.ceil(total / perPage);
  const copy = (h: Hadith) => {
    navigator.clipboard.writeText(
      `${h.text}\n\n— صحيح البخاري، حديث رقم ${h.number}، ${h.chapter}`
    );
    setCopied(h.id);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div>
      <PageHeader
        title="صَحيحُ البُخاري"
        subtitle="مكتبة تضم أكثر من ١١٠٠ حديث صحيح من صحيح البخاري — أصدق الكتب بعد كتاب الله — مع أرقام الأحاديث وأبوابها وبحث فوري في المتون"
      >
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <span className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 text-sm text-cream-300">
            <ShieldCheck size={16} className="text-emerald-glow" />
            المصدر: صحيح البخاري للإمام محمد بن إسماعيل البخاري (٢٥٦هـ)
          </span>
          <span className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 text-sm text-cream-300">
            <ScrollText size={16} className="text-gold-400" />
            {total.toLocaleString("ar-EG")} حديثاً ظاهراً
          </span>
        </div>
      </PageHeader>

      <div ref={topRef} className="max-w-7xl mx-auto px-4 py-10">
        {/* search & filters */}
        <div className="glass luxury-frame rounded-2xl p-5 mb-8">
          <div className="grid md:grid-cols-[1fr_280px] gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-500"
              />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="ابحث في نص الأحاديث… مثال: النية، الصلاة، الصدق"
                className="input-lux w-full pr-12"
              />
              {q && (
                <button
                  onClick={() => setQ("")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-cream-500 hover:text-cream-100"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="input-lux"
            >
              <option value="">جميع الأبواب</option>
              {chapters.map((c) => (
                <option key={c.chapter} value={c.chapter}>
                  {c.chapter} ({c.c})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* list */}
        {initialLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="animate-spin text-gold-400" size={34} />
          </div>
        ) : (
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-gold-400" size={30} />
                </div>
              ) : hadiths.length === 0 ? (
                <div className="glass rounded-2xl p-14 text-center text-cream-300/70">
                  لا توجد نتائج مطابقة — جرّب كلمات أخرى
                </div>
              ) : (
                hadiths.map((h, i) => {
                  const saved = isSaved("hadith", String(h.id));
                  return (
                    <motion.article
                      key={h.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.03, 0.4), duration: 0.4 }}
                      className="glass luxury-frame rounded-2xl p-6 md:p-8 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gold-500/[0.04] blur-3xl rounded-full pointer-events-none" />
                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold-300 border border-gold-500/30 bg-gold-500/8 rounded-full px-3 py-1.5">
                          <ScrollText size={12} />
                          حديث رقم {h.number.toLocaleString("ar-EG")}
                        </span>
                        <span className="text-[11px] text-cream-500">
                          {h.chapter}
                        </span>
                        <span className="flex-1" />
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-glow/90">
                          <ShieldCheck size={12} />
                          صحيح البخاري
                        </span>
                      </div>

                      <p className="font-amiri text-[1.12rem] md:text-[1.2rem] leading-[2.35] text-cream-100">
                        {h.text}
                      </p>

                      <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/[0.05]">
                        <button
                          onClick={() =>
                            toggle("hadith", String(h.id), `حديث #${h.number}`, h.text.slice(0, 200))
                          }
                          className={`inline-flex items-center gap-2 text-xs font-semibold rounded-xl px-4 py-2 transition-all ${
                            saved
                              ? "bg-gold-500/15 border border-gold-500/40 text-gold-300"
                              : "glass border border-white/10 text-cream-300/70 hover:text-gold-300"
                          }`}
                        >
                          {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
                          {saved ? "محفوظ" : "حفظ"}
                        </button>
                        <button
                          onClick={() => copy(h)}
                          className="inline-flex items-center gap-2 text-xs font-semibold glass border border-white/10 rounded-xl px-4 py-2 text-cream-300/70 hover:text-emerald-glow transition-colors"
                        >
                          {copied === h.id ? (
                            <>
                              <Check size={14} className="text-emerald-glow" /> تم النسخ
                            </>
                          ) : (
                            <>
                              <Copy size={14} /> نسخ الحديث
                            </>
                          )}
                        </button>
                      </div>
                    </motion.article>
                  );
                })
              )}
            </AnimatePresence>
          </div>
        )}

        {/* pagination */}
        {!initialLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              className="glass gold-border rounded-xl p-3 text-cream-300 disabled:opacity-30 hover:text-gold-300 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let p: number;
              if (totalPages <= 7) p = i + 1;
              else if (page <= 4) p = i + 1;
              else if (page >= totalPages - 3) p = totalPages - 6 + i;
              else p = page - 3 + i;
              return (
                <button
                  key={p}
                  onClick={() => goToPage(p)}
                  className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                    page === p
                      ? "bg-gold-500 text-night-950 shadow-[0_5px_20px_rgba(212,175,55,0.35)]"
                      : "glass text-cream-300/70 hover:text-gold-300"
                  }`}
                >
                  {p.toLocaleString("ar-EG")}
                </button>
              );
            })}
            <button
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              className="glass gold-border rounded-xl p-3 text-cream-300 disabled:opacity-30 hover:text-gold-300 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
