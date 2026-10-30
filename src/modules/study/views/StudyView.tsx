import type { Metadata } from "next";

import { AppContainer } from "@/shared/components/app/AppContainer";
import { createPageMetadata } from "@/shared/seo/metadata";

import { QuizRunner } from "../components/QuizRunner";
import messages from "../locales/es.json";
import { STUDY_PATH } from "../routes";

export function getStudyMetadata(): Metadata {
  return {
    ...createPageMetadata({
      title: messages.page.metadataTitle,
      description: messages.page.metadataDescription,
      path: STUDY_PATH,
    }),
    robots: { index: false, follow: false },
  };
}

export function StudyView() {
  return (
    <main id="main-content">
      <AppContainer className="py-14 max-md:py-8">
        <div className="mx-auto grid max-w-2xl gap-6">
          <header className="grid gap-3">
            <p className="text-caption text-fg-muted m-0 font-mono">
              {messages.page.eyebrow}
            </p>
            <h1 className="text-h2 m-0">{messages.page.title}</h1>
            <p className="text-body text-fg-muted m-0">
              {messages.page.description}
            </p>
          </header>
          <noscript>
            <p className="text-body-sm text-fg-muted m-0">
              {messages.page.noScript}
            </p>
          </noscript>
          <QuizRunner />
        </div>
      </AppContainer>
    </main>
  );
}
