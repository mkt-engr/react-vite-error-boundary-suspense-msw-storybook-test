import { generateApiUrl } from "@/test/generateApiUrl";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { delay, http, HttpResponse } from "msw";
import { Shop as component } from ".";

const meta: Meta<typeof component> = {
  component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/carts/1"), async () => {
          await delay("infinite");
        }),
        http.get(generateApiUrl("/products/search"), async () => {
          await delay("infinite");
        }),
        http.get(generateApiUrl("/quotes/random"), async () => {
          await delay("infinite");
        }),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/carts/1"), () => {
          return new HttpResponse(null, { status: 500 });
        }),
        http.get(generateApiUrl("/products/search"), () => {
          return new HttpResponse(null, { status: 500 });
        }),
        http.get(generateApiUrl("/quotes/random"), () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
