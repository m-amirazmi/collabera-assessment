import { formatWithCommas } from "@/libs/numberFormat";
import { TransactionHistoryType } from "@/libs/transactionStore";

export default function TransactionTable({
  transactions,
}: {
  transactions: TransactionHistoryType[];
}) {
  return (
    <table className="table bg-base-100">
      <thead className="bg-base-200">
        <tr>
          <th>Date</th>
          <th>Reference ID</th>
          <th>To</th>
          <th>Transaction Type</th>
          <th className="text-right">Amount</th>
        </tr>
      </thead>
      <tbody className="text-base">
        {transactions?.map((transaction) => (
          <tr key={transaction.referenceId}>
            <td>
              {new Date(transaction.date).toLocaleDateString("en-MY", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </td>
            <td className="font-semibold">#{transaction.referenceId}</td>
            <td>
              <span className="font-semibold">
                {transaction.recipient.name}
              </span>
              <br />
              <span className="text-secondary">
                {transaction.recipient.references}
              </span>
            </td>
            <td>{transaction.transaction.type} payment</td>
            <td className="text-right flex items-center gap-1">
              <span>{transaction.transaction.currency}</span>
              <span>
                {formatWithCommas(transaction.transaction.amount.toFixed(2))}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
