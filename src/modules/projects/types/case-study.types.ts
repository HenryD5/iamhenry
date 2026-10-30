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

export interface KeelFact {
  id: "problem" | "solution" | "result";
  labelKey: string;
  textKey: string;
}

export interface KeelStep {
  id: "open" | "scan" | "review" | "select" | "verify";
  textKey: string;
}

export interface KeelCheck {
  id:
    | "minimum"
    | "quarantine"
    | "secondSource"
    | "malware"
    | "scripts"
    | "signatures"
    | "approval";
  titleKey: string;
  textKey: string;
}

export interface KeelLimit {
  id:
    | "npm"
    | "workspaces"
    | "overrides"
    | "changelog"
    | "imports"
    | "verification";
  textKey: string;
}

export interface KeelLink {
  id: "marketplace" | "github";
  href: string;
  labelKey: string;
}

export interface KeelScreen {
  id: "results" | "detail" | "review";
  image: string;
  imagePlaceholder: string;
  width: number;
  height: number;
  titleKey: string;
  textKey: string;
  altKey: string;
}

export interface KeelCaseStudy {
  name: string;
  coverImage: string;
  links: readonly KeelLink[];
  facts: readonly KeelFact[];
  steps: readonly KeelStep[];
  screens: readonly KeelScreen[];
  checks: readonly KeelCheck[];
  limits: readonly KeelLimit[];
  stack: readonly string[];
}
