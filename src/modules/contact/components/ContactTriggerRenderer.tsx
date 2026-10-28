import type { ContactTriggerRenderer as ContactTriggerRendererType } from "@/shared/types/contact-trigger.types";

import { ContactDialogTrigger } from "./ContactDialogTrigger";

export const renderContactTrigger: ContactTriggerRendererType = ({
  children,
  ...props
}) => <ContactDialogTrigger {...props}>{children}</ContactDialogTrigger>;
