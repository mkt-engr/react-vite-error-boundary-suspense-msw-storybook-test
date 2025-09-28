import type { Meta, StoryObj } from "@storybook/react-vite";
import { Shop as component } from ".";

const meta: Meta<typeof component> = {
  component,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
