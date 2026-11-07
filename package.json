"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Hash,
  RotateCcw,
  Volume2,
  VolumeX,
  Trophy,
  Flame,
  Sparkles,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { tasbihAdhkar } from "@/lib/content-data";

const TARGETS = [33, 99, 100, 500, 1000, 0];

export default function TasbihPage() {
  const [dhikrIdx, setDhikrIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [sound, setSound] = useState(true);
  const [totalToday, setTotalToday] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [pulse, setPulse] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const dhikr = tasbihAdhkar[dhikrIdx];
  const activeTarget = target === 0 ? dhikr.target : target;
  const progress = Math.min(1, count / activeTarget);

  // load persisted state
  useEffect(() => {
    try {
      const todayKey = `tasbih-${new Date().toISOString().slice(0, 10)}`;
      setTotalToday(parseInt(localStorage.getItem(todayKey) || "0", 10));
      setRounds(parseInt(localStorage.getItem("tasbih-rounds") || "0", 10));
    } catch {}
  }, []);

  const tick = useCallback(() => {
    if (!sound) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  }, [sound]);

  const increment = useCallback(() => {
    setCount((c) => {
      const next = c + 1;
      if (next >= activeTarget) {
        setRounds((r) => {
          const nr = r + 1;
          localStorage.setItem("tasbih-rounds", String(nr));
          return nr;
        });
        return 0;
      }
      return next;
    });
    setTotalToday((t) => {
      const nt = t + 1;
      localStorage.setItem(
        `tasbih-${new Date().toISOString().slice(0, 10)}`,
        String(nt)
      );
      return nt;
    });
    tick();
    if (navigator.vibrate) navigator.vibrate(12);
    setPulse(true);
    setTimeout(() => setPulse(false), 200);
  }, [activeTarget, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        increment();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [increment]);

  const R = 130;
  const CIRC = 2 * Math.PI * R;

  return (
    <div>
      <PageHeader
        title="السُّبحَةُ الإلكترونيّة"
        subtitle="سبحة رقمية فاخرة للتسبيح والذكر — بأذكار مأثورة عن النبي ﷺ مع المصدر، عدّ تلقائي، اهتزاز، وصوت خفيض"
      >
        <div className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 mt-6">
          <Hash size={16} className="text-emerald-glow" />
          <span className="text-sm text-cream-300">
            اضغط على الحلقة أو مفتاح المسافة في لوحة المفاتيح للتسبيح
          </span>
        </div>
      </PageHeader>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* dhikr selector */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {tasbihAdhkar.map((d, i) => (
            <button
              key={d.id}
              onClick={() => {
                setDhikrIdx(i);
                setCount(0);
              }}
              className={`text-[13px] font-semibold rounded-full px-4 py-2.5 transition-all ${
                dhikrIdx === i
                  ? "bg-gold-500 text-night-950 shadow-[0_5px_20px_rgba(212,175,55,0.3)]"
                  : "glass text-cream-300/75 hover:text-gold-300 border border-white/[0.07]"
              }`}
            >
              {d.text.split("،")[0].slice(0, 26)}
              {d.text.length > 26 ? "…" : ""}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* ======== counter ======== */}
          <div className="flex flex-col items-center">
            <div className="relative">
              {/* halo rings */}
              <div className="absolute inset-0 rounded-full bg-gold-500/6 blur-2xl scale-110 animate-pulse-soft" />
              <div
                className={`absolute inset-3 rounded-full border border-gold-500/15 ${
                  pulse ? "scale-105" : ""
                } transition-transform duration-200`}
              />

              <svg
                width="320"
                height="320"
                viewBox="0 0 320 320"
                className={`cursor-pointer select-none relative ${
                  pulse ? "scale-[1.03]" : ""
                } transition-transform duration-150`}
                onClick={increment}
              >
                <defs>
                  <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2dd4a7" />
                    <stop offset="60%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#eed9a4" />
                  </linearGradient>
                  <filter id="ring-glow">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* background ring */}
                <circle
                  cx="160"
                  cy="160"
                  r={R}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="14"
                />
                {/* progress ring */}
                <motion.circle
                  cx="160"
                  cy="160"
                  r={R}
                  fill="none"
                  stroke="url(#ring-g)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  animate={{ strokeDashoffset: CIRC * (1 - progress) }}
                  transition={{ type: "spring", stiffness: 120, damping: 22 }}
                  transform="rotate(-90 160 160)"
                  filter="url(#ring-glow)"
                />
                {/* decorative dots */}
                {Array.from({ length: 33 }).map((_, i) => {
                  const a = (i / 33) * Math.PI * 2 - Math.PI / 2;
                  const x = 160 + Math.cos(a) * 148;
                  const y = 160 + Math.sin(a) * 148;
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r={i < Math.floor(progress * 33) ? 3.5 : 1.8}
                      fill={i < Math.floor(progress * 33) ? "#d4af37" : "rgba(255,255,255,0.18)"}
                    />
                  );
                })}
              </svg>

              {/* center content */}
              <button
                onClick={increment}
                className="absolute inset-0 grid place-items-center cursor-pointer"
                aria-label="سبّح"
              >
                <div className="text-center">
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={count}
                      initial={{ scale: 0.6, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="font-kufi text-7xl font-bold gold-text text-glow-gold"
                    >
                      {count.toLocaleString("ar-EG")}
                    </motion.div>
                  </AnimatePresence>
                  <p className="text-cream-500 text-sm mt-2">
                    من {activeTarget.toLocaleString("ar-EG")}
                  </p>
                  <p className="text-emerald-glow/80 text-xs mt-1">
                    (مسافة) للتسبيح
                  </p>
                </div>
              </button>
            </div>

            {/* controls */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setCount(0)}
                className="glass gold-border rounded-xl px-5 py-3 text-sm font-semibold text-cream-300 hover:text-gold-300 transition-colors inline-flex items-center gap-2"
              >
                <RotateCcw size={15} />
                تصفير العدّاد
              </button>
              <button
                onClick={() => setSound(!sound)}
                className="glass gold-border rounded-xl px-5 py-3 text-sm font-semibold text-cream-300 hover:text-emerald-glow transition-colors inline-flex items-center gap-2"
              >
                {sound ? <Volume2 size={15} /> : <VolumeX size={15} />}
                {sound ? "الصوت مفعّل" : "الصوت مكتوم"}
              </button>
              <div className="glass gold-border rounded-xl flex items-center px-2 py-1.5">
                <span className="text-xs text-cream-500 px-2">الهدف:</span>
                {TARGETS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTarget(t)}
                    className={`w-11 h-9 rounded-lg text-sm font-bold transition-all ${
                      target === t
                        ? "bg-gold-500 text-night-950"
                        : "text-cream-300/70 hover:text-gold-300"
                    }`}
                  >
                    {t === 0 ? "آلي" : t.toLocaleString("ar-EG")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ======== side panel ======== */}
          <div className="space-y-5">
            {/* current dhikr */}
            <div className="glass luxury-frame rounded-2xl p-6">
              <h3 className="font-kufi font-bold text-gold-300 text-lg mb-3 flex items-center gap-2">
                <Sparkles size={17} />
                الذكر الحالي
              </h3>
              <p className="font-amiri text-xl leading-[2] text-cream-100">
                {dhikr.text}
              </p>
              <p className="text-cream-500 text-sm mt-2">{dhikr.meaning}</p>
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <p className="text-xs leading-6 text-cream-300/70">
                  <span className="text-gold-400 font-semibold">الدليل: </span>
                  {dhikr.source}
                </p>
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-2xl p-5 text-center gold-border">
                <Flame size={20} className="text-gold-400 mx-auto mb-2" />
                <div className="font-kufi text-3xl font-bold gold-text">
                  {totalToday.toLocaleString("ar-EG")}
                </div>
                <div className="text-cream-500 text-xs mt-1">تسبيحات اليوم</div>
              </div>
              <div className="glass rounded-2xl p-5 text-center gold-border">
                <Trophy size={20} className="text-emerald-glow mx-auto mb-2" />
                <div className="font-kufi text-3xl font-bold text-emerald-glow">
                  {rounds.toLocaleString("ar-EG")}
                </div>
                <div className="text-cream-500 text-xs mt-1">دورات مكتملة</div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 text-[13px] leading-7 text-cream-300/75">
              <p className="font-semibold text-gold-300 mb-2">فضل الذكر:</p>
              «مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُهُ مَثَلُ
              الْحَيِّ وَالْمَيِّتِ» — البخاري (٦٤٠٧)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
