import Web3 from "web3";
import _ from "lodash";
import { BlockData } from "@/common/types";

export const web3 = new Web3("https://eth.merkle.io");

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
    name: "getRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "version",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
];

const addr = "0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43";
const priceFeed = new new Web3("https://rpc.ankr.com/eth_sepolia").eth.Contract(
  aggregatorV3InterfaceABI,
  addr
);
priceFeed.methods
  .latestRoundData()
  .call()
  .then(roundData => {
    // Do something with roundData
    // console.log("Latest Round Data", roundData);
  });

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
