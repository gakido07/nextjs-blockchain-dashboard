import { render, waitFor } from "@testing-library/react";
import { TransactionGraph } from "./transaction-graph";
import { getBlocks } from "@/lib/web3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe } from "node:test";
import "@testing-library/jest-dom";
import { MantineProvider } from "@mantine/core";

jest.mock("../../../lib/web3");

const mockGetBlocks = getBlocks as jest.MockedFunction<typeof getBlocks>;

describe("TransactionGraph", () => {
  const queryClient = new QueryClient();

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

  beforeEach(() => {
    mockGetBlocks.mockResolvedValue([
      {
        timestamp: BigInt(1633640400),
        transactions: ["0x123", "0x456", "0x789"],
      },
      {
        timestamp: BigInt(1633641300),
        transactions: ["0xabc", "0xdef"],
      } as any,
    ]);
  });

  it("renders without crashing", () => {
    render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <TransactionGraph />
        </QueryClientProvider>
      </MantineProvider>
    );
  });

  it("displays transaction history", async () => {
    const { getByText } = render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <TransactionGraph />
        </QueryClientProvider>
      </MantineProvider>
    );

    await waitFor(() => {
      expect(getByText("Transaction History")).toBeInTheDocument();
    });
  });
});
