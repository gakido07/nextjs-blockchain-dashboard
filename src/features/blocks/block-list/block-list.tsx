import { Flex, Skeleton } from "@mantine/core";
import styles from "./block-list.module.scss";
import { BlockData } from "@/common/types";
import BlockSvg from "@/assets/block-svgrepo-com.svg";
import { DashboardListSkeleton } from "@/features/dashboard/dashboard-list/dashboard-list";
import { getBlocks, web3 } from "@/lib/web3";
import { ListIconWrapper } from "@/components/list-icon-wrapper/list-icon-wrapper";
import Link from "next/link";
import { hideWalletAddress } from "@/common/util";
import { useState } from "react";
import { BlockModal } from "@/features/blocks/block-modal/block-modal";
import { DateTime } from "luxon";

interface BlockListProps {
  blocks?: BlockData[];
  loading?: boolean;
}

/** Block list component represents the container of a list of blocks. This is intended to easily create skeletons for loading scenarios and switch to actual data on data being available. The list contains a singular modal component allowing users click and focus on one block thereby opening the modal */
export function BlockList({ blocks, loading }: BlockListProps) {
  const [blockInFocus, setBlockInFocus] = useState<BlockData>(null);
  getBlocks({
    page: 1,
    pageSize: 5,
  });
  return (
    <div className={styles["block-list"]}>
      {loading &&
        Array(4)
          .fill(4)
          .map((_, index) => <DashboardListSkeleton key={index} />)}
      {!loading &&
        Array.isArray(blocks) &&
        blocks.map(block => (
          <Block
            setBlockInFocus={setBlockInFocus}
            key={block.hash}
            block={block}
          />
        ))}
      <BlockModal
        blockInFocus={blockInFocus}
        onClose={() => setBlockInFocus(null)}
      />
    </div>
  );
}

interface BlockProps {
  block: BlockData;
  setBlockInFocus?: (block: BlockData) => void;
}

export function Block({ block, setBlockInFocus }: BlockProps) {
  return (
    <Flex onClick={() => setBlockInFocus(block)} className={styles.block}>
      <div className={styles["block-number"]}>
        <ListIconWrapper>
          <BlockSvg />
        </ListIconWrapper>
        <div>
          <h6>{block?.number?.toString()}</h6>
          <p>
            {DateTime.fromSeconds(Number(block?.timestamp))
              .toUTC()
              .toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}
          </p>
        </div>
      </div>
      <div className={styles["block-miner"]}>
        <p>Recipient: {hideWalletAddress(block?.miner)}</p>
        <p>{block?.transactions?.length} txns</p>
      </div>
      <div className={styles["block-amount"]}>
        {web3.utils.fromWei(block?.gasUsed?.toString(), "ether")}
      </div>
    </Flex>
  );
}
