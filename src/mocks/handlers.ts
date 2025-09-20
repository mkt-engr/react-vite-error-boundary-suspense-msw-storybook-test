import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://api.example.com/user", () => {
    console.log("MSWでモックしてるよ：200");
    return HttpResponse.json({
      id: "abc-123",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
  http.get("https://httpbin.org/status/200", async () => {
    console.log("MSWでモックしてるよ：200");
    return new HttpResponse(null, { status: 200 });
  }),
];
