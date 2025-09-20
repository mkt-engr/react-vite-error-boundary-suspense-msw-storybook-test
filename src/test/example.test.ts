import { expect, it } from "vitest";

it("ユーザー情報を正常に取得できることを確認", async () => {
  const response = await fetch("https://api.example.com/user");

  await expect(response.json()).resolves.toEqual({
    id: "abc-123",
    firstName: "John",
    lastName: "Maverick",
  });
});
