import { buildGetCartHandler } from "@mocks/cart/handler";
import { buildGetProductsSearchHandler } from "@mocks/product/handler";
import { buildGetQuoteHandler } from "@mocks/quota/handler";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
        buildGetCartHandler.loading(),
        buildGetProductsSearchHandler.loading(),
        buildGetQuoteHandler.loading(),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetCartHandler.error({ status: 500 }),
        buildGetProductsSearchHandler.error({ status: 500 }),
        buildGetQuoteHandler.error({ status: 500 }),
      ],
    },
  },
};
