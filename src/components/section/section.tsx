import { ReactNode } from "react";
import styles from "./section.module.scss";

interface SectionProps {
  children?: ReactNode;
  className?: string;
  withoutPadding?: boolean;
}

/** A reusable Section component with a default padding that can be toggled */
export function Section({ children, className, withoutPadding }: SectionProps) {
  return (
    <section
      className={`${withoutPadding ? styles["section-without-padding"] : styles.section} ${className}`}
    >
      {children}
    </section>
  );
}
