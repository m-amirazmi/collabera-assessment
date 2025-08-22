/**
 * username:{
 *    secureWord:"",
 *    issuedAt: 0
 * }
 */

// MAP doesnt work as NextJS cannot persist anything

// const store = new Map<string, { secureWord: string; issuedAt: number }>();

import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "secureWords.json");

type SecureWordType = {
  username: string;
  secureWord: string;
  issuedAt: number;
};

type SecureWordJsonType = Record<string, Omit<SecureWordType, "username">>;

function loadStore(): SecureWordJsonType {
  if (fs.existsSync(FILE_PATH)) {
    const raw = fs.readFileSync(FILE_PATH, "utf-8");
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }
  return {};
}

function saveStore(store: SecureWordJsonType) {
  console.log("SW", store);

  fs.writeFileSync(FILE_PATH, JSON.stringify(store, null, 2));
}

export function setSecureWord({ username, ...item }: SecureWordType) {
  const store = loadStore();
  store[username] = item;
  saveStore(store);
}

export function getSecureWord(username: string) {
  const store = loadStore();
  return store[username];
}

export function deleteSecureWord(username: string) {
  const store = loadStore();
  delete store[username];
  saveStore(store);
}
