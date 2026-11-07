"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Play,
  Pause,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Volume2,
  Type,
  Palette,
  Loader2,
  X,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TajweedText from "@/components/TajweedText";
import { useBookmarks } from "@/lib/visitor";

type Chapter = { n: number; name: string; ayahs: number; type: string; order: number };

const RECITER_BASE = "https://everyayah.com/data/Alafasy_128kbps";

const legend = [
  { color: "#f56565", label: "مدّ لازم" },
  { color: "#fc8181", label: "مدّ واجب" },
  { color: "#f6ad55", label: "مدّ منفصل" },
  { color: "#63b3ed", label: "مدّ طبيعي" },
  { color: "#ecc94b", label: "قلقلة" },
  { color: "#68d391", label: "غنّة" },
  { color: "#9ae6b4", label: "إخفاء" },
  { color: "#4fd1c5", label: "إدغام بغنة" },
  { color: "#b794f4", label: "إدغام بغير غنة" },
  { color: "#f687b3", label: "إقلاب" },
];

export default function QuranPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selected, setSelected] = useState<number>(1);
  const [ayahs, setAyahs] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [fontScale, setFontScale] = useState(1.55);
  const [showTajweed, setShowTajweed] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toggle, isSaved } = useBookmarks();

  useEffect(() => {
    fetch("/data/chapters.json")
      .then((r) => r.json())
      .then((d: Chapter[]) => setChapters(d));
  }, []);

  const loadSurah = useCallback(async (n: number) => {
    setLoading(true);
    setAyahs(null);
    const all = await fetch("/data/quran-tajweed.json").then((r) => r.json());
    setAyahs(all[n - 1]?.ayahs || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSurah(selected);
  }, [selected, loadSurah]);

  const current = useMemo(
    () => chapters.find((c) => c.n === selected),
    [chapters, selected]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return chapters;
    return chapters.filter(
      (c) => c.name.includes(search.trim()) || String(c.n) === search.trim()
    );
  }, [chapters, search]);

  const playAyah = useCallback(
    (i: number) => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(
        `${RECITER_BASE}/${String(selected).padStart(3, "0")}${String(i + 1).padStart(3, "0")}.mp3`
      );
      audioRef.current = audio;
      setPlaying(i);
      audio.onended = () => setPlaying(null);
      audio.onerror = () => setPlaying(null);
      audio.play().catch(() => setPlaying(null));
    },
    [selected]
  );

  const stopAudio = () => {
    audioRef.current?.pause();
    setPlaying(null);
  };

  useEffect(() => () => audioRef.current?.pause(), []);

  return (
    <div>
      <PageHeader
        title="القُرآنُ الكَريم"
        subtitle="القرآن كاملاً بالرسم العثماني مع علامات التجويد الملوّنة — نصوص موثّقة من المصحف المعتمد عبر منصة Quran.com، والتلاوة بصوت الشيخ مشاري راشد العفاسي"
      >
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <button
            onClick={() => setShowTajweed(!showTajweed)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              showTajweed
                ? "bg-gold-500/15 border border-gold-500/40 text-gold-300"
                : "glass text-cream-300/70"
            }`}
          >
            <Palette size={16} />
            {showTajweed ? "التجويد مُلوَّن" : "التجويد مُطفأ"}
          </button>
          <button
            onClick={() => setShowLegend(!showLegend)}
            className="glass gold-border rounded-xl px-4 py-2.5 text-sm font-semibold text-cream-300 hover:text-gold-300 transition-colors"
          >
            دليل الألوان
          </button>
          <div className="glass gold-border rounded-xl flex items-center gap-1 px-3 py-1.5">
            <Type size={15} className="text-gold-400" />
            <button
              onClick={() => setFontScale((f) => Math.min(2.6, +(f + 0.15).toFixed(2)))}
              className="w-8 h-8 rounded-lg hover:bg-white/10 text-lg font-bold"
            >
              +
            </button>
            <button
              onClick={() => setFontScale((f) => Math.max(1.1, +(f - 0.15).toFixed(2)))}
              className="w-8 h-8 rounded-lg hover:bg-white/10 text-lg font-bold"
            >
              −
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2.5 mt-6 max-w-3xl mx-auto">
                {legend.map((l) => (
                  <span
                    key={l.label}
                    className="inline-flex items-center gap-2 text-xs text-cream-300 glass rounded-full px-3.5 py-1.5"
                  >
                    <span
                      className="w-3 h-3 rounded-full inline-block"
                      style={{ background: l.color }}
                    />
                    {l.label}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-[340px_1fr] gap-8">
        {/* ============ Surah list ============ */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="relative mb-4">
            <Search
              size={17}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-cream-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث عن سورة…"
              className="input-lux w-full pr-11"
            />
          </div>
          <div className="glass rounded-2xl overflow-hidden max-h-[70vh] overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.n}
                onClick={() => setSelected(c.n)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-right transition-colors border-b border-white/[0.04] ${
                  selected === c.n
                    ? "bg-gold-500/10 text-gold-300"
                    : "text-cream-300/85 hover:bg-white/[0.04]"
                }`}
              >
                <span
                  className={`w-9 h-9 shrink-0 grid place-items-center rounded-lg text-sm font-bold font-kufi ${
                    selected === c.n
                      ? "bg-gold-500/20 text-gold-300"
                      : "bg-white/5 text-cream-500"
                  }`}
                >
                  {c.n.toLocaleString("ar-EG")}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-kufi font-bold text-[15px] truncate">
                    {c.name}
                  </span>
                  <span className="block text-[11px] text-cream-500/80">
                    {c.type} • {c.ayahs.toLocaleString("ar-EG")} آية
                  </span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        {/* ============ Reader ============ */}
        <section>
          <div className="glass-strong luxury-frame rounded-3xl overflow-hidden">
            {/* surah header */}
            <div className="relative px-6 md:px-10 py-10 text-center border-b border-gold-500/15 pattern-bg overflow-hidden">
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-40 bg-gold-500/10 blur-3xl" />
              <p className="text-xs text-emerald-glow/80 mb-2">
                {current?.type} • ترتيب النزول: {current?.order?.toLocaleString("ar-EG")}
              </p>
              <h2 className="font-kufi text-3xl md:text-4xl font-bold gold-text text-glow-gold">
                سورة {current?.name || "…"}
              </h2>
              {selected !== 1 && selected !== 9 && (
                <p className="font-quran text-2xl mt-5 text-gold-300/90">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              )}
            </div>

            {/* ayahs */}
            <div
              className="px-5 md:px-10 py-10 text-center mushaf-frame"
              style={{ fontSize: `${fontScale}rem` }}
            >
              {loading || !ayahs ? (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="animate-spin text-gold-400" size={32} />
                </div>
              ) : showTajweed ? (
                <div className="leading-[2.6] text-cream-100">
                  {ayahs.map((t, i) => (
                    <span
                      key={i}
                      className="group/ayah relative inline-block cursor-pointer rounded-lg hover:bg-white/[0.03] px-1"
                      onClick={() => (playing === i ? stopAudio() : playAyah(i))}
                    >
                      <TajweedText text={t} size="text-[1em]" />
                      {playing === i && (
                        <span className="absolute inset-0 rounded-lg bg-emerald-glow/10 border border-emerald-glow/30 pointer-events-none" />
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="leading-[2.6] font-quran text-cream-100" dir="rtl">
                  {ayahs.map((t, i) => (
                    <span
                      key={i}
                      className="group/ayah relative inline-block cursor-pointer rounded-lg hover:bg-white/[0.03] px-1"
                      onClick={() => (playing === i ? stopAudio() : playAyah(i))}
                    >
                      {t
                        .replace(/<[^>]+>/g, "")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ayah tools */}
          <div className="glass rounded-2xl mt-5 p-4 flex flex-wrap items-center gap-3">
            <BookOpen size={16} className="text-gold-400" />
            <span className="text-sm text-cream-300/80">
              انقر على أي آية للاستماع إليها — أو احفظها في مفضلتك:
            </span>
            <div className="flex-1" />
            <select
              value={selected}
              onChange={(e) => setSelected(Number(e.target.value))}
              className="input-lux text-sm py-2"
            >
              {chapters.map((c) => (
                <option key={c.n} value={c.n}>
                  {c.n}. {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* per-ayah bookmarks */}
          {!loading && ayahs && (
            <div className="grid sm:grid-cols-2 gap-3 mt-5">
              {ayahs.slice(0, 0).map((_, i) => null)}
              <div className="hidden" />
            </div>
          )}
          {!loading && ayahs && (
            <div className="glass rounded-2xl mt-5 p-5">
              <h4 className="font-kufi font-bold text-gold-300 mb-3 text-sm">
                حفظ آيات في المفضلة
              </h4>
              <div className="flex flex-wrap gap-2">
                {ayahs.map((t, i) => {
                  const ref = `${selected}:${i + 1}`;
                  const saved = isSaved("ayah", ref);
                  const plain = t.replace(/<[^>]+>/g, "").trim();
                  return (
                    <button
                      key={i}
                      onClick={() =>
                        toggle("ayah", ref, `${current?.name}: ${ref}`, plain)
                      }
                      className={`inline-flex items-center gap-1.5 text-xs rounded-full px-3.5 py-2 transition-all ${
                        saved
                          ? "bg-gold-500/15 border border-gold-500/40 text-gold-300"
                          : "glass border border-white/10 text-cream-300/70 hover:text-gold-300"
                      }`}
                    >
                      {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
                      آية {(i + 1).toLocaleString("ar-EG")}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
