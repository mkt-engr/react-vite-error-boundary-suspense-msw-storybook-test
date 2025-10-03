import { generateQuoteMock } from "@mocks/quota";
import { buildGetQuoteHandler } from "@mocks/quota/handler";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Content as component } from ".";

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
        buildGetQuoteHandler.success({
          response: generateQuoteMock({
            id: 1,
            quote: "君のような勘のいいガキは嫌いだよ",
            author: "ショウ・タッカー",
          }),
        }),
      ],
    },
  },
};

export const LongQuote: Story = {
  parameters: {
    msw: {
      handlers: [
        buildGetQuoteHandler.success({
          response: generateQuoteMock({
            id: 2,
            quote:
              "The way to get started is to quit talking and begin doing. Don't be afraid to give up the good to go for the great. Innovation distinguishes between a leader and a follower.",
            author: "Walt Disney & Steve Jobs",
          }),
        }),
      ],
    },
  },
};

export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [buildGetQuoteHandler.loading()],
    },
  },
};

export const Error: Story = {
  parameters: {
    msw: {
      handlers: [buildGetQuoteHandler.error({ status: 500 })],
    },
  },
};
