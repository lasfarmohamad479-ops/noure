// Process raw downloaded data into optimized JSON files for the site
import fs from "fs";
import path from "path";

const PUB = path.join(process.cwd(), "public", "data");
const SRC = path.join(process.cwd(), "src", "data");
fs.mkdirSync(PUB, { recursive: true });
fs.mkdirSync(SRC, { recursive: true });

// ---------- 1) Chapters metadata ----------
const chaptersRaw = JSON.parse(
  fs.readFileSync("/tmp/chapters.json", "utf8")
).chapters;
const chapters = chaptersRaw.map((c) => ({
  n: c.id,
  name: c.name_arabic,
  ayahs: c.verses_count,
  type: c.revelation_place === "makkah" ? "مكية" : "مدنية",
  order: c.revelation_order,
}));
fs.writeFileSync(path.join(PUB, "chapters.json"), JSON.stringify(chapters));
console.log("chapters.json:", chapters.length);

// ---------- 2) Quran with tajweed ----------
const quran = [];
for (let i = 1; i <= 114; i++) {
  const file = JSON.parse(fs.readFileSync(`/tmp/qdata/c${i}.json`, "utf8"));
  const ayahs = file.verses.map((v) => v.text_uthmani_tajweed);
  quran.push({ n: i, ayahs });
}
fs.writeFileSync(
  path.join(PUB, "quran-tajweed.json"),
  JSON.stringify(quran)
);
console.log(
  "quran-tajweed.json:",
  quran.length,
  "chapters,",
  quran.reduce((a, c) => a + c.ayahs.length, 0),
  "ayahs"
);

// ---------- 3) Sahih Bukhari hadiths (first 1100) ----------
const bukhari = JSON.parse(fs.readFileSync("/tmp/bukhari.json", "utf8"));
const chapterMap = {};
for (const ch of bukhari.chapters) chapterMap[ch.id] = ch.arabic;

const clean = (t) =>
  t
    .replace(/\\n/g, " ")
    .replace(/\\"/g, '"')
    .replace(/\s+/g, " ")
    .replace(/ ," /g, '" ')
    .trim();

const hadiths = [];
for (const h of bukhari.hadiths.slice(0, 1100)) {
  const text = clean(h.arabic);
  if (!text || text.length < 40) continue;
  hadiths.push({
    id: h.id,
    number: h.idInBook,
    chapter: chapterMap[h.chapterId] || "",
    text,
  });
}
fs.writeFileSync(
  path.join(SRC, "bukhari.json"),
  JSON.stringify(hadiths)
);
console.log("bukhari.json:", hadiths.length, "hadiths");

// ---------- 4) Adhkar (Hisn al-Muslim) ----------
const adhkarRaw = JSON.parse(fs.readFileSync("/tmp/adhkar.json", "utf8"));
const AUDIO_BASE = "https://raw.githubusercontent.com/rn0x/Adhkar-json/main";
const adhkar = adhkarRaw.map((cat) => ({
  category: cat.category,
  items: cat.array.map((it) => ({
    text: clean(it.text),
    count: it.count || 1,
    audio: it.audio ? AUDIO_BASE + it.audio : null,
  })),
}));
fs.writeFileSync(path.join(PUB, "adhkar.json"), JSON.stringify(adhkar));
console.log("adhkar.json:", adhkar.length, "categories,", adhkar.reduce((a, c) => a + c.items.length, 0), "items");

console.log("DONE");
