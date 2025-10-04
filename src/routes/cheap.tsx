import { createFileRoute } from "@tanstack/react-router";
import { CheapShop } from "@features/CheapShop";

export const Route = createFileRoute("/cheap")({
  component: () => <CheapShop />,
});
