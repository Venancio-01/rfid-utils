import { assert } from "chai";
import { generateBinaryString } from "../src/utils";

describe("generateBinaryString", () => {
  it("should return correct binary string for multiple numbers", () => {
    const numbers = [1, 2, 3];

    assert.equal(generateBinaryString(numbers), "1000001101");
  });
});
