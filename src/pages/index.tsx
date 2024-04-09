import Head from "next/head";
import styles from "./index.module.scss";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { Hero } from "@/components/hero/hero";
import { Section } from "@/components/section/section";
import { DashboardCard } from "@/features/dashboard/dashboard-card/dashboard-card";
import { useQuery } from "@tanstack/react-query";
import { getLastNBlocks, web3 } from "@/lib/web3";
import { DashboardList } from "@/features/dashboard/dashboard-list/dashboard-list";
import { BlockList } from "@/features/blocks/block-list/block-list";

export default function Home() {
  const { data: latestBlockData, isLoading: latestBlockDataLoading } = useQuery(
    {
      queryKey: ["latest-block"],
      queryFn: async () => web3.eth.getBlock("latest"),
    }
  );
  const { data: last5BlocksData, isLoading: last5BlocksLoading } = useQuery({
    queryKey: ["last-5-blocks"],
    queryFn: () => getLastNBlocks(5),
  });
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <Hero />
        <Section className={styles["dashboard-row"]}>
          <DashboardCard field="Price" />
          <DashboardCard
            dataLoading={latestBlockDataLoading}
            field="Latest Block"
          >
            <p>{Number(latestBlockData?.number)}</p>
          </DashboardCard>
          <DashboardCard field="Transaction History" />
        </Section>
        <Section className={styles["list-row"]}>
          <DashboardList title="Latest Blocks" viewAllLink="/blocks">
            <BlockList
              loading={last5BlocksLoading}
              blocks={last5BlocksData as any[]}
            />
          </DashboardList>
          <DashboardList
            title="Latest Blocks"
            viewAllLink="/blocks"
          ></DashboardList>
        </Section>
      </PageLayout>
    </>
  );
}