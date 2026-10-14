export interface QuestionMiniCard {
  labelKey: string;
  valueKey: string;
}

export interface QuestionItem {
  id: string;
  promptKey: string;
  answerKey: string;
  emphasisKey?: string;
  miniCards: readonly QuestionMiniCard[];
}

export interface StackFacet {
  id: "software" | "ai" | "data";
  titleKey: string;
  descriptionKey: string;
  groups: readonly { titleKey: string; items: readonly string[] }[];
  feature?: { name: string; descriptionKey: string };
}

export interface PortfolioProject {
  name: string;
  image: string;
  altKey: string;
  descriptionKey: string;
  isPending?: boolean;
}

export interface BuiltItem {
  id: "rewards" | "commerce" | "payments" | "mercadosya" | "bluex";
  titleKey: string;
  detail: string;
  isAi?: boolean;
}

export interface AboutFacet {
  facet: "software" | "ai" | "automation";
  labelKey: string;
}

export interface AboutContactItem {
  id: "email" | "projects" | "linkedIn";
  icon: "email" | "briefcase" | "linkedin";
  labelKey: string;
}
