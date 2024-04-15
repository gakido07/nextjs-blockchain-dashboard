import { Flex } from "@mantine/core";
import styles from "./pagination-controls.module.scss";
import ArrowSvg from "@/assets/arrow-sm-right-svgrepo-com.svg";

interface PaginationControlsProps {
  currentPage?: number;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function PaginationControls({
  currentPage,
  onNext,
  onPrevious,
}: PaginationControlsProps) {
  return (
    <Flex className={styles["pagination-controls"]}>
      <button disabled={currentPage === 1} onClick={onPrevious}>
        <ArrowSvg />
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={onNext}>
        Next
        <ArrowSvg />
      </button>
    </Flex>
  );
}
