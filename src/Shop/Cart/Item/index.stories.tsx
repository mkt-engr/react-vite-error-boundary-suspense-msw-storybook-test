import { generateCartMock } from "@/mocks/cart";
import { generateProductMock } from "@/mocks/product";
import { generateApiUrl } from "@/test/generateApiUrl";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { delay, http, HttpResponse } from "msw";
import { Item as component } from ".";

const meta: Meta<typeof component> = {
  tags: ["autodocs"],
  component,
  parameters: {
    docs: {
      story: {
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
                generateProductMock({ id: num, title: `商品${num}` })
              ),
              total: 1500,
            })
          );
        }),
      ],
    },
  },
};

export const ManyProducts: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/carts/1"), () => {
          return HttpResponse.json(
            generateCartMock({
              products: [1, 2, 3, 4, 5, 6, 7, 8].map((num) =>
                generateProductMock({ id: num, title: `商品${num}` })
              ),
              total: 5000,
            })
          );
        }),
      ],
    },
  },
};

export const EmptyCart: Story = {
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
