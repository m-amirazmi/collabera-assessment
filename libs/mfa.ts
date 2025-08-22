import { deleteMfa, getMfa, setMfa } from "./mfaStore";

export function generateMfaCode(username: string) {
  // 6 digit numbers = 100000
  const code = Math.floor(100000 + Math.random() * 90000).toString();
  setMfa({ username, attempts: 0, issuedAt: Date.now(), code });
  return code;
}

export function validateMfaCode(
  username: string,
  inputCode: string
): {
  success: boolean;
  error?: string;
} {
  const record = getMfa(username);
  if (!record) return { success: false, error: "No MFA code issued" };

  const isExpired = Date.now() - record.issuedAt > 60 * 1000;
  if (isExpired) return { success: false, error: "Code expired" };

  if (record.attempts >= 3)
    return { success: false, error: "Account locked due to too many attempts" };

  if (record.code === inputCode) {
    deleteMfa(username);
    return { success: true };
  } else {
    record.attempts += 1;
    setMfa({ username, ...record });
    return {
      success: false,
      error: `Invalid code. Attempts left: ${3 - record.attempts}`,
    };
  }
}
