import type { KeelCaseStudy } from "../types/case-study.types";

export const keelCaseStudy = {
  name: "Keel",
  coverImage: "/images/projects/keel-portada.jpg",
  links: [
    {
      id: "marketplace",
      href: "https://marketplace.visualstudio.com/items?itemName=iamhenry.keel-npm",
      labelKey: "keel.actions.marketplace",
    },
    {
      id: "github",
      href: "https://github.com/HenryD5/keel",
      labelKey: "keel.actions.github",
    },
  ],
  facts: [
    {
      id: "problem",
      labelKey: "keel.facts.problem.label",
      textKey: "keel.facts.problem.text",
    },
    {
      id: "solution",
      labelKey: "keel.facts.solution.label",
      textKey: "keel.facts.solution.text",
    },
    {
      id: "result",
      labelKey: "keel.facts.result.label",
      textKey: "keel.facts.result.text",
    },
  ],
  steps: [
    { id: "open", textKey: "keel.steps.items.open" },
    { id: "scan", textKey: "keel.steps.items.scan" },
    { id: "review", textKey: "keel.steps.items.review" },
    { id: "select", textKey: "keel.steps.items.select" },
    { id: "verify", textKey: "keel.steps.items.verify" },
    { id: "share", textKey: "keel.steps.items.share" },
  ],
  screens: [
    {
      id: "results",
      image: "/images/projects/keel-results.webp",
      imagePlaceholder:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgADAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABwcHBwcHDAcHDBEMDAwRFxEREREXHhcXFxcXHiQeHh4eHh4kJCQkJCQkJCsrKysrKzIyMjIyODg4ODg4ODg4OP/bAEMBCQkJDg0OGQ0NGTsoISg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//dAAQAAf/aAAwDAQACEQMRAD8A8SYnYKbk4/GgjIxTgBtORn+lCVwbsf/Z",
      width: 1280,
      height: 1000,
      titleKey: "keel.screens.items.results.title",
      textKey: "keel.screens.items.results.text",
      altKey: "keel.screens.items.results.alt",
    },
    {
      id: "detail",
      image: "/images/projects/keel-detail.webp",
      imagePlaceholder:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgADAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABwcHBwcHDAcHDBEMDAwRFxEREREXHhcXFxcXHiQeHh4eHh4kJCQkJCQkJCsrKysrKzIyMjIyODg4ODg4ODg4OP/bAEMBCQkJDg0OGQ0NGTsoISg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//dAAQAAf/aAAwDAQACEQMRAD8A8U3oAARzTWZM4UVO8Ki0E2Tn9OtUVYk4oA//2Q==",
      width: 1280,
      height: 1000,
      titleKey: "keel.screens.items.detail.title",
      textKey: "keel.screens.items.detail.text",
      altKey: "keel.screens.items.detail.alt",
    },
    {
      id: "review",
      image: "/images/projects/keel-review.webp",
      imagePlaceholder:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEKADAAQAAAABAAAADAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgADAAQAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMABwcHBwcHDAcHDBEMDAwRFxEREREXHhcXFxcXHiQeHh4eHh4kJCQkJCQkJCsrKysrKzIyMjIyODg4ODg4ODg4OP/bAEMBCQkJDg0OGQ0NGTsoISg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O//dAAQAAf/aAAwDAQACEQMRAD8A8TLZVVAH1pXUDoKgcnHFCsSeeaAP/9k=",
      width: 1280,
      height: 1000,
      titleKey: "keel.screens.items.review.title",
      textKey: "keel.screens.items.review.text",
      altKey: "keel.screens.items.review.alt",
    },
  ],
  checks: [
    {
      id: "minimum",
      titleKey: "keel.checks.items.minimum.title",
      textKey: "keel.checks.items.minimum.text",
    },
    {
      id: "quarantine",
      titleKey: "keel.checks.items.quarantine.title",
      textKey: "keel.checks.items.quarantine.text",
    },
    {
      id: "secondSource",
      titleKey: "keel.checks.items.secondSource.title",
      textKey: "keel.checks.items.secondSource.text",
    },
    {
      id: "malware",
      titleKey: "keel.checks.items.malware.title",
      textKey: "keel.checks.items.malware.text",
    },
    {
      id: "scripts",
      titleKey: "keel.checks.items.scripts.title",
      textKey: "keel.checks.items.scripts.text",
    },
    {
      id: "signatures",
      titleKey: "keel.checks.items.signatures.title",
      textKey: "keel.checks.items.signatures.text",
    },
    {
      id: "approval",
      titleKey: "keel.checks.items.approval.title",
      textKey: "keel.checks.items.approval.text",
    },
    {
      id: "registries",
      titleKey: "keel.checks.items.registries.title",
      textKey: "keel.checks.items.registries.text",
    },
    {
      id: "installed",
      titleKey: "keel.checks.items.installed.title",
      textKey: "keel.checks.items.installed.text",
    },
  ],
  afterApply: [
    {
      id: "validation",
      titleKey: "keel.afterApply.items.validation.title",
      textKey: "keel.afterApply.items.validation.text",
    },
    {
      id: "rollback",
      titleKey: "keel.afterApply.items.rollback.title",
      textKey: "keel.afterApply.items.rollback.text",
    },
    {
      id: "removal",
      titleKey: "keel.afterApply.items.removal.title",
      textKey: "keel.afterApply.items.removal.text",
    },
    {
      id: "report",
      titleKey: "keel.afterApply.items.report.title",
      textKey: "keel.afterApply.items.report.text",
    },
    {
      id: "pullRequest",
      titleKey: "keel.afterApply.items.pullRequest.title",
      textKey: "keel.afterApply.items.pullRequest.text",
    },
    {
      id: "projects",
      titleKey: "keel.afterApply.items.projects.title",
      textKey: "keel.afterApply.items.projects.text",
    },
  ],
  cli: [
    {
      id: "flow",
      titleKey: "keel.cli.items.flow.title",
      textKey: "keel.cli.items.flow.text",
    },
    {
      id: "approval",
      titleKey: "keel.cli.items.approval.title",
      textKey: "keel.cli.items.approval.text",
    },
    {
      id: "apply",
      titleKey: "keel.cli.items.apply.title",
      textKey: "keel.cli.items.apply.text",
    },
  ],
  limits: [
    { id: "npm", textKey: "keel.privacy.limits.items.npm" },
    { id: "workspaces", textKey: "keel.privacy.limits.items.workspaces" },
    { id: "overrides", textKey: "keel.privacy.limits.items.overrides" },
    { id: "changelog", textKey: "keel.privacy.limits.items.changelog" },
    { id: "imports", textKey: "keel.privacy.limits.items.imports" },
    { id: "verification", textKey: "keel.privacy.limits.items.verification" },
  ],
  stack: [
    "TypeScript",
    "VS Code API",
    "Vue 3",
    "Vite",
    "Node.js",
    "npm",
    "OSV",
    "Snyk API",
    "GitHub API",
    "GitHub CLI",
  ],
} as const satisfies KeelCaseStudy;
