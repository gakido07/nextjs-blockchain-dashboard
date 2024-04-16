import { render, fireEvent } from "@testing-library/react";
import { BlockList, Block } from "./block-list";
import { BlockData } from "@/common/types";
import { MantineProvider } from "@mantine/core";
import "@testing-library/jest-dom";

describe("BlockList", () => {
  beforeAll(() => {
    // Important to be initialized or else tests will fail on matchMedia function.
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  const mockBlocks: BlockData[] = [
    {
      number: 1912374,
      hash: "0x123",
      parentHash: "0xabc",
      nonce: 1234648594,
      sha3Uncles: "0xdef",
      logsBloom: "0x789",
      transactionsRoot: "0xghi",
      stateRoot: "0xjkl",
      receiptsRoot: "0xmno",
      miner: "0xpqr",
      difficulty: 20000,
      totalDifficulty: 1000,
      extraData: "0xzyz",
      size: 1000,
      gasLimit: 5000,
      gasUsed: 3000,
      timestamp: 1633640400,
      transactions: [],
      uncles: [],
      mixHash: "0x456",
      baseFeePerGas: 20347,
    },
    // Add more blocks as needed
  ];

  it("renders without crashing", () => {
    render(
      <MantineProvider>
        <BlockList blocks={mockBlocks} loading={false} />
      </MantineProvider>
    );
  });

  it("displays blocks", () => {
    const { getByText } = render(
      <MantineProvider>
        <BlockList blocks={mockBlocks} loading={false} />
      </MantineProvider>
    );
    // Expect to see the block number
    expect(getByText("1912374")).toBeInTheDocument();
  });

  it("handles block click", () => {
    const mockSetBlockInFocus = jest.fn();
    const { getByText } = render(
      <MantineProvider>
        <Block block={mockBlocks[0]} setBlockInFocus={mockSetBlockInFocus} />
      </MantineProvider>
    );
    // Ensure the click fires
    fireEvent.click(getByText("1912374"));
    expect(mockSetBlockInFocus).toHaveBeenCalledWith(mockBlocks[0]);
  });
});
