import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { scoreSubmissionSchema } from "@/lib/validation";

const inMemoryRateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string, max: number, windowMs: number) {
  const now = Date.now();
  const current = inMemoryRateLimit.get(key);
  if (!current || current.resetAt <= now) {
    inMemoryRateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= max) {
    return false;
  }
  current.count += 1;
  return true;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = scoreSubmissionSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const usernameCookie = cookies().get("guest_username")?.value;
  if (!usernameCookie) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  if (!checkRateLimit(`score:${usernameCookie}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const user = await prisma.user.findUnique({ where: { username: usernameCookie } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const score = await prisma.score.create({
    data: {
      userId: user.id,
      wpm: parsed.data.wpm,
      accuracy: parsed.data.accuracy,
      rawWpm: parsed.data.wpm,
      timeSeconds: parsed.data.timeSeconds,
      totalCharacters: parsed.data.totalCharacters,
      correctCharacters: parsed.data.correctCharacters,
      incorrectCharacters: parsed.data.incorrectCharacters,
      userAgent: request.headers.get("user-agent") || undefined,
    },
  });

  const rank =
    (await prisma.score.count({
      where: {
        OR: [
          { wpm: { gt: score.wpm } },
          { wpm: score.wpm, accuracy: { gt: score.accuracy } },
        ],
      },
    })) + 1;

  return NextResponse.json({ score, rank });
}