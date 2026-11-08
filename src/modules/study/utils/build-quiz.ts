import type {
  QuizItem,
  QuizQuestion,
  QuizQuestionCopy,
} from "../types/quiz.types";

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const currentItem = shuffled[index];
    const swapItem = shuffled[swapIndex];
    if (currentItem === undefined || swapItem === undefined) continue;
    shuffled[index] = swapItem;
    shuffled[swapIndex] = currentItem;
  }
  return shuffled;
}

function pickUnseenFirst<T extends QuizQuestion>(
  pool: T[],
  seenIds: string[],
  count: number,
): T[] {
  const isSeen = (question: T) => seenIds.includes(question.id);
  return [
    ...shuffle(pool.filter((question) => !isSeen(question))),
    ...shuffle(pool.filter(isSeen)),
  ].slice(0, count);
}

export function buildQuiz(
  questions: QuizQuestion[],
  copy: Record<string, QuizQuestionCopy>,
  choiceCount: number,
  openCount: number,
  seenIds: string[] = [],
): QuizItem[] {
  const choiceItems = pickUnseenFirst(
    questions.filter((question) => question.kind === "choice"),
    seenIds,
    choiceCount,
  ).map((question) => ({
    ...question,
    optionIds: shuffle(Object.keys(copy[question.id]?.options ?? {})),
  }));
  const openItems = pickUnseenFirst(
    questions.filter((question) => question.kind === "open"),
    seenIds,
    openCount,
  );

  return [...choiceItems, ...openItems];
}

// Al agotar un tipo, su ronda vuelve a empezar sin contar las recién mostradas.
export function getNextSeenIds(
  questions: QuizQuestion[],
  seenIds: string[],
  quizIds: string[],
): string[] {
  const allSeen = new Set([...seenIds, ...quizIds]);
  const kinds: QuizQuestion["kind"][] = ["choice", "open"];

  return kinds.flatMap((kind) => {
    const poolIds = questions
      .filter((question) => question.kind === kind)
      .map((question) => question.id);
    const isExhausted = poolIds.every((id) => allSeen.has(id));
    return isExhausted
      ? poolIds.filter((id) => quizIds.includes(id))
      : poolIds.filter((id) => allSeen.has(id));
  });
}
