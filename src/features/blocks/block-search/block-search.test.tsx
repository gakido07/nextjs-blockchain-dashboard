import { render, fireEvent } from "@testing-library/react";
import { BlockSearch } from "./block-search";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

/** Mock only useMutation as required and leave the rest of the module */
jest.mock("@tanstack/react-query", () => ({
  ...jest.requireActual("@tanstack/react-query"),
  useMutation: jest.fn(() => ({ mutate: jest.fn() })),
}));

describe("BlockSearch", () => {
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

  it("renders without crashing", () => {
    render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BlockSearch />
        </QueryClientProvider>
      </MantineProvider>
    );
  });

  it("calls mutate on Enter key press", () => {
    const mockMutate = jest.fn();
    (useMutation as jest.Mock).mockReturnValue({ mutate: mockMutate });

    const { getByPlaceholderText } = render(
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <BlockSearch />
        </QueryClientProvider>
      </MantineProvider>
    );

    const input = getByPlaceholderText("Type a block number and click enter");
    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockMutate).toHaveBeenCalledWith("123");
  });
});
