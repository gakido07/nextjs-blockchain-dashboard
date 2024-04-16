import Head from "next/head";
import styles from "./index.module.scss";
import { PageLayout } from "@/components/layouts/page-layout/page-layout";
import { Hero } from "@/components/hero/hero";
import { Section } from "@/components/section/section";
import { DashboardCard } from "@/features/dashboard/dashboard-card/dashboard-card";
import { useQuery } from "@tanstack/react-query";
import { getBlocks, web3 } from "@/lib/web3";
import { DashboardList } from "@/features/dashboard/dashboard-list/dashboard-list";
import { BlockList } from "@/features/blocks/block-list/block-list";
import dynamic from "next/dynamic";
import { useState } from "react";
import { PaginationControls } from "@/components/pagination-controls/pagination-controls";
import { TransactionGraph } from "@/features/transactions/transaction-graph/transaction-graph";

function Home() {
  /** This state indicates when the default number (5) blocks is shown and when all blocks are shown */
  const [viewingAll, setViewingAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: latestBlockData, isLoading: latestBlockDataLoading } = useQuery(
    {
      queryKey: ["latest-block"],
      queryFn: async () => web3.eth.getBlock("latest"),
    }
  );

  const { data: last5BlocksData, isLoading: last5BlocksLoading } = useQuery({
    queryKey: ["last-5-blocks", currentPage],
    queryFn: () =>
      getBlocks({
        page: currentPage,
        pageSize: 5,
      }),
  });
  const onViewAll = () => setViewingAll(true);
  return (
    <>
      <Head>
        <title>Blockchain Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageLayout>
        <Hero />
        <Section className={styles["dashboard-row"]}>
          <DashboardCard
            dataLoading={latestBlockDataLoading}
            field="Latest Block"
          >
            <p>{Number(latestBlockData?.number)}</p>
          </DashboardCard>
          <TransactionGraph />
        </Section>
        <Section className={styles["list-row"]}>
          <DashboardList
            isViewingAll={viewingAll}
            title="Latest Blocks"
            onViewAll={onViewAll}
          >
            <BlockList
              loading={last5BlocksLoading}
              blocks={last5BlocksData as any[]}
            />
          </DashboardList>
          {viewingAll && (
            <PaginationControls
              currentPage={currentPage}
              onNext={() => {
                setCurrentPage(state => state + 1);
              }}
              onPrevious={() => {
                if (currentPage > 1) {
                  setCurrentPage(state => state - 1);
                }
              }}
            />
          )}
        </Section>
      </PageLayout>
    </>
  );
}

export default dynamic(() => Promise.resolve(Home), {
  ssr: false,
});
