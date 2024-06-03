import {  generateStopCommand  } from "../src/main";

test("generateStopCommand", () => {
  expect(generateStopCommand()).toBe(Buffer.from("5A000102FF0000885A", "hex"));
});
