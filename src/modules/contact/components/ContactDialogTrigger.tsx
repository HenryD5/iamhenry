"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { ContactDialog } from "./ContactDialog";

interface ContactDialogTriggerProps {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  dataMotionSection?: string;
}

export function ContactDialogTrigger({
  children,
  className,
  ariaLabel,
  dataMotionSection,
}: ContactDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        aria-label={ariaLabel}
        data-motion-section={dataMotionSection}
        onClick={() => setIsOpen(true)}
      >
        {children}
      </button>
      <ContactDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
