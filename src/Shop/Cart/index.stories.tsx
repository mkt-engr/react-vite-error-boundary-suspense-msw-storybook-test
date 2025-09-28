import { generateCartMock } from "@/mocks/cart.mock";
import { generateProductMock } from "@/mocks/product.mock";
import { generateApiUrl } from "@/test/generateApiUrl";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { delay, http, HttpResponse } from "msw";
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
        http.get(generateApiUrl("/carts/1"), () => {
          return HttpResponse.json(
            generateCartMock({
              products: [1, 2, 3].map((num) =>
                generateProductMock({ title: `商品${num}` })
              ),
            })
          );
        }),
      ],
    },
  },
};

export const NoProductInCart: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/carts/1"), () => {
          return HttpResponse.json(
            generateCartMock({
              products: [],
              total: 0,
              discountedTotal: 0,
              totalProducts: 0,
              totalQuantity: 0,
            })
          );
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/carts/1"), async () => {
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
      ],
    },
  },
};
