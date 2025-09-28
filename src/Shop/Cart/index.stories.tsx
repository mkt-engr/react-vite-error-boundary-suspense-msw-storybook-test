import type { Cart } from "@/schemes/cart";
import { generateApiUrl } from "@/test/generateApiUrl";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { delay, http, HttpResponse } from "msw";

const meta: Meta<typeof Cart> = {
  tags: ["autodocs"],
  component: Cart,
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
          return HttpResponse.json({
            id: 1,
            products: [
              {
                id: 1,
                title: "商品1",
                price: 100,
                quantity: 1,
                total: 100,
                discountPercentage: 0,
                discountedTotal: 100,
                thumbnail: "https://example.com/image1.jpg",
              },
              {
                id: 2,
                title: "商品2",
                price: 200,
                quantity: 2,
                total: 400,
                discountPercentage: 5,
                discountedTotal: 380,
                thumbnail: "https://example.com/image2.jpg",
              },
              {
                id: 3,
                title: "商品3",
                price: 300,
                quantity: 1,
                total: 300,
                discountPercentage: 10,
                discountedTotal: 270,
                thumbnail: "https://example.com/image3.jpg",
              },
            ],
            total: 800,
            discountedTotal: 750,
            userId: 1,
            totalProducts: 3,
            totalQuantity: 4,
          } satisfies Cart);
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
          return HttpResponse.json({
            id: 1,
            products: [],
            total: 0,
            discountedTotal: 0,
            userId: 1,
            totalProducts: 0,
            totalQuantity: 0,
          } satisfies Cart);
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
