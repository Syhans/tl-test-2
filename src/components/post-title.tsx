import { ReactNode } from "react";

import { H1 } from "@/components/ui/typography";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return <H1>{children}</H1>;
}
