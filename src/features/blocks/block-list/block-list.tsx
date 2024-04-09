import { Flex, Skeleton } from "@mantine/core";
import styles from "./block-list.module.scss";
import { BlockData } from "@/common/types";
import BlockSvg from "@/assets/block-svgrepo-com.svg";
import { DashboardListSkeleton } from "@/features/dashboard/dashboard-list/dashboard-list";
import { getLastNBlocks } from "@/lib/web3";
import { ListIconWrapper } from "@/components/list-icon-wrapper/list-icon-wrapper";

interface BlockListProps {
  blocks?: BlockData[];
  loading?: boolean;
}

export function BlockList({ blocks, loading = true }: BlockListProps) {
  getLastNBlocks(10);
  return (
    <div className={styles["block-list"]}>
      {loading &&
        Array(4)
          .fill(4)
          .map((_, index) => <DashboardListSkeleton key={index} />)}
      {!loading &&
        Array.isArray(blocks) &&
        blocks.map(block => <Block key={block.hash} block={block} />)}
    </div>
  );
}

interface BlockProps {
  block: BlockData;
}

function Block({}: BlockProps) {
  return (
    <Flex className={styles.block}>
      <ListIconWrapper></ListIconWrapper>
    </Flex>
  );
}
