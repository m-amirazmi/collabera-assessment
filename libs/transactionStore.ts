import fs from "fs";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data", "transactionHistories.json");

type RecipientType = {
  name: string;
  references: string;
};

type TransactionType = {
  type: string;
  amount: number;
  currency: string;
};

export type TransactionHistoryType = {
  date: string;
  referenceId: string;
  recipient: RecipientType;
  transaction: TransactionType;
};

type TransactionHistoryJsonType = Record<
  string,
  Omit<TransactionHistoryType, "referenceId">
>;

function loadStore(): TransactionHistoryJsonType {
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

function saveStore(store: TransactionHistoryJsonType) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(store, null, 2));
}

export function setTransactionHistory({
  date,
  recipient,
  referenceId,
  transaction,
}: TransactionHistoryType) {
  const store = loadStore();
  store[referenceId] = { date, recipient, transaction };
  saveStore(store);
}

export function getTransactionHistory(referenceId: string) {
  const store = loadStore();
  return store[referenceId];
}

export function getAllTransactionHistory() {
  return loadStore();
}

export function deleteTransactionHistory(referenceId: string) {
  const store = loadStore();
  const { [referenceId]: _removed, ...rest } = store;
  void _removed;
  saveStore(rest);
}
