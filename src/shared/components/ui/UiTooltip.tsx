"use client";

import { Portal } from "@ark-ui/react/portal";
import { Tooltip } from "@ark-ui/react/tooltip";
import type { ReactElement, ReactNode } from "react";

interface UiTooltipProps {
  content: ReactNode;
  children: ReactElement;
  surface?: "default" | "light";
}

export function UiTooltip({
  content,
  children,
  surface = "default",
}: UiTooltipProps) {
  return (
    <Tooltip.Root openDelay={250} closeDelay={100}>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content
            data-surface={surface === "light" ? "light" : undefined}
          >
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            {content}
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  );
}
