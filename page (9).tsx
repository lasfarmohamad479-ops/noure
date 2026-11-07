import { NextResponse } from "next/server";
import { db } from "@/db";
import { hadiths } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.execute<{ chapter: string; c: number }>(
      sql`SELECT chapter, COUNT(*)::int as c FROM hadiths GROUP BY chapter ORDER BY MIN(id)`
    );
    return NextResponse.json({ chapters: result.rows || [] });
  } catch {
    return NextResponse.json({ chapters: [] });
  }
}
