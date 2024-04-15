import styles from "./transaction-list.module.scss";
import { DashboardListSkeleton } from "@/features/dashboard/dashboard-list/dashboard-list";
import { TransactionInfo } from "web3";

interface TransactionListProps {
  transactions?: TransactionInfo[];
  loading?: boolean;
}

export function TransactionList({
  loading,
  transactions,
}: TransactionListProps) {
  return (
    <div className={styles["transaction-list"]}>
      {loading &&
        Array(4)
          .fill(4)
          .map((_, index) => <DashboardListSkeleton key={index} />)}
      {!loading &&
        Array.isArray(transactions) &&
        transactions.map(transaction => (
          <Transaction
            key={transaction.hash.toString()}
            transaction={transaction}
          />
        ))}
    </div>
  );
}

interface TransactionProps {
  transaction: TransactionInfo;
}

function Transaction({ transaction }: TransactionProps) {
  return <div className={styles.transaction}></div>;
}
