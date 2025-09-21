import { describe } from "vitest";
import { Button } from ".";
import { customRender } from "../../test/customRender";

describe("Button", () => {
  it("とボタンのラベルが「こんにちは」であること", () => {
    customRender(<Button label="こんにちは" />);
  });
});
