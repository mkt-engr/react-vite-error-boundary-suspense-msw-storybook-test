import type { ProductsSearchResponse } from "@/schemes/product";
import { generateApiUrl } from "@/test/generateApiUrl";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { delay, http, HttpResponse } from "msw";
import { Contents } from ".";

const meta: Meta<typeof Contents> = {
  tags: ["autodocs"],
  component: Contents,
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
        http.get(generateApiUrl("/products/search"), () => {
          return HttpResponse.json({
            products: [
              {
                id: 1,
                title: "iPhone 9",
                description: "An apple mobile which is nothing like apple",
                category: "smartphones",
                price: 549,
                discountPercentage: 12.96,
                rating: 4.69,
                stock: 94,
                brand: "Apple",
                sku: "WW013001",
                weight: 2,
                tags: ["smartphones", "apple"],
                images: ["https://cdn.dummyjson.com/product-images/1/1.jpg"],
                thumbnail:
                  "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
              },
              {
                id: 2,
                title: "iPhone X",
                description:
                  "SIM-Free, Model A19211 6.5-inch Super Retina HD display",
                category: "smartphones",
                price: 899,
                discountPercentage: 17.94,
                rating: 4.44,
                stock: 34,
                brand: "Apple",
                sku: "WW013002",
                weight: 2,
                tags: ["smartphones", "apple"],
                images: ["https://cdn.dummyjson.com/product-images/2/1.jpg"],
                thumbnail:
                  "https://cdn.dummyjson.com/product-images/2/thumbnail.jpg",
              },
              {
                id: 3,
                title: "Samsung Universe 9",
                description:
                  "Samsung's new variant which goes beyond Galaxy to the Universe",
                category: "smartphones",
                price: 1249,
                discountPercentage: 15.46,
                rating: 4.09,
                stock: 36,
                brand: "Samsung",
                sku: "WW013003",
                weight: 2,
                tags: ["smartphones", "samsung"],
                images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
                thumbnail:
                  "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
              },
            ],
            total: 3,
            skip: 0,
            limit: 30,
          } satisfies ProductsSearchResponse);
        }),
      ],
    },
  },
};

export const NoProduct: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/products/search"), () => {
          return HttpResponse.json({
            products: [],
            total: 0,
            skip: 0,
            limit: 30,
          } satisfies ProductsSearchResponse);
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/products/search"), async () => {
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
        http.get(generateApiUrl("/products/search"), () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
