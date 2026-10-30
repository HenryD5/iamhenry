import type {
  QuizItem,
  QuizQuestionCopy,
  QuizResult,
  QuizResultStatus,
} from "../types/quiz.types";

const PARTIAL_SCORE = 0.5;

export function normalizeAnswer(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/(\d)[\s.,](?=\d{3}(?!\d))/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function hasTerm(answer: string, term: string): boolean {
  // Un número no debe coincidir dentro de otro: 200 no vale en 1200.
  if (/^\d+$/.test(term)) {
    return new RegExp(`(?<![\\d.,])${term}(?![\\d])`).test(answer);
  }
  return answer.includes(term);
}

export function gradeItem(
  item: QuizItem,
  answer: string | undefined,
  copy: QuizQuestionCopy,
): QuizResult {
  if (item.kind === "choice") {
    return {
      status: answer === item.correctOptionId ? "correct" : "incorrect",
      concepts: [],
    };
  }

  const normalized = normalizeAnswer(answer ?? "");
  const concepts = (copy.concepts ?? []).map(({ label, terms }) => ({
    label,
    isFound:
      normalized.length > 0 &&
      terms.some((term) => hasTerm(normalized, normalizeAnswer(term))),
  }));
  const foundCount = concepts.filter((concept) => concept.isFound).length;
  const status: QuizResultStatus =
    foundCount >= item.requiredConcepts
      ? "correct"
      : foundCount > 0
        ? "partial"
        : "incorrect";

  return { status, concepts };
}

export function getScore(statuses: QuizResultStatus[]): number {
  return statuses.reduce(
    (score, status) =>
      score +
      (status === "correct" ? 1 : status === "partial" ? PARTIAL_SCORE : 0),
    0,
  );
}
