import type { ReactNode } from "react";

interface AppFloatingContactProps {
  contactTrigger: ReactNode;
}

export async function AppFloatingContact({
  contactTrigger,
}: AppFloatingContactProps) {
  return contactTrigger;
}
