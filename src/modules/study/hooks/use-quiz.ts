"use client";

import { useState } from "react";

import {
  QUIZ_CHOICE_COUNT,
  QUIZ_OPEN_COUNT,
  QUIZ_QUESTIONS,
} from "../content/quiz-questions";
import messages from "../locales/es.json";
import type {
  QuizAnswers,
  QuizItem,
  QuizQuestionCopy,
} from "../types/quiz.types";
import { buildQuiz, getNextSeenIds } from "../utils/build-quiz";
import { readSeenIds, writeSeenIds } from "../utils/quiz-history";

type QuizStage = "intro" | "answering" | "reviewed";

export const quizCopy: Record<string, QuizQuestionCopy> = messages.questions;

export function getQuizCardId(id: string) {
  return `quiz-question-${id}`;
}

export function useQuiz() {
  const [stage, setStage] = useState<QuizStage>("intro");
  const [items, setItems] = useState<QuizItem[]>([]);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [overrides, setOverrides] = useState<string[]>([]);
  const [isConfirming, setIsConfirming] = useState(false);

  const answeredCount = items.filter((item) => answers[item.id]?.trim()).length;

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "instant" });

  const handleStart = () => {
    const seenIds = readSeenIds();
    const nextItems = buildQuiz(
      QUIZ_QUESTIONS,
      quizCopy,
      QUIZ_CHOICE_COUNT,
      QUIZ_OPEN_COUNT,
      seenIds,
    );
    writeSeenIds(
      getNextSeenIds(
        QUIZ_QUESTIONS,
        seenIds,
        nextItems.map((item) => item.id),
      ),
    );
    setItems(nextItems);
    setAnswers({});
    setOverrides([]);
    setIsConfirming(false);
    setStage("answering");
    scrollToTop();
  };

  const handleAnswer = (id: string, value: string) => {
    setAnswers((current) => ({ ...current, [id]: value }));
  };

  const handleSubmit = () => {
    if (answeredCount < items.length && !isConfirming) {
      setIsConfirming(true);
      const firstMissing = items.find((item) => !answers[item.id]?.trim());
      if (firstMissing) {
        document
          .getElementById(getQuizCardId(firstMissing.id))
          ?.scrollIntoView({ behavior: "instant", block: "center" });
      }
      return;
    }
    setStage("reviewed");
    scrollToTop();
  };

  const handleToggleOverride = (id: string) => {
    setOverrides((current) =>
      current.includes(id)
        ? current.filter((overrideId) => overrideId !== id)
        : [...current, id],
    );
  };

  return {
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
  };
}
