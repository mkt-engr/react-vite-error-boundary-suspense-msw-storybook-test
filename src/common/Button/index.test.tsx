import { customRender } from "@test/customRender";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { delay, http, HttpResponse } from "msw";
import { Button } from ".";
import { server } from "@mocks/server";

describe("Button", () => {
  it("ボタンのラベルが「こんにちは」であること", () => {
    customRender(<Button label="こんにちは" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("ボタンクリック時にローディング状態になること", async () => {
    server.use(
      http.get("https://httpbin.org/status/200", async () => {
        await delay("infinite");
        return new HttpResponse(null, { status: 200 });
      })
    );

    customRender(<Button label="ローディングテスト" />);

    const button = screen.getByRole("button");

    // ボタンをクリック
    await userEvent.click(button);

    // ローディング状態のラベルになることを確認
    expect(button).toHaveTextContent("Loading...");
    expect(button).toBeDisabled();
  });
});
