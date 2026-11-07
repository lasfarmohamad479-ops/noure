import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { bookmarks } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";

function visitor(req: NextRequest): string | null {
  const vid = req.headers.get("x-visitor-id") || req.nextUrl.searchParams.get("visitorId");
  if (!vid || vid.length < 6 || vid.length > 64) return null;
  return vid;
}

export async function GET(req: NextRequest) {
  const vid = visitor(req);
  if (!vid) return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  const rows = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.visitorId, vid))
    .orderBy(desc(bookmarks.createdAt))
    .limit(200);
  return NextResponse.json({ bookmarks: rows });
}

export async function POST(req: NextRequest) {
  const vid = visitor(req);
  if (!vid) return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  const body = (await req.json().catch(() => null)) as {
    kind?: string;
    ref?: string;
    label?: string;
    body?: string;
  } | null;
  if (!body?.kind || !body?.ref) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 });
  }
  const kind = body.kind.slice(0, 20);
  const ref = body.ref.slice(0, 120);

  const existing = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.visitorId, vid),
        eq(bookmarks.kind, kind),
        eq(bookmarks.ref, ref)
      )
    )
    .limit(1);

  if (existing.length) {
    await db.delete(bookmarks).where(eq(bookmarks.id, existing[0].id));
    return NextResponse.json({ saved: false });
  }

  await db.insert(bookmarks).values({
    visitorId: vid,
    kind,
    ref,
    label: (body.label || "").slice(0, 300),
    body: (body.body || "").slice(0, 4000),
  });
  return NextResponse.json({ saved: true });
}

export async function DELETE(req: NextRequest) {
  const vid = visitor(req);
  if (!vid) return NextResponse.json({ error: "معرّف غير صالح" }, { status: 400 });
  const id = parseInt(req.nextUrl.searchParams.get("id") || "", 10);
  if (!id) return NextResponse.json({ error: "معرّف ناقص" }, { status: 400 });
  await db
    .delete(bookmarks)
    .where(and(eq(bookmarks.visitorId, vid), eq(bookmarks.id, id)));
  return NextResponse.json({ ok: true });
}
