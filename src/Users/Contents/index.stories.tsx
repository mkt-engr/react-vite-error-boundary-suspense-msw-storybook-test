import type { Meta, StoryObj } from "@storybook/react-vite";
import { Contents } from ".";

const meta: Meta<typeof Contents> = {
  component: Contents,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
