"use client";

import { createToaster, Toast, Toaster } from "@ark-ui/react/toast";
import { Portal } from "@ark-ui/react/portal";
import { X } from "lucide-react";

export const uiToaster = createToaster({
  placement: "bottom-end",
  overlap: false,
  gap: 16,
});

interface ShowUiToastOptions {
  type: "success" | "error";
  title: string;
  description: string;
  duration: number;
}

export function showUiToast({
  type,
  title,
  description,
  duration,
}: ShowUiToastOptions) {
  return uiToaster.create({
    type,
    title,
    description,
    duration,
    closable: true,
  });
}

interface UiToasterProps {
  label: string;
  closeLabel: string;
}

export function UiToaster({ label, closeLabel }: UiToasterProps) {
  return (
    <Portal>
      <Toaster
        toaster={uiToaster}
        label={label}
        className="!bg-transparent !bg-none"
        data-surface="light"
      >
        {(toast) => (
          <Toast.Root role={toast.type === "error" ? "alert" : undefined}>
            <Toast.Title>{toast.title}</Toast.Title>
            <Toast.Description>{toast.description}</Toast.Description>
            <Toast.CloseTrigger
              className="btn-icon btn-icon--sm"
              aria-label={closeLabel}
            >
              <X />
            </Toast.CloseTrigger>
          </Toast.Root>
        )}
      </Toaster>
    </Portal>
  );
}
