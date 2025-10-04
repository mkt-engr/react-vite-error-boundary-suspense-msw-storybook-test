import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "@features/Shop";

export const Route = createFileRoute("/")({
  component: () => <Shop />,
});
