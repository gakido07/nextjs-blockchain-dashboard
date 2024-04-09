import { Paper, Skeleton } from "@mantine/core";
import styles from "./dashboard-list.module.scss";
import { ReactNode } from "react";
import Link from "next/link";
import ArrowRight from "@/assets/arrow-sm-right-svgrepo-com.svg";

interface DashboardListProps {
  title: string;
  children?: ReactNode;
  viewAllLink?: string;
}

export function DashboardList({
  title,
  children,
  viewAllLink,
}: DashboardListProps) {
  return (
    <Paper className={styles["dashboard-list"]}>
      <h4>{title}</h4>
      {children}
      <Link href={viewAllLink as string}>
        View All <ArrowRight />
      </Link>
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
