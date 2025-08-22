"use client";

import TransactionTable from "@/components/dashboard/transactionTable";
import { TransactionHistoryType } from "@/libs/transactionStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchTransaction() {
  const res = await fetch("/api/transactionHistory");

  return res.json();
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<TransactionHistoryType[]>(
    []
  );

  const router = useRouter();

  useEffect(() => {
    const getTransaction = async () => {
      const { data } = await fetchTransaction();
      setTransactions(data);
    };
    getTransaction();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (transactions.length === 0) return null;

  return (
    <>
      <button
        className="btn btn-neutral btn-wide rounded-sm"
        onClick={handleLogout}
      >
        Logout
      </button>
      <TransactionTable transactions={transactions} />
    </>
  );
}
