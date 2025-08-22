export const runtime = "nodejs";

import { signToken } from "@/libs/jwt";
import { generateMfaCode } from "@/libs/mfa";
import { validateSecureWord } from "@/libs/secureWord";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { hashedPassword, secureWord, username } = await req.json();

  if (!hashedPassword || !username || !secureWord) {
    return NextResponse.json(
      { error: "The credentials wrong. Please try again" },
      { status: 429 }
    );
  }

  const isValid = validateSecureWord(username, secureWord);
  if (!isValid) {
    return NextResponse.json(
      { error: "Secure word has expired, please request again." },
      { status: 400 }
    );
  }

  // Can put role as well
  const payload = { username, role: "admin" };
  const token = signToken(payload);

  const mfaCode = generateMfaCode(username);
  return NextResponse.json({ token, mfaRequired: true, mfaCode });
}
