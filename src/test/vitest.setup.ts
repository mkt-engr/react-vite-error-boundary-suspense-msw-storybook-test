import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../mocks/browsers.ts";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
