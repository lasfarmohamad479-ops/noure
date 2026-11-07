import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { hadiths } from "@/db/schema";
import { sql, asc, ilike, or, count, and } from "drizzle-orm";
import bukhariData from "@/data/bukhari.json";

type BukhariEntry = {
  id: number;
  number: number;
  chapter: string;
  text: string;
};

let seedPromise: Promise<void> | null = null;

export function normalizeArabic(s: string): string {
  return s
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640\u08F0-\u08F3]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/\s+/g, " ")
    .trim();
}

async function ensureSeeded() {
  const [row] = await db.select({ c: count() }).from(hadiths);
  if (Number(row.c) >= bukhariData.length) return;
  // clear then insert in chunks
  await db.execute(sql`TRUNCATE TABLE hadiths RESTART IDENTITY`);
  const chunkSize = 200;
  for (let i = 0; i < bukhariData.length; i += chunkSize) {
    const chunk = (bukhariData as BukhariEntry[]).slice(i, i + chunkSize);
    await db.insert(hadiths).values(
      chunk.map((h) => ({
        bukhariId: h.id,
        number: h.number,
        chapter: h.chapter || "كتاب متنوع",
        text: h.text,
        textNorm: normalizeArabic(h.text),
        chapterNorm: normalizeArabic(h.chapter || ""),
      }))
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const page = Math.max(1, parseInt(sp.get("page") || "1", 10) || 1);
    const perPage = Math.min(
      60,
      Math.max(6, parseInt(sp.get("perPage") || "20", 10) || 20)
    );
    const q = (sp.get("q") || "").trim();
    const chapter = (sp.get("chapter") || "").trim();
    const random = sp.get("random") === "1";

    if (!seedPromise) seedPromise = ensureSeeded();
    await seedPromise;

    if (random) {
      const rows = await db.execute<{
        id: number;
        number: number;
        chapter: string;
        text: string;
      }>(sql`SELECT id, number, chapter, text FROM hadiths ORDER BY random() LIMIT 1`);
      const r = (rows.rows && rows.rows[0]) || null;
      return NextResponse.json({ hadith: r });
    }

    const conditions = [];
    if (q) {
      const nq = normalizeArabic(q);
      conditions.push(
        or(ilike(hadiths.textNorm, `%${nq}%`), ilike(hadiths.chapterNorm, `%${nq}%`))
      );
    }
    if (chapter) {
      conditions.push(ilike(hadiths.chapterNorm, `%${normalizeArabic(chapter)}%`));
    }
    const where = conditions.length ? and(...conditions) : undefined;

    const [{ c: total }] = await db
      .select({ c: count() })
      .from(hadiths)
      .where(where);

    const rows = await db
      .select()
      .from(hadiths)
      .where(where)
      .orderBy(asc(hadiths.id))
      .limit(perPage)
      .offset((page - 1) * perPage);

    return NextResponse.json({
      hadiths: rows,
      total: Number(total),
      page,
      perPage,
    });
  } catch (e) {
    console.error("hadiths API error:", e);
    return NextResponse.json(
      { error: "تعذر جلب الأحاديث", hadiths: [], total: 0 },
      { status: 500 }
    );
  }
}
