import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { TestProvider } from "./testProvider";

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: TestProvider, ...options });
