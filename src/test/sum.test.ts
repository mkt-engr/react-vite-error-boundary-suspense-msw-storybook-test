import { expect, it } from "vitest";
import { sum } from "./sum.ts";

it("1 + 2 が 3 になることを確認", () => {
  expect(sum(1, 2)).toBe(3);
});
