import crypto from "crypto";
import { getSecureWord, setSecureWord } from "./secureStore";

// openssl rand -base64 8
const SECRET = "v3Gsuga1T5A=";

export function generateSecureWord(username: string) {
  const issuedAt = Date.now();
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(username + issuedAt);
  const secureWord = hmac.digest("hex").slice(0, 8);

  setSecureWord({ issuedAt, secureWord, username });
  return secureWord;
}

// Validate the secure to make sure not expired yet
export function validateSecureWord(username: string, word: string) {
  const record = getSecureWord(username);
  if (!record) return false;

  const isExpired = Date.now() - record.issuedAt > 60 * 1000; // 60s
  if (isExpired) return false;

  return record.secureWord === word;
}

// Rate limiting 10s
export function canRequestNewSecureWord(username: string) {
  const record = getSecureWord(username);
  if (!record) return true;

  return Date.now() - record.issuedAt > 10 * 1000; //10s
}
