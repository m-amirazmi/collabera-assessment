import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "mfa.json");

type MfaType = {
  username: string;
  code: string;
  attempts: number;
  issuedAt: number;
};

type MfaJsonType = Record<string, Omit<MfaType, "username">>;

function loadStore(): MfaJsonType {
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

function saveStore(store: MfaJsonType) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(store, null, 2));
}

export function setMfa({ attempts, code, issuedAt, username }: MfaType) {
  const store = loadStore();
  store[username] = { attempts, code, issuedAt };
  saveStore(store);
}

export function getMfa(username: string) {
  const store = loadStore();
  return store[username];
}

export function deleteMfa(username: string) {
  const store = loadStore();
  const { [username]: _removed, ...rest } = store;
  void _removed;
  saveStore(rest);
}
