import { afterAll, afterEach, beforeAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { server } from "../mocks/server.ts";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
