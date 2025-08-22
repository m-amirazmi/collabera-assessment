import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: Record<string, string>) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

// Will be needed if want to verify on server side
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
