import { test, expect } from "vitest";
import { generateBinaryString } from "../src/utils";

test("generateBinaryString", () => {
  const numbers = [1, 2, 3, 4];

  expect(generateBinaryString(numbers)).toBe("00000000000000000000000000001111");
});
