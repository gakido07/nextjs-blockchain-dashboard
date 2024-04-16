import { TextInput } from "@mantine/core";
import styles from "./hero.module.scss";
import EthSvg from "@/assets/eth-alt-svgrepo-com.svg";
import { BlockSearch } from "@/features/blocks/block-search/block-search";

interface HeroProps {}

export function Hero({}: HeroProps) {
  return (
    <div className={styles.hero}>
      <h1>Explorer</h1>
      <p>An Alternate blockchain explorer for the ethereum Mainnet</p>
      <BlockSearch />
    </div>
  );
}
