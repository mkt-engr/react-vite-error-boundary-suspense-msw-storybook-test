import { customRender } from "@test/customRender";
import "@testing-library/jest-dom/vitest";
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from ".";

describe("Button", () => {
  it("とボタンのラベルが「こんにちは」であること", () => {
    customRender(<Button label="こんにちは" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
