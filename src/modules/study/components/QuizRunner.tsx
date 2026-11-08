"use client";

import { AppCard } from "@/shared/components/app/AppCard";

import { QUIZ_CHOICE_COUNT, QUIZ_OPEN_COUNT } from "../content/quiz-questions";
import { getQuizCardId, quizCopy, useQuiz } from "../hooks/use-quiz";
import messages from "../locales/es.json";
import type { QuizResultStatus } from "../types/quiz.types";
import { getScore, gradeItem } from "../utils/grade-quiz";
import { QuizQuestionCard } from "./QuizQuestionCard";

function fillTemplate(template: string, values: Record<string, number>) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replace(`{${key}}`, String(value)),
    template,
  );
}

function getQuestionCopy(id: string) {
  const copy = quizCopy[id];
  if (!copy) throw new Error(`Missing quiz copy for "${id}".`);
  return copy;
}

export function QuizRunner() {
  const {
    stage,
    items,
    answers,
    overrides,
    isConfirming,
    answeredCount,
    handleStart,
    handleAnswer,
    handleSubmit,
    handleToggleOverride,
  } = useQuiz();

  if (stage === "intro") {
    return (
      <AppCard className="grid gap-4 p-5">
        <ul className="text-body-sm m-0 grid gap-1 pl-5">
          <li>
            {fillTemplate(messages.intro.choiceSummary, {
              count: QUIZ_CHOICE_COUNT,
            })}
          </li>
          <li>
            {fillTemplate(messages.intro.openSummary, {
              count: QUIZ_OPEN_COUNT,
            })}
          </li>
          <li>{messages.intro.review}</li>
        </ul>
        <button
          type="button"
          className="btn btn--md text-body justify-self-start font-semibold"
          onClick={handleStart}
        >
          {messages.intro.start}
        </button>
      </AppCard>
    );
  }

  const isReviewed = stage === "reviewed";
  const results = isReviewed
    ? Object.fromEntries(
        items.map((item) => [
          item.id,
          gradeItem(item, answers[item.id], getQuestionCopy(item.id)),
        ]),
      )
    : {};
  const statuses: QuizResultStatus[] = Object.entries(results).map(
    ([id, result]) => (overrides.includes(id) ? "correct" : result.status),
  );
  const countStatus = (status: QuizResultStatus) =>
    statuses.filter((current) => current === status).length;
  const unansweredCount = items.length - answeredCount;
  const choiceItems = items.filter((item) => item.kind === "choice");
  const openItems = items.filter((item) => item.kind === "open");

  const renderCards = (blockItems: typeof items, firstNumber: number) =>
    blockItems.map((item, index) => (
      <div key={item.id} id={getQuizCardId(item.id)}>
        <QuizQuestionCard
          item={item}
          number={firstNumber + index}
          copy={getQuestionCopy(item.id)}
          answer={answers[item.id]}
          result={results[item.id]}
          isOverridden={overrides.includes(item.id)}
          isMissing={isConfirming && !isReviewed && !answers[item.id]?.trim()}
          onAnswer={handleAnswer}
          onToggleOverride={handleToggleOverride}
        />
      </div>
    ));

  return (
    <div className="grid gap-8">
      {isReviewed ? (
        <AppCard className="grid gap-2 p-5">
          <h2 className="text-h4 m-0">{messages.results.title}</h2>
          <p className="text-h2 font-heading m-0 leading-none font-black">
            {messages.results.score
              .replace("{score}", String(getScore(statuses)))
              .replace("{total}", String(items.length))}
          </p>
          <p className="text-body-sm text-fg-muted m-0">
            {fillTemplate(messages.results.summary, {
              correct: countStatus("correct"),
              partial: countStatus("partial"),
              incorrect: countStatus("incorrect") - unansweredCount,
              unanswered: unansweredCount,
            })}
          </p>
          <p className="text-body-sm text-fg-muted m-0">
            {messages.results.openNotice}
          </p>
        </AppCard>
      ) : (
        <p
          className="bg-surface text-body-sm text-fg-muted sticky top-0 z-10 m-0 py-2"
          aria-live="polite"
        >
          {fillTemplate(messages.quiz.progress, {
            answered: answeredCount,
            total: items.length,
          })}
        </p>
      )}

      <section className="grid gap-4" aria-labelledby="quiz-choice-block">
        <h2 id="quiz-choice-block" className="text-h5 m-0">
          {messages.blocks.choice}
        </h2>
        {renderCards(choiceItems, 1)}
      </section>

      <section className="grid gap-4" aria-labelledby="quiz-open-block">
        <h2 id="quiz-open-block" className="text-h5 m-0">
          {messages.blocks.open}
        </h2>
        {renderCards(openItems, choiceItems.length + 1)}
      </section>

      {isReviewed ? (
        <button
          type="button"
          className="btn btn--md text-body justify-self-start font-semibold"
          onClick={handleStart}
        >
          {messages.results.restart}
        </button>
      ) : (
        <div className="grid gap-3">
          <div role="alert" className="text-body-sm">
            {isConfirming && answeredCount < items.length
              ? fillTemplate(messages.quiz.unanswered, {
                  count: items.length - answeredCount,
                })
              : ""}
          </div>
          <button
            type="button"
            className="btn btn--md text-body justify-self-start font-semibold"
            onClick={handleSubmit}
          >
            {isConfirming && answeredCount < items.length
              ? messages.quiz.confirmSubmit
              : messages.quiz.submit}
          </button>
        </div>
      )}
    </div>
  );
}
