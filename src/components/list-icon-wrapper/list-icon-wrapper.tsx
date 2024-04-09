import { ReactNode } from "react";
import styles from "./list-icon-wrapper.module.scss";

interface ListIconWrapperProps {
  children?: ReactNode;
}

export function ListIconWrapper({ children }: ListIconWrapperProps) {
  return <div className={styles["list-icon-wrapper"]}>{children}</div>;
}
