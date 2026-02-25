import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit") || 10)));
  const offset = Math.max(0, Number(searchParams.get("offset") || 0));
  const sortBy = searchParams.get("sortBy") === "accuracy" ? "accuracy" : "wpm";

  const orderBy =
    sortBy === "accuracy"
      ? [{ accuracy: "desc" as const }, { wpm: "desc" as const }, { createdAt: "asc" as const }]
      : [{ wpm: "desc" as const }, { accuracy: "desc" as const }, { createdAt: "asc" as const }];

  const [entries, total] = await Promise.all([
    prisma.score.findMany({
      orderBy,
      skip: offset,
      take: limit,
      include: { user: true },
    }),
    prisma.score.count(),
  ]);

  return NextResponse.json({
    entries: entries.map((entry, index) => ({
      id: entry.id,
      rank: offset + index + 1,
      username: entry.user.username,
      wpm: Number(entry.wpm),
      accuracy: Number(entry.accuracy),
      createdAt: entry.createdAt,
    })),
    total,
    hasMore: offset + limit < total,
  });
}