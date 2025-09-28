import { generateQuoteMock } from "@/mocks/quota.mock";
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
        http.get(generateApiUrl("/quotes/random"), () => {
          return HttpResponse.json(
            generateQuoteMock({
              id: 1,
              quote: "君のような勘のいいガキは嫌いだよ",
              author: "ショウ・タッカー",
            })
          );
        }),
      ],
    },
  },
};

export const LongQuote: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(generateApiUrl("/quotes/random"), () => {
          return HttpResponse.json(
            generateQuoteMock({
              id: 2,
              quote:
                "The way to get started is to quit talking and begin doing. Don't be afraid to give up the good to go for the great. Innovation distinguishes between a leader and a follower.",
              author: "Walt Disney & Steve Jobs",
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
        http.get(generateApiUrl("/quotes/random"), () => {
          return new HttpResponse(null, { status: 500 });
        }),
      ],
    },
  },
};
