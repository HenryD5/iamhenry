import type { Metadata } from "next";
import { purafruitCaseStudy } from "../content/purafruit.content";
import projectsMessages from "../locales/es.json";
import { PURAFRUIT_PATH } from "../routes";
import { createPageMetadata } from "@/shared/seo/metadata";

export function getPurafruitMetadata(): Metadata {
  return createPageMetadata({
    title: projectsMessages.purafruit.metadata.title,
    description: projectsMessages.purafruit.metadata.description,
    path: PURAFRUIT_PATH,
    image: {
      path: purafruitCaseStudy.coverImage,
      width: 1280,
      height: 840,
      alt: projectsMessages.purafruit.diagram.frameTitle,
    },
  });
}
