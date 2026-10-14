"use client";

import { Drawer } from "@ark-ui/react/drawer";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface UiDrawerProps {
  trigger: ReactNode;
  title: string;
  description: string;
  closeLabel: string;
  children: ReactNode;
  surface?: "default" | "light";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "bottom" | "end";
  contentClassName?: string;
  headerStart?: ReactNode;
}

export function UiDrawer({
  trigger,
  title,
  description,
  closeLabel,
  children,
  surface = "default",
  open,
  onOpenChange,
  placement = "bottom",
  contentClassName,
  headerStart,
}: UiDrawerProps) {
  const isEnd = placement === "end";
  const hasHeader = Boolean(headerStart);
  const closeButton = (
    <Drawer.CloseTrigger
      className="btn-icon btn-icon--md !size-[44px] !min-h-[44px] !min-w-[44px] !p-0"
      aria-label={closeLabel}
    >
      <X />
    </Drawer.CloseTrigger>
  );
  const resolvedContentClassName = [
    isEnd
      ? `!h-dvh !max-h-dvh ${contentClassName ? "" : "!w-[min(24rem,88vw)]"} !max-w-none !rounded-none !border-y-0 !border-r-0 ${hasHeader ? "!flex !flex-col !gap-6 !p-5" : "!p-8"} data-[state=open]:[animation:none!important]`
      : "data-[state=open]:[animation:none!important]",
    contentClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Drawer.Root
      lazyMount={false}
      unmountOnExit={false}
      open={open}
      onOpenChange={({ open: nextOpen }) => onOpenChange?.(nextOpen)}
    >
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop className="data-[state=open]:[animation:none!important]" />
        <Drawer.Positioner
          className={isEnd ? "!items-stretch !justify-end" : undefined}
          data-placement={placement}
        >
          <Drawer.Content
            className={resolvedContentClassName}
            data-surface={surface === "light" ? "light" : undefined}
            data-placement={placement}
          >
            {hasHeader ? (
              <div className="flex items-center justify-between gap-4">
                {headerStart}
                {closeButton}
              </div>
            ) : null}
            {hasHeader ? (
              <Drawer.Title className="sr-only">{title}</Drawer.Title>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <Drawer.Title>{title}</Drawer.Title>
                {closeButton}
              </div>
            )}
            <Drawer.Description className={hasHeader ? "sr-only" : undefined}>
              {description}
            </Drawer.Description>
            {children}
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
}
