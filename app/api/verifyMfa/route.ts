import { validateMfaCode } from "@/libs/mfa";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, code } = await req.json();
  if (!username || !code) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = validateMfaCode(username, code);
  if (!result.success)
    return NextResponse.json({ error: result.error }, { status: 400 });

  return NextResponse.json({ success: true, message: "MFA verified" });
}
