import { Paper, Skeleton } from "@mantine/core";
import styles from "./dashboard.module.scss";
import { ReactNode } from "react";

interface DashboardCardProps {
  field?: string;
  dataLoading?: boolean;
  children?: ReactNode;
}

export function DashboardCard({
  field,
  dataLoading,
  children,
}: DashboardCardProps) {
  return (
    <Paper className={styles["dashboard-card"]}>
      <h4>{field}</h4>
      {dataLoading && (
        <Skeleton
          style={{
            height: "5vh",
            width: "100%",
          }}
        />
      )}
      {!dataLoading && children}
    </Paper>
  );
}
