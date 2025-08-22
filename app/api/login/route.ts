export const runtime = "nodejs";

import { validateSecureWord } from "@/libs/secureWord";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { generateMfaCode } from "@/libs/mfa";

const JWT_SECRET = "6vyVMafz3gQ=";

export async function POST(req: Request) {
  const { hashedPassword, secureWord, username } = await req.json();

  if (!hashedPassword || !username || !secureWord) {
    return NextResponse.json(
      { error: "The credentials wrong. Please try again" },
      { status: 429 }
    );
  }

  // Check if secureWord expires
  const isValid = validateSecureWord(username, secureWord);

  if (!isValid) {
    return NextResponse.json(
      { error: "Secure word has expired, please request again." },
      { status: 400 }
    );
  }

  // Can put role as well
  const payload = { username, role: "admin" };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  const mfaCode = generateMfaCode(username);

  return NextResponse.json({ token, mfaRequired: true, mfaCode });
}
