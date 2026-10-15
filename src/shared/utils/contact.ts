import { siteConfig } from "@/shared/config/site";

export function isExternalContact(): boolean {
  return siteConfig.person.whatsapp !== null;
}

export function getContactHref(message: string): string {
  const encodedMessage = encodeURIComponent(message);

  return isExternalContact()
    ? `https://wa.me/${siteConfig.person.whatsapp}?text=${encodedMessage}`
    : `mailto:${siteConfig.person.email}?body=${encodedMessage}`;
}
