import type {
  BuiltItem,
  AboutContactItem,
  AboutFacet,
  PortfolioProject,
  QuestionItem,
  StackFacet,
} from "../types/home-content.types";
import type { OrbitDot, OrbitRing } from "../types/hero.types";

export const stackVisual: "video" | "illustration" = "video";

export const stackVideo = {
  basePath: "/media/stack-tres-cuerpos",
  width: 1200,
  height: 900,
} as const;

export const stackOrbitRings = [
  { radiusX: 210, radiusY: 74, opacity: 0.3 },
  { radiusX: 150, radiusY: 52, opacity: 0.3, isDashed: true },
  { radiusX: 92, radiusY: 32, opacity: 0.3 },
] as const satisfies readonly OrbitRing[];

export const closingOrbitRings = [
  { radiusX: 250, radiusY: 92, opacity: 0.3 },
  { radiusX: 178, radiusY: 64, opacity: 0.3, isDashed: true },
  { radiusX: 108, radiusY: 38, opacity: 0.3 },
] as const satisfies readonly OrbitRing[];

export const closingOrbitDots = [
  { x: 84, y: 85, radius: 9, colorToken: "var(--primary-400)" },
  { x: 118, y: 188, radius: 7, colorToken: "var(--tertiary-400)" },
  { x: 360, y: 118, radius: 6, colorToken: "var(--primary-300)" },
] as const satisfies readonly OrbitDot[];

export const stackBarHeights = [38, 55, 46, 72, 64, 100] as const;

export const questionItems: readonly QuestionItem[] = [
  {
    id: "who",
    promptKey: "question.items.who.prompt",
    answerKey: "question.items.who.answer",
    emphasisKey: "question.items.who.emphasis",
    miniCards: [
      {
        labelKey: "question.items.who.cards.now.label",
        valueKey: "question.items.who.cards.now.value",
      },
      {
        labelKey: "question.items.who.cards.company.label",
        valueKey: "question.items.who.cards.company.value",
      },
      {
        labelKey: "question.items.who.cards.experience.label",
        valueKey: "question.items.who.cards.experience.value",
      },
    ],
  },
  {
    id: "technologies",
    promptKey: "question.items.technologies.prompt",
    answerKey: "question.items.technologies.answer",
    miniCards: [
      {
        labelKey: "question.items.technologies.cards.frontend.label",
        valueKey: "question.items.technologies.cards.frontend.value",
      },
      {
        labelKey: "question.items.technologies.cards.backend.label",
        valueKey: "question.items.technologies.cards.backend.value",
      },
      {
        labelKey: "question.items.technologies.cards.data.label",
        valueKey: "question.items.technologies.cards.data.value",
      },
    ],
  },
  {
    id: "work",
    promptKey: "question.items.work.prompt",
    answerKey: "question.items.work.answer",
    miniCards: [
      {
        labelKey: "question.items.work.cards.now.label",
        valueKey: "question.items.work.cards.now.value",
      },
      {
        labelKey: "question.items.work.cards.before.label",
        valueKey: "question.items.work.cards.before.value",
      },
      {
        labelKey: "question.items.work.cards.leadership.label",
        valueKey: "question.items.work.cards.leadership.value",
      },
    ],
  },
  {
    id: "projects",
    promptKey: "question.items.projects.prompt",
    answerKey: "question.items.projects.answer",
    miniCards: [
      {
        labelKey: "question.items.projects.cards.imports.label",
        valueKey: "question.items.projects.cards.imports.value",
      },
      {
        labelKey: "question.items.projects.cards.commerce.label",
        valueKey: "question.items.projects.cards.commerce.value",
      },
      {
        labelKey: "question.items.projects.cards.marketplace.label",
        valueKey: "question.items.projects.cards.marketplace.value",
      },
    ],
  },
  {
    id: "ai",
    promptKey: "question.items.ai.prompt",
    answerKey: "question.items.ai.answer",
    miniCards: [
      {
        labelKey: "question.items.ai.cards.venture.label",
        valueKey: "question.items.ai.cards.venture.value",
      },
      {
        labelKey: "question.items.ai.cards.focus.label",
        valueKey: "question.items.ai.cards.focus.value",
      },
      {
        labelKey: "question.items.ai.cards.flows.label",
        valueKey: "question.items.ai.cards.flows.value",
      },
    ],
  },
] as const satisfies readonly QuestionItem[];

export const stackFacets: readonly StackFacet[] = [
  {
    id: "software",
    titleKey: "stack.facets.software.title",
    descriptionKey: "stack.facets.software.description",
    groups: [
      {
        titleKey: "stack.groups.frontend",
        items: [
          "Vue",
          "Nuxt",
          "React",
          "Next.js",
          "Angular",
          "TypeScript",
          "JavaScript",
        ],
      },
      {
        titleKey: "stack.groups.backend",
        items: ["Node.js", "NestJS", "Python", "MongoDB"],
      },
    ],
  },
  {
    id: "ai",
    titleKey: "stack.facets.ai.title",
    descriptionKey: "stack.facets.ai.description",
    feature: { name: "BlueX", descriptionKey: "stack.facets.ai.bluex" },
    groups: [
      {
        titleKey: "stack.groups.ai",
        items: ["Agentes de IA", "Prompting", "Bots"],
      },
      {
        titleKey: "stack.groups.automation",
        items: ["n8n", "Webhooks", "Scripts"],
      },
    ],
  },
  {
    id: "data",
    titleKey: "stack.facets.data.title",
    descriptionKey: "stack.facets.data.description",
    groups: [
      { titleKey: "stack.groups.tools", items: ["Power BI", "Looker Studio"] },
    ],
  },
] as const satisfies readonly StackFacet[];

export const portfolioProjects: readonly PortfolioProject[] = [
  {
    name: "Shypper",
    image: "/images/projects/shypper-portada.jpg",
    altKey: "portfolio.projects.shypper.alt",
    descriptionKey: "portfolio.projects.shypper.description",
  },
  {
    name: "Paes",
    image: "/images/projects/paes-portada.jpg",
    altKey: "portfolio.projects.paes.alt",
    descriptionKey: "portfolio.projects.paes.description",
  },
  {
    name: "Market Paes",
    image: "/images/projects/market-portada.jpg",
    altKey: "portfolio.projects.market.alt",
    descriptionKey: "portfolio.projects.market.description",
  },
  {
    name: "Spa",
    image: "/images/projects/spa-portada.jpg",
    altKey: "portfolio.projects.spa.alt",
    descriptionKey: "portfolio.projects.spa.description",
  },
  {
    name: "Escuela",
    image: "/images/projects/escuela-portada.jpg",
    altKey: "portfolio.projects.escuela.alt",
    descriptionKey: "portfolio.projects.escuela.description",
  },
  {
    name: "Agencia",
    image: "/images/projects/agencia-portada.jpg",
    altKey: "portfolio.projects.agencia.alt",
    descriptionKey: "portfolio.projects.agencia.description",
    isPending: true,
  },
] as const satisfies readonly PortfolioProject[];

export const builtItems: readonly BuiltItem[] = [
  {
    id: "rewards",
    titleKey: "portfolio.built.rewards",
    detail: "Manzana Verde",
  },
  {
    id: "commerce",
    titleKey: "portfolio.built.commerce",
    detail: "Manzana Verde",
  },
  {
    id: "payments",
    titleKey: "portfolio.built.payments",
    detail: "Manzana Verde",
  },
  {
    id: "mercadosya",
    titleKey: "portfolio.built.mercadosya",
    detail: "Marketplace de productos",
  },
  {
    id: "bluex",
    titleKey: "portfolio.built.bluex",
    detail: "Agentes de IA para empresas",
    isAi: true,
  },
] as const satisfies readonly BuiltItem[];

export const aboutFacets = [
  { facet: "software", labelKey: "about.facets.software" },
  { facet: "ai", labelKey: "about.facets.ai" },
  { facet: "automation", labelKey: "about.facets.automation" },
] as const satisfies readonly AboutFacet[];

export const aboutContactItems = [
  { id: "email", icon: "email", labelKey: "about.email" },
  { id: "projects", icon: "briefcase", labelKey: "about.projects" },
  { id: "linkedIn", icon: "linkedin", labelKey: "about.linkedIn" },
] as const satisfies readonly AboutContactItem[];
