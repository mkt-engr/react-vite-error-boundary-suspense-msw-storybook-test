import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from ".";

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};