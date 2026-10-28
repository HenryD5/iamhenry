"use client";

import type { ReactNode } from "react";
import { useState } from "react";

import { getContactHref } from "@/shared/utils/contact";

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
      <a
        className={className}
        href={getContactHref()}
        aria-label={ariaLabel}
        data-motion-section={dataMotionSection}
        onClick={(event) => {
          event.preventDefault();
          setIsOpen(true);
        }}
      >
        {children}
      </a>
      <ContactDialog isOpen={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
