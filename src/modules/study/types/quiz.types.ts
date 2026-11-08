export type QuizTopic = "nic21" | "niif11" | "niif3";

export interface QuizChoiceQuestion {
  id: string;
  kind: "choice";
  topic: QuizTopic;
  correctOptionId: string;
}

export interface QuizOpenQuestion {
  id: string;
  kind: "open";
  topic: QuizTopic;
  requiredConcepts: number;
}

export type QuizQuestion = QuizChoiceQuestion | QuizOpenQuestion;

export interface QuizConceptCopy {
  label: string;
  terms: string[];
}

export interface QuizQuestionCopy {
  prompt: string;
  explanation: string;
  options?: Record<string, string>;
  concepts?: QuizConceptCopy[];
}

export interface QuizChoiceItem extends QuizChoiceQuestion {
  optionIds: string[];
}

export type QuizItem = QuizChoiceItem | QuizOpenQuestion;

export type QuizAnswers = Record<string, string>;

export type QuizResultStatus = "correct" | "partial" | "incorrect";

export interface QuizConceptResult {
  label: string;
  isFound: boolean;
}

export interface QuizResult {
  status: QuizResultStatus;
  concepts: QuizConceptResult[];
}
