"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Coordinates,
  CalculationMethod,
  type CalculationParameters,
  Madhab,
  Prayer,
  PrayerTimes,
  Qibla,
} from "adhan";
import {
  Moon,
  MapPin,
  Navigation,
  Loader2,
  Sunrise,
  Sun,
  Sunset,
  MoonStar,
  CloudSun,
  Compass,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { prayerCities } from "@/lib/content-data";

const METHOD_MAP: Record<string, () => CalculationParameters> = {
  UmmAlQura: () => CalculationMethod.UmmAlQura(),
  Egyptian: () => CalculationMethod.Egyptian(),
  Dubai: () => CalculationMethod.Dubai(),
  Qatar: () => CalculationMethod.Qatar(),
  Kuwait: () => CalculationMethod.Kuwait(),
  MuslimWorldLeague: () => CalculationMethod.MuslimWorldLeague(),
  Turkey: () => CalculationMethod.Turkey(),
  Karachi: () => CalculationMethod.Karachi(),
  ISNA: () => CalculationMethod.NorthAmerica(),
  Singapore: () => CalculationMethod.Singapore(),
};

function resolveMethod(m: string) {
  return (METHOD_MAP[m] || METHOD_MAP.MuslimWorldLeague)();
}

const PRAYER_META = [
  { key: "fajr", label: "الفجر", icon: MoonStar, color: "text-indigo-300" },
  { key: "sunrise", label: "الشروق", icon: Sunrise, color: "text-amber-300" },
  { key: "dhuhr", label: "الظهر", icon: Sun, color: "text-yellow-300" },
  { key: "asr", label: "العصر", icon: CloudSun, color: "text-orange-300" },
  { key: "maghrib", label: "المغرب", icon: Sunset, color: "text-rose-300" },
  { key: "isha", label: "العشاء", icon: Moon, color: "text-blue-300" },
] as const;

const fmt = (d: Date) =>
  d.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit", hour12: true });

export default function PrayersPage() {
  const [cityIdx, setCityIdx] = useState(0);
  const [coords, setCoords] = useState<{ lat: number; lng: number; label: string }>({
    lat: prayerCities[0].lat,
    lng: prayerCities[0].lng,
    label: `${prayerCities[0].name} — ${prayerCities[0].country}`,
  });
  const [now, setNow] = useState(new Date());
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState("");
  const tickRef = useRef<number>(0);

  const city = prayerCities[cityIdx];

  const times = useMemo(() => {
    const c = new Coordinates(coords.lat, coords.lng);
    const params = resolveMethod(city.method);
    params.madhab = Madhab.Shafi;
    return new PrayerTimes(c, now, params);
  }, [coords, now, city.method]);

  const qibla = useMemo(() => {
    const c = new Coordinates(coords.lat, coords.lng);
    return Qibla(c);
  }, [coords]);

  const hijri = useMemo(
    () =>
      new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now),
    [now]
  );

  const next = useMemo(() => {
    const n = times.nextPrayer();
    const name =
      n === Prayer.Fajr
        ? "الفجر"
        : n === Prayer.Dhuhr
        ? "الظهر"
        : n === Prayer.Asr
        ? "العصر"
        : n === Prayer.Maghrib
        ? "المغرب"
        : n === Prayer.Isha
        ? "العشاء"
        : "الفجر";
    return { name, time: times.timeForPrayer(n) };
  }, [times]);

  const countdown = useMemo(() => {
    if (!next.time) return { h: "٠٠", m: "٠٠", s: "٠٠" };
    let diff = Math.max(0, next.time.getTime() - now.getTime());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return {
      h: h.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }),
      m: m.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }),
      s: s.toLocaleString("ar-EG", { minimumIntegerDigits: 2 }),
    };
  }, [next, now]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("المتصفح لا يدعم تحديد الموقع");
      return;
    }
    setGeoLoading(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          label: "موقعك الحالي",
        });
        setGeoLoading(false);
      },
      () => {
        setGeoError("تعذر تحديد الموقع — اختر مدينتك يدوياً");
        setGeoLoading(false);
      },
      { timeout: 10000 }
    );
  }, []);

  // day progress for ring
  const dayProgress = useMemo(() => {
    const start = new Date(now);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start.getTime() + 86400000);
    return (now.getTime() - start.getTime()) / (end.getTime() - start.getTime());
  }, [now]);

  const R = 88;
  const CIRC = 2 * Math.PI * R;

  return (
    <div>
      <PageHeader
        title="مَواقِيتُ الصَّلاة"
        subtitle="مواقيت الصلاة لجميع المدن حسب موقعك — تُحسب فلكياً بالمعادلات المعتمدة عالمياً، مع العد التنازلي للصلاة القادمة وبوصلة القبلة والتاريخ الهجري"
      >
        <div className="inline-flex items-center gap-2 glass gold-border rounded-full px-5 py-2 mt-6">
          <Moon size={16} className="text-gold-400" />
          <span className="text-sm text-cream-300 font-amiri">{hijri}</span>
        </div>
      </PageHeader>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* location controls */}
        <div className="glass luxury-frame rounded-2xl p-5 mb-8 flex flex-wrap items-center gap-3">
          <MapPin size={18} className="text-gold-400" />
          <span className="text-sm text-cream-300/85 font-semibold">
            {coords.label}
          </span>
          <div className="flex-1" />
          <select
            value={cityIdx}
            onChange={(e) => {
              const i = Number(e.target.value);
              setCityIdx(i);
              setCoords({
                lat: prayerCities[i].lat,
                lng: prayerCities[i].lng,
                label: `${prayerCities[i].name} — ${prayerCities[i].country}`,
              });
            }}
            className="input-lux text-sm py-2.5"
          >
            {prayerCities.map((c, i) => (
              <option key={c.name} value={i}>
                {c.name} — {c.country}
              </option>
            ))}
          </select>
          <button
            onClick={detectLocation}
            className="bg-gradient-to-l from-gold-500 to-gold-600 text-night-950 font-bold text-sm rounded-xl px-5 py-2.5 inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all"
          >
            {geoLoading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Navigation size={15} />
            )}
            موقعي الحالي
          </button>
          {geoError && (
            <span className="text-xs text-rose-300 w-full">{geoError}</span>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8">
          {/* ===== next prayer hero ===== */}
          <div className="space-y-6">
            <div className="glass-strong luxury-frame rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 pattern-dense opacity-50" />
              <div className="absolute -top-20 left-1/3 w-64 h-64 bg-emerald-glow/8 blur-[90px]" />
              <div className="relative flex flex-col md:flex-row items-center gap-8">
                {/* countdown ring */}
                <div className="relative shrink-0">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                    <motion.circle
                      cx="100"
                      cy="100"
                      r={R}
                      fill="none"
                      stroke="url(#pg)"
                      strokeWidth="10"
                      strokeLinecap="round"
                      strokeDasharray={CIRC}
                      animate={{ strokeDashoffset: CIRC * (1 - dayProgress) }}
                      transform="rotate(-90 100 100)"
                      className="animate-glow-ring"
                    />
                    <defs>
                      <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2dd4a7" />
                        <stop offset="100%" stopColor="#d4af37" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="text-center">
                      <div className="font-kufi text-3xl font-bold gold-text" dir="ltr">
                        {countdown.h}:{countdown.m}:{countdown.s}
                      </div>
                      <div className="text-cream-500 text-[11px] mt-1">متبقٍ للصلاة</div>
                    </div>
                  </div>
                </div>

                <div className="text-center md:text-right flex-1">
                  <p className="text-emerald-glow/90 text-sm font-semibold mb-1">
                    الصلاة القادمة
                  </p>
                  <h3 className="font-kufi text-4xl font-bold gold-text text-glow-gold">
                    {next.name}
                  </h3>
                  <p className="font-amiri text-2xl text-cream-100 mt-3">
                    {next.time ? fmt(next.time) : "—"}
                  </p>
                  <p className="font-amiri text-cream-300/70 mt-4 text-sm leading-7">
                    «أَثْقَلُ الصَّلَاةِ عَلَى الْمُنَافِقِينَ صَلاَةُ الْعِشَاءِ
                    وَصَلاَةُ الْفَجْرِ» — البخاري (٦٥٧)
                  </p>
                </div>
              </div>
            </div>

            {/* times grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PRAYER_META.map((p, i) => {
                const Icon = p.icon;
                const t = times[p.key];
                const isNext =
                  next.name === p.label;
                return (
                  <motion.div
                    key={p.key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`glass rounded-2xl p-5 relative overflow-hidden transition-all ${
                      isNext
                        ? "border-gold-500/50 bg-gold-500/[0.06]"
                        : ""
                    }`}
                  >
                    {isNext && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold text-night-950 bg-gold-500 rounded-full px-2.5 py-0.5">
                        القادمة
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span className={`w-10 h-10 rounded-xl grid place-items-center bg-white/[0.05] border border-white/[0.08] ${p.color}`}>
                        <Icon size={19} />
                      </span>
                      <div>
                        <div className="text-cream-300/75 text-sm">{p.label}</div>
                        <div className="font-kufi font-bold text-lg text-cream-100">
                          {t ? fmt(t) : "—"}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ===== qibla ===== */}
          <div className="space-y-5">
            <div className="glass luxury-frame rounded-3xl p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 pattern-dense opacity-40" />
              <div className="relative">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Compass size={18} className="text-gold-400" />
                  <h3 className="font-kufi font-bold text-gold-300 text-xl">
                    اتجاه القبلة
                  </h3>
                </div>
                <p className="text-cream-500 text-xs mb-6">
                  من {coords.label} — الزاوية من الشمال
                </p>

                <div className="relative w-52 h-52 mx-auto">
                  <div className="absolute inset-0 rounded-full border-2 border-gold-500/25 bg-night-900/70" />
                  <div className="absolute inset-3 rounded-full border border-gold-500/10" />
                  {/* cardinal marks */}
                  {["ش", "ق", "ج", "غ"].map((d, i) => {
                    const a = (i * 90 - 90) * (Math.PI / 180);
                    return (
                      <span
                        key={d}
                        className="absolute text-cream-400 text-sm font-bold"
                        style={{
                          left: `calc(50% + ${Math.cos(a) * 82}px - 8px)`,
                          top: `calc(50% + ${Math.sin(a) * 82}px - 10px)`,
                        }}
                      >
                        {d}
                      </span>
                    );
                  })}
                  {/* needle */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: qibla }}
                    transition={{ type: "spring", stiffness: 60, damping: 15 }}
                  >
                    <div
                      className="absolute left-1/2 bottom-1/2 w-1.5 h-20 -translate-x-1/2 origin-bottom rounded-full"
                      style={{
                        background: "linear-gradient(to top, #d4af37, #2dd4a7)",
                        boxShadow: "0 0 16px rgba(212,175,55,0.5)",
                      }}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 top-[26px] w-3.5 h-3.5 rounded-full bg-gold-400 shadow-[0_0_14px_rgba(212,175,55,0.8)]" />
                  </motion.div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-500 border-2 border-night-900" />
                  {/* Kaaba label */}
                  <span
                    className="absolute text-gold-300 text-2xl"
                    style={{
                      left: "50%",
                      top: 8,
                      transform: "translateX(-50%) rotate(-90deg) translateX(-50%)",
                      transformOrigin: "center",
                    }}
                  >
                    🕋
                  </span>
                </div>

                <div className="mt-7">
                  <div className="font-kufi text-4xl font-bold gold-text">
                    {Math.round(qibla).toLocaleString("ar-EG")}°
                  </div>
                  <p className="text-cream-500 text-xs mt-2">
                    وجّه وجهك من الشمال بمقدار هذه الزاوية (باتجاه عقارب الساعة)
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-5 text-[13px] leading-7 text-cream-300/75">
              <p className="font-semibold text-gold-300 mb-2">فضل الصلاة في وقتها:</p>
              «أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ الصَّلاَةُ عَلَى وَقْتِهَا» —
              متفق عليه (البخاري: ٥٢٧)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
