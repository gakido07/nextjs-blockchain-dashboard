import { Paper, Skeleton } from "@mantine/core";
import styles from "./dashboard-list.module.scss";
import { ReactNode } from "react";
import ArrowRight from "@/assets/arrow-sm-right-svgrepo-com.svg";

interface DashboardListProps {
  title: string;
  children?: ReactNode;
  onViewAll?: () => void;
  isViewingAll?: boolean;
}

export function DashboardList({
  title,
  children,
  onViewAll,
  isViewingAll,
}: DashboardListProps) {
  return (
    <Paper className={styles["dashboard-list"]}>
      <h4>{title}</h4>
      {children}
      {!isViewingAll && (
        <button onClick={onViewAll}>
          View All <ArrowRight />
        </button>
      )}
    </Paper>
  );
}

export function DashboardListSkeleton() {
  return (
    <Skeleton
      style={{
        height: "8vh",
        width: "100%",
        marginBottom: "1vh",
      }}
    />
  );
}
