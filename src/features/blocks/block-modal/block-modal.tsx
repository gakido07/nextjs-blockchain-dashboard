import { BlockData } from "@/common/types";
import { Modal } from "@mantine/core";
import styles from "./block-modal.module.scss";
import { ReactNode } from "react";
import { hideWalletAddress } from "@/common/util";
import { DateTime } from "luxon";

interface BlockModalProps {
  blockInFocus?: BlockData;
  onClose?: () => void;
}

export function BlockModal({ blockInFocus, onClose }: BlockModalProps) {
  return (
    <Modal
      title={`Block ${blockInFocus?.number?.toString()}`}
      onClose={onClose}
      opened={!!blockInFocus}
    >
      <div className={styles["block-modal"]}>
        <BlockDetail title="Hash">{blockInFocus?.hash}</BlockDetail>
        <BlockDetail title="Parent Hash">
          {blockInFocus?.parentHash}
        </BlockDetail>
        <BlockDetail title="Miner">
          {hideWalletAddress(blockInFocus?.miner)}
        </BlockDetail>
        <BlockDetail title="Timestamp">
          {DateTime.fromSeconds(Number(blockInFocus?.timestamp)).toLocaleString(
            DateTime.DATETIME_MED_WITH_SECONDS
          )}
        </BlockDetail>
        <BlockDetail title="Transactions">
          {blockInFocus?.transactions.length}
        </BlockDetail>
        <BlockDetail title="Gas Used">{blockInFocus?.gasUsed}</BlockDetail>
        <BlockDetail title="Gas Limit">{blockInFocus?.gasLimit}</BlockDetail>
      </div>
    </Modal>
  );
}

interface BlockDetailProps {
  title?: string;
  children?: ReactNode;
}

export function BlockDetail({ title, children }: BlockDetailProps) {
  return (
    <div className={styles["block-detail"]}>
      <span>{title}</span>
      <span>{children}</span>
    </div>
  );
}
