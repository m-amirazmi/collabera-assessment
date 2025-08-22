export const runtime = "nodejs";

import { canRequestNewSecureWord, generateSecureWord } from "@/libs/secureWord";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  // Rate Limiting Check
  if (!canRequestNewSecureWord(username)) {
    return NextResponse.json(
      { error: "Please wait 10s before requesting again" },
      { status: 429 }
    );
  }

  // Generate Secure Word
  const secureWord = generateSecureWord(username);

  return NextResponse.json({ secureWord, expiresIn: 60 });
}
