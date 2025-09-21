import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TestProvider = ({ children }: Props) => <>{children}</>;
