import { ReactNode } from "react";
import styles from "./page-layout.module.scss";
import { Header } from "@/components/header/header";

interface PageLayoutProps {
  children?: ReactNode;
  className?: string;
}

/** This provides a reuseable component that depicts a full page that fills a user's screen, It's particularly useful for building for larger screens to provide a maximum view width that content must not exceed preventing "stretching" of content */
export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <div className={`${styles["page-layout"]} ${className}`}>
      <div className={styles["page-content"]}>
        <Header />
        {children}
      </div>
    </div>
  );
}
