import { useQuery } from "@tanstack/react-query";
import Chart from "react-google-charts";
import { DashboardCard } from "@/features/dashboard/dashboard-card/dashboard-card";
import { getBlocks } from "@/lib/web3";
import { DateTime } from "luxon";

interface TransactionGraphProps {}

export function TransactionGraph({}: TransactionGraphProps) {
  const { data: response, isLoading } = useQuery({
    queryKey: ["transaction-graph"],
    queryFn: () =>
      getBlocks({
        page: 1,
        pageSize: 10,
      }),
  });
  const blocks = response || [];
  const data = [
    ["date", "transactions"],
    ...blocks?.map(block => [
      DateTime.fromSeconds(Number(block.timestamp)).toLocaleString(
        DateTime.DATE_SHORT
      ),
      block.transactions.length,
    ]),
  ];
  return (
    <DashboardCard dataLoading={isLoading} field="Transaction History">
      <Chart chartType="LineChart" width="100%" height="12vh" data={data} />
    </DashboardCard>
  );
}
