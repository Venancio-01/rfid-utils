import { test, expect } from "vitest";
import { generateStopCommand } from "../src/main";

test("generateStopCommand", () => {
  expect(generateStopCommand()).toEqual(Buffer.from("5A000102FF0000885A", "hex"));
});
