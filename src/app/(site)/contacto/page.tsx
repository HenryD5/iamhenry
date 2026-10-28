import {
  ContactView,
  getContactMetadata,
} from "@/modules/contact/views/ContactView";

export const generateMetadata = getContactMetadata;

export default function ContactPage() {
  return <ContactView />;
}
