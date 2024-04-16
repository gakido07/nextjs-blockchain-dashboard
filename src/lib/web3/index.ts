import Web3 from "web3";
import _ from "lodash";
import { BlockData } from "@/common/types";

export const web3 = new Web3("https://eth.merkle.io");

export interface GetBlocksParams {
  page: number;
  pageSize: number;
}

export async function getBlocks({ page, pageSize }: GetBlocksParams) {
  const latest: number = Number(await web3.eth.getBlockNumber());
  const start = latest - page * pageSize;
  const end = start + pageSize;
  const blockNumbers = _.range(start, end, 1);
  const blockPromises = blockNumbers.map(blockNumber =>
    web3.eth.getBlock(blockNumber)
  );
  return await Promise.all(blockPromises);
}
