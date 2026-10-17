export interface CaseStudyFact {
  id: "challenge" | "solution" | "impact";
  labelKey: string;
  textKey: string;
}

export interface CaseStudyCapability {
  id: "species" | "threshold" | "chat" | "location";
  titleKey: string;
  textKey: string;
}

export interface CaseStudyHighlight {
  id: "offline" | "guide" | "evidence" | "rewards";
  titleKey: string;
  textKey: string;
}

export interface CaseStudyVideo {
  basePath: string;
  width: number;
  height: number;
}

export interface CaseStudyScreen {
  id: "summary" | "map" | "aiReview";
  image: string;
  imagePlaceholder: string;
  width: number;
  height: number;
  titleKey: string;
  textKey: string;
  altKey: string;
}

export interface CaseStudy {
  name: string;
  diagramSrc: string;
  coverImage: string;
  demoVideo: CaseStudyVideo;
  fieldAppHighlights: readonly CaseStudyHighlight[];
  panelScreens: readonly CaseStudyScreen[];
  stack: readonly string[];
  facts: readonly CaseStudyFact[];
  capabilities: readonly CaseStudyCapability[];
}
