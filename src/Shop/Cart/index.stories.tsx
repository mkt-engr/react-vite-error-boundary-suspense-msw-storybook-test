import { generateCartMock } from "@mocks/cart";
import { buildGetCartHandler } from "@mocks/cart/handler";
import { generateProductMock } from "@mocks/product";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Cart as component } from ".";

const meta: Meta<typeof component> = {
  tags: ["autodocs"],
  component,
  parameters: {
    docs: {
      story: {
        //inline:falseにより、各Storyを個別のiframeで実行するように設定した。DocsページでもStoryが独立したiframeで動作し、TanStack Queryのキャッシュ競合を回避できる。
        inline: false,
        iframeHeight: 200,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetCartHandler.success({
          response: generateCartMock({
            products: [1, 2, 3].map((num) =>
              generateProductMock({ title: `商品${num}` })
            ),
          })
        }),
      ],
    },
  },
};

export const NoProductInCart: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetCartHandler.success({
          response: generateCartMock({
            products: [],
            total: 0,
            discountedTotal: 0,
            totalProducts: 0,
            totalQuantity: 0,
          })
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetCartHandler.loading(),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetCartHandler.error({ status: 500 }),
      ],
    },
  },
};
