import styles from "./header.module.scss";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header className={styles.header}>
      <h3>EtherScan</h3>
    </header>
  );
}
