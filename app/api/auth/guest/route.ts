import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { guestAuthSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = guestAuthSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const username = parsed.data.username.toLowerCase();
  let user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        username,
        email: parsed.data.email,
        displayName: parsed.data.username,
        isGuest: true,
      },
    });
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: {
        lastLogin: new Date(),
      },
    });
  }

  const response = NextResponse.json({ user });
  response.cookies.set("guest_username", username, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}