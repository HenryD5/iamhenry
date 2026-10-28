"use client";

import { useId } from "react";

import { UiDialog } from "@/shared/components/ui/UiDialog";

import messages from "../locales/es.json";
import { ContactForm } from "./ContactForm";

interface ContactDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function ContactDialog({ isOpen, onOpenChange }: ContactDialogProps) {
  const formId = useId();

  return (
    <UiDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      initialFocusEl={() =>
        document.querySelector<HTMLInputElement>(
          `#${CSS.escape(formId)} input[name="name"]`,
        )
      }
      title={messages.dialog.title}
      description={messages.dialog.description}
      closeLabel={messages.dialog.closeLabel}
      surface="light"
      backdropClassName="bg-(--dark-10)"
      contentClassName="relative pt-10 bg-(--bg-raised) backdrop-blur-none [&_[data-part=close-trigger]]:absolute [&_[data-part=close-trigger]]:top-6 [&_[data-part=close-trigger]]:right-4"
    >
      <div id={formId}>
        <ContactForm />
      </div>
    </UiDialog>
  );
}
