import type { ContactTriggerRenderer } from "@/shared/types/contact-trigger.types";
import { AppContactIcon } from "@/shared/components/app/AppContactIcon";
import messages from "@/shared/locales/es.json";

import { ContactDialogTrigger } from "../components/ContactDialogTrigger";

export const renderContactTrigger: ContactTriggerRenderer = ({
  children,
  ...props
}) => <ContactDialogTrigger {...props}>{children}</ContactDialogTrigger>;

export function ContactFloatingTriggerView() {
  return (
    <ContactDialogTrigger
      className="bg-primary-500 font-primary text-button hover:bg-primary-600 shadow-strong fixed right-8 bottom-5 z-10 inline-flex items-center gap-2.5 rounded-full px-5 py-4 leading-none font-semibold text-white no-underline transition-colors duration-150 hover:text-white max-md:right-5"
      ariaLabel={messages.floatingContact}
      dataMotionSection="floating-contact"
    >
      <AppContactIcon />
      {messages.floatingContact}
    </ContactDialogTrigger>
  );
}
