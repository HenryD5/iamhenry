import type { ReactNode } from "react";

export interface ContactTriggerRenderProps {
  children: ReactNode;
  className: string;
  ariaLabel?: string;
  dataMotionSection?: string;
}

export type ContactTriggerRenderer = (
  props: ContactTriggerRenderProps,
) => ReactNode;
