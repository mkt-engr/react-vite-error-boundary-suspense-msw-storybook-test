import { buildGetCartMswHandler } from "@/mocks/cart/handler";
import { buildGetProductsSearchMswHandler } from "@/mocks/product/handler";
import { buildGetQuoteMswHandler } from "@/mocks/quota/handler";
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
        buildGetCartMswHandler.loading(),
        buildGetProductsSearchMswHandler.loading(),
        buildGetQuoteMswHandler.loading(),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetCartMswHandler.error({ status: 500 }),
        buildGetProductsSearchMswHandler.error({ status: 500 }),
        buildGetQuoteMswHandler.error({ status: 500 }),
      ],
    },
  },
};
