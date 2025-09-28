import type { QuotesResponse } from "@/schemes/quote";
import { generateApiUrl } from "@/test/generateApiUrl";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { delay, http, HttpResponse } from "msw";
import { Quote as component } from ".";

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
        http.get(generateApiUrl("/quotes"), () => {
          return HttpResponse.json({
            quotes: [
              {
                id: 1,
                quote: "Life isn't about getting and having, it's about giving and being.",
                author: "Kevin Kruse",
              },
            ],
            total: 1,
            skip: 0,
            limit: 1,
          } satisfies QuotesResponse);
        }),
      ],
    },
  },
};

export const LongQuote: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/quotes"), () => {
          return HttpResponse.json({
            quotes: [
              {
                id: 2,
                quote: "The way to get started is to quit talking and begin doing. Don't be afraid to give up the good to go for the great. Innovation distinguishes between a leader and a follower.",
                author: "Walt Disney & Steve Jobs",
              },
            ],
            total: 1,
            skip: 0,
            limit: 1,
          } satisfies QuotesResponse);
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/quotes"), async () => {
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
        http.get(generateApiUrl("/quotes"), () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};