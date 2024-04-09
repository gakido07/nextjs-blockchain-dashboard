import { Paper } from "@mantine/core";
import styles from "./latest-blocks-modal.module.scss";

interface LatestBlocksModalProps {}

export function LatestBlocksModal({}: LatestBlocksModalProps) {
  return <Paper className={styles["latest-blocks-modal"]}></Paper>;
}
