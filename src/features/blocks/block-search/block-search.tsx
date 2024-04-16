import { TextInput } from "@mantine/core";
import styles from "./block-search.module.scss";
import EthSvg from "@/assets/eth-alt-svgrepo-com.svg";
import { useMutation } from "@tanstack/react-query";
import { web3 } from "@/lib/web3";
import { BlockModal } from "@/features/blocks/block-modal/block-modal";

interface BlockSearchProps {}

export function BlockSearch({}: BlockSearchProps) {
  const { mutate, data, reset } = useMutation({
    mutationKey: ["block-search"],
    mutationFn: (blockNumber: string) => web3.eth.getBlock(blockNumber),
  });
  return (
    <div className={styles["block-search"]}>
      <TextInput
        styles={{
          input: {
            borderRadius: "20px",
          },
        }}
        onKeyDown={event => {
          if (event.key === "Enter" && event.currentTarget.value.length > 0) {
            mutate(event.currentTarget.value);
          }
        }}
        placeholder="Type a block number and click enter"
        rightSection={<EthSvg />}
      />
      <BlockModal blockInFocus={data as any} onClose={reset} />
    </div>
  );
}
