import { getAllTransactionHistory } from "@/libs/transactionStore";
import { NextResponse } from "next/server";

export async function GET() {
  const transactions = await getAllTransactionHistory();

  const data = Object.keys(transactions).map((key) => {
    return { ...transactions[key], referenceId: key };
  });

  return NextResponse.json({ data });
}
