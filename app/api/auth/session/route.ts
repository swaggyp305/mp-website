import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const username = cookies().get("guest_username")?.value;
  if (!username) {
    return NextResponse.json({ user: null });
  }

  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      displayName: true,
      avatarUrl: true,
      isGuest: true,
    },
  });

  return NextResponse.json({ user: user ?? null });
}