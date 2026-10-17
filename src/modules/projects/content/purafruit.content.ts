import type { CaseStudy } from "../types/case-study.types";

export const purafruitCaseStudy = {
  name: "Purafruit",
  diagramSrc: "/media/purafruit-flujo-datos.html",
  coverImage: "/images/projects/purafruit-portada.jpg",
  demoVideo: {
    basePath: "/media/biohuella-demo",
    width: 540,
    height: 1174,
  },
  fieldAppHighlights: [
    {
      id: "offline",
      titleKey: "purafruit.fieldApp.highlights.offline.title",
      textKey: "purafruit.fieldApp.highlights.offline.text",
    },
    {
      id: "guide",
      titleKey: "purafruit.fieldApp.highlights.guide.title",
      textKey: "purafruit.fieldApp.highlights.guide.text",
    },
    {
      id: "evidence",
      titleKey: "purafruit.fieldApp.highlights.evidence.title",
      textKey: "purafruit.fieldApp.highlights.evidence.text",
    },
    {
      id: "rewards",
      titleKey: "purafruit.fieldApp.highlights.rewards.title",
      textKey: "purafruit.fieldApp.highlights.rewards.text",
    },
  ],
  panelScreens: [
    {
      id: "summary",
      image: "/images/projects/biohuella-panel-resumen.webp",
      imagePlaceholder:
        "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAIABADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAdEAEAAgEFAQAAAAAAAAAAAAABAAIRBgcTIVJx/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAATH/2gAMAwEAAhEDEQA/AKDbzDpiqhnluufspkrbyB3ERdSP/9k=",
      width: 1600,
      height: 846,
      titleKey: "purafruit.panel.screens.summary.title",
      textKey: "purafruit.panel.screens.summary.text",
      altKey: "purafruit.panel.screens.summary.alt",
    },
    {
      id: "map",
      image: "/images/projects/biohuella-panel-mapa.webp",
      imagePlaceholder:
        "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUG/8QAHRAAAQMFAQAAAAAAAAAAAAAAAQADEQIGEhNBIv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAFB/9oADAMBAAIRAxEAPwC1YlbwtZssj1urmRyVqmMsQXCSSJM8KImpH//Z",
      width: 1600,
      height: 838,
      titleKey: "purafruit.panel.screens.map.title",
      textKey: "purafruit.panel.screens.map.text",
      altKey: "purafruit.panel.screens.map.alt",
    },
    {
      id: "aiReview",
      image: "/images/projects/biohuella-panel-analisis-ia.webp",
      imagePlaceholder:
        "data:image/jpeg;base64,/9j/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wAARCAAIABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAQG/8QAIBAAAQMCBwAAAAAAAAAAAAAAAAECEQQGEiEzNUFxsf/EABQBAQAAAAAAAAAAAAAAAAAAAAL/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEQMRAD8AmtraWrzjd6bm3cqN0RqrM9IAKjH/2Q==",
      width: 1600,
      height: 838,
      titleKey: "purafruit.panel.screens.aiReview.title",
      textKey: "purafruit.panel.screens.aiReview.text",
      altKey: "purafruit.panel.screens.aiReview.alt",
    },
  ],
  stack: [
    "Google ADK",
    "Gemini",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "PostGIS",
    "SeaweedFS",
    "Vue 3",
    "Kotlin",
    "Swift",
    "Docker",
  ],
  facts: [
    {
      id: "challenge",
      labelKey: "purafruit.facts.challenge.label",
      textKey: "purafruit.facts.challenge.text",
    },
    {
      id: "solution",
      labelKey: "purafruit.facts.solution.label",
      textKey: "purafruit.facts.solution.text",
    },
    {
      id: "impact",
      labelKey: "purafruit.facts.impact.label",
      textKey: "purafruit.facts.impact.text",
    },
  ],
  capabilities: [
    {
      id: "species",
      titleKey: "purafruit.capabilities.species.title",
      textKey: "purafruit.capabilities.species.text",
    },
    {
      id: "threshold",
      titleKey: "purafruit.capabilities.threshold.title",
      textKey: "purafruit.capabilities.threshold.text",
    },
    {
      id: "chat",
      titleKey: "purafruit.capabilities.chat.title",
      textKey: "purafruit.capabilities.chat.text",
    },
    {
      id: "location",
      titleKey: "purafruit.capabilities.location.title",
      textKey: "purafruit.capabilities.location.text",
    },
  ],
} as const satisfies CaseStudy;
