import { AppContainer } from "@/shared/components/app/AppContainer";
import { createPageMetadata } from "@/shared/seo/metadata";

import { ContactAppHeader } from "../components/ContactAppHeader";
import { ContactForm } from "../components/ContactForm";
import messages from "../locales/es.json";
import { CONTACT_PATH } from "../routes";

export function getContactMetadata() {
  return createPageMetadata({
    title: messages.page.metadataTitle,
    description: messages.page.metadataDescription,
    path: CONTACT_PATH,
  });
}

export function ContactView() {
  return (
    <>
      <ContactAppHeader />
      <main id="main-content" className="overflow-x-clip pt-16 max-md:pt-14">
        <AppContainer className="py-20 max-md:py-14">
          <div className="mx-auto grid max-w-2xl gap-6">
            <header className="grid gap-3">
              <h1 className="m-0">{messages.page.title}</h1>
              <p className="text-body-lg text-fg-muted m-0">
                {messages.page.description}
              </p>
            </header>
            <noscript>
              <p className="text-body-sm text-fg-muted m-0">
                {messages.page.noScript}
              </p>
            </noscript>
            <ContactForm />
          </div>
        </AppContainer>
      </main>
    </>
  );
}
