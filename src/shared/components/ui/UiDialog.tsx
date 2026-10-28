"use client";

import { Dialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface UiDialogProps {
  trigger?: ReactNode;
  title: string;
  description: string;
  closeLabel: string;
  children: ReactNode;
  surface?: "default" | "light";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  initialFocusEl?: () => HTMLElement | null;
  contentClassName?: string;
  backdropClassName?: string;
}

export function UiDialog({
  trigger,
  title,
  description,
  closeLabel,
  children,
  surface = "default",
  open,
  onOpenChange,
  initialFocusEl,
  contentClassName,
  backdropClassName,
}: UiDialogProps) {
  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={open}
      onOpenChange={({ open: nextOpen }) => onOpenChange?.(nextOpen)}
      initialFocusEl={initialFocusEl}
    >
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Portal>
        <Dialog.Backdrop
          className={backdropClassName}
          data-surface={surface === "light" ? "light" : undefined}
        />
        <Dialog.Positioner
          className="!bg-transparent !bg-none"
          data-surface={surface === "light" ? "light" : undefined}
        >
          <Dialog.Content
            className={contentClassName}
            data-surface={surface === "light" ? "light" : undefined}
          >
            <Dialog.Title className="text-h4 pr-14 leading-tight font-bold">
              {title}
            </Dialog.Title>
            <Dialog.Description className="text-body-sm mb-3 pr-14 text-(--fg-muted)">
              {description}
            </Dialog.Description>
            {children}
            <Dialog.CloseTrigger
              className="btn-icon btn-icon--md !size-[44px] !min-h-[44px] !min-w-[44px] !p-0"
              aria-label={closeLabel}
            >
              <X />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
