import type { Metadata } from "next";
import { purafruitCaseStudy } from "../content/purafruit.content";
import { keelCaseStudy } from "../content/keel.content";
import projectsMessages from "../locales/es.json";
import { KEEL_PATH, PURAFRUIT_PATH } from "../routes";
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

export function getKeelMetadata(): Metadata {
  return createPageMetadata({
    title: projectsMessages.keel.metadata.title,
    description: projectsMessages.keel.metadata.description,
    path: KEEL_PATH,
    image: {
      path: keelCaseStudy.coverImage,
      width: 1280,
      height: 640,
      alt: projectsMessages.keel.metadata.imageAlt,
    },
  });
}
