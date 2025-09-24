import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from ".";

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
