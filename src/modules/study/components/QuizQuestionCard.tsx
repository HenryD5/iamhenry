"use client";

import { Check, X } from "lucide-react";

import { AppCard } from "@/shared/components/app/AppCard";
import { UiField } from "@/shared/components/ui/UiField";
import { UiRadioGroup } from "@/shared/components/ui/UiRadioGroup";

import messages from "../locales/es.json";
import type {
  QuizChoiceItem,
  QuizItem,
  QuizQuestionCopy,
  QuizResult,
  QuizResultStatus,
} from "../types/quiz.types";

const STATUS_STYLES: Record<QuizResultStatus, string> = {
  correct: "bg-success-100 text-success-700",
  partial: "bg-warning-100 text-warning-700",
  incorrect: "bg-danger-100 text-danger-700",
};
const UNANSWERED_STYLE = "bg-warning-100 text-warning-700";

interface QuizQuestionCardProps {
  item: QuizItem;
  number: number;
  copy: QuizQuestionCopy;
  answer?: string;
  result?: QuizResult;
  isOverridden?: boolean;
  isMissing?: boolean;
  onAnswer: (id: string, value: string) => void;
  onToggleOverride: (id: string) => void;
}

function getOptionClassName(
  item: QuizChoiceItem,
  optionId: string,
  answer: string | undefined,
  isReviewed: boolean,
) {
  if (!isReviewed) return undefined;
  if (optionId === item.correctOptionId) {
    return "border-success-500 bg-success-100 text-success-700";
  }
  return optionId === answer
    ? "border-danger-500 bg-danger-100 text-danger-700"
    : "text-fg-muted";
}

export function QuizQuestionCard({
  item,
  number,
  copy,
  answer,
  result,
  isOverridden = false,
  isMissing = false,
  onAnswer,
  onToggleOverride,
}: QuizQuestionCardProps) {
  const isReviewed = Boolean(result);
  const isUnanswered = !answer?.trim();
  const status = isOverridden ? "correct" : result?.status;
  const shouldMarkUnanswered = isMissing || (isReviewed && isUnanswered);
  const questionLabel = messages.quiz.questionNumber.replace(
    "{number}",
    String(number),
  );

  return (
    <AppCard
      className={`grid gap-4 p-5 ${isMissing ? "outline-warning-500 outline-2" : ""}`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-caption text-fg-muted m-0 font-mono">
          {questionLabel} · {messages.topics[item.topic]}
        </p>
        {shouldMarkUnanswered || status ? (
          <span
            className={`text-caption rounded-full px-3 py-1 leading-none font-semibold ${
              shouldMarkUnanswered || !status
                ? UNANSWERED_STYLE
                : STATUS_STYLES[status]
            }`}
          >
            {shouldMarkUnanswered || !status
              ? messages.results.noAnswer
              : messages.results[status]}
          </span>
        ) : null}
      </div>

      {item.kind === "choice" ? (
        <UiRadioGroup
          label={copy.prompt}
          value={answer}
          isDisabled={isReviewed}
          onValueChange={(value) => onAnswer(item.id, value)}
          options={item.optionIds.map((optionId) => ({
            value: optionId,
            label: copy.options?.[optionId],
            className: getOptionClassName(item, optionId, answer, isReviewed),
          }))}
        />
      ) : (
        <>
          <p className="text-body m-0 leading-snug font-semibold">
            {copy.prompt}
          </p>
          {isReviewed ? (
            <div className="grid gap-1">
              <p className="text-caption text-fg-muted m-0 font-semibold">
                {messages.results.yourAnswer}
              </p>
              <p className="text-body-sm m-0 whitespace-pre-wrap">
                {answer?.trim() || messages.results.noAnswer}
              </p>
            </div>
          ) : (
            <UiField
              variant="textarea"
              label={messages.quiz.answerLabel}
              name={item.id}
              rows={4}
              value={answer ?? ""}
              placeholder={messages.quiz.answerPlaceholder}
              onChange={(event) => onAnswer(item.id, event.target.value)}
            />
          )}
        </>
      )}

      {result ? (
        <div className="bg-surface-sunken grid gap-3 rounded-sm p-4">
          <div className="grid gap-1">
            <p className="text-caption text-fg-muted m-0 font-semibold">
              {item.kind === "choice"
                ? messages.results.explanation
                : messages.results.modelAnswer}
            </p>
            <p className="text-body-sm m-0">{copy.explanation}</p>
          </div>

          {result.concepts.length > 0 ? (
            <div className="grid gap-2">
              <p className="text-caption text-fg-muted m-0 font-semibold">
                {messages.results.concepts}
              </p>
              <ul className="m-0 grid list-none gap-1 p-0">
                {result.concepts.map(({ label, isFound }) => (
                  <li
                    key={label}
                    className="text-body-sm flex items-center gap-2"
                  >
                    {isFound ? (
                      <Check
                        aria-hidden="true"
                        className="text-success-700 size-4 shrink-0"
                      />
                    ) : (
                      <X
                        aria-hidden="true"
                        className="text-danger-700 size-4 shrink-0"
                      />
                    )}
                    <span>
                      <span className="sr-only">
                        {isFound
                          ? messages.results.conceptFound
                          : messages.results.conceptMissing}
                        :{" "}
                      </span>
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {item.kind === "open" &&
          !isUnanswered &&
          result.status !== "correct" ? (
            <button
              type="button"
              className="btn btn--sm btn--outline justify-self-start"
              aria-pressed={isOverridden}
              onClick={() => onToggleOverride(item.id)}
            >
              {isOverridden
                ? messages.results.unmarkCorrect
                : messages.results.markCorrect}
            </button>
          ) : null}
        </div>
      ) : null}
    </AppCard>
  );
}
