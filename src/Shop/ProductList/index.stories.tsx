import { generateProductsSearchMock, generateProductInSearchMock } from "@/mocks/product";
import { buildGetProductsSearchMswHandler } from "@/mocks/product/handler";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductList as component } from ".";

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
        buildGetProductsSearchMswHandler.success({
          response: generateProductsSearchMock({
            products: [
              generateProductInSearchMock({
                id: 1,
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                category: "smartphones",
                price: 549,
                brand: "Apple",
              }),
              generateProductInSearchMock({
                id: 2,
                title: "iPhone X",
                description:
                  "SIM-Free, Model A19211 6.5-inch Super Retina HD display",
                category: "smartphones",
                price: 899,
                brand: "Apple",
              }),
              generateProductInSearchMock({
                id: 3,
                title: "Samsung Universe 9",
                description:
                  "Samsung's new variant which goes beyond Galaxy to the Universe",
                category: "smartphones",
                price: 1249,
                brand: "Samsung",
              }),
            ],
            total: 3,
          })
        }),
      ],
    },
  },
};

export const NoProduct: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetProductsSearchMswHandler.success({
          response: generateProductsSearchMock({
            products: [],
            total: 0,
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
        buildGetProductsSearchMswHandler.loading(),
      ],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetProductsSearchMswHandler.error({ status: 500 }),
      ],
    },
  },
};
