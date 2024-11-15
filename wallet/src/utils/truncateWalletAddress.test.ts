import { truncatewalletAddress } from "./truncatewalletAddress";

const address = "0x1234567890abcdef1234567890abcdef";
describe("truncatewalletAddress", () => {
  it("should correctly truncate a typical address", () => {
    expect(truncatewalletAddress(address)).toBe("0x123...bcdef");
  });

  it("should correctly truncate with custom end and offset", () => {
    expect(truncatewalletAddress(address, 7, 7)).toBe("0x12345...0abcdef");
  });

  it("should return an empty string if the input is empty", () => {
    expect(truncatewalletAddress("")).toBe("");
  });

  it("should handle addresses shorter than the sum of end and offset", () => {
    const address = "0x12345";

    expect(truncatewalletAddress(address, 2, 2)).toBe("0x...45");
  });

  it("should handle zero end or offset values", () => {
    expect(truncatewalletAddress(address, 0, 0)).toBe(
      "...0x1234567890abcdef1234567890abcdef"
    );
    expect(truncatewalletAddress(address, 8, 0)).toBe(
      "0x123456...0x1234567890abcdef1234567890abcdef"
    );
    expect(truncatewalletAddress(address, 0, 8)).toBe("...90abcdef");
  });

  it("should handle large end and offset values that exceed the address length", () => {
    const address = "0x1234567890abcdef";

    expect(truncatewalletAddress(address, 100, 3)).toBe("0x1234567890abcdef");
    expect(truncatewalletAddress(address, 3, 100)).toBe("0x1234567890abcdef");
  });
});
