import type { Meta, StoryObj } from "@storybook/react-vite";
import { Users } from ".";

const meta: Meta<typeof Users> = {
  component: Users,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};