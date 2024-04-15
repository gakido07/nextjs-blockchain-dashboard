export function hideWalletAddress(address: string): string {
  // Check if the address is valid
  if (typeof address !== "string" || address.length < 10) {
    return "Invalid address";
  }
  // Define the number of characters to keep visible at the beginning and end
  const visibleChars = 6;
  const prefix = address.substring(0, visibleChars);
  const suffix = address.substring(address.length - visibleChars);
  return prefix + "***" + suffix;
}
