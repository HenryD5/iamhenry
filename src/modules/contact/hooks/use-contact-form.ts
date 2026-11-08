"use client";

import { useActionState, useEffect, useRef } from "react";

import { showUiToast } from "@/shared/components/ui/UiToast";

import { sendContactMessage } from "../actions/send-contact";
import type { ContactFieldErrors, ContactStatus } from "../types/contact.types";
import messages from "../locales/es.json";
import { useTurnstile } from "./use-turnstile";

export type ContactFormStatus = "idle" | "sending" | ContactStatus;

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface ContactFormState {
  status: ContactStatus | "idle";
  fieldErrors?: ContactFieldErrors;
  values?: ContactFormValues;
}

const INITIAL_STATE: ContactFormState = { status: "idle" };

const readText = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

interface UseContactFormOptions {
  siteKey?: string;
  onSent?: () => void;
  onSendingChange?: (isSending: boolean) => void;
}

const TOAST_SUCCESS_MS = 4000;
const TOAST_ERROR_MS = 6000;

const TOAST_MESSAGES = {
  sent: messages.form.toast.sent,
  invalid: messages.form.toast.invalid,
  challenge_failed: messages.form.toast.challengeFailed,
  unavailable: messages.form.toast.unavailable,
} as const;

export function useContactForm({
  siteKey,
  onSent,
  onSendingChange,
}: UseContactFormOptions) {
  // Se fija al montar en el cliente, nunca en build: un valor horneado en el
  // HTML estático caducaría (la acción exige 3 s a 2 h). Sin JavaScript no se
  // envía startedAt ni token de Turnstile, y la acción no puede validar el envío.
  const startedAtRef = useRef<number | null>(null);
  const turnstile = useTurnstile(siteKey);
  const { resetWidget } = turnstile;

  useEffect(() => {
    startedAtRef.current = Date.now();
  }, []);

  const [state, formAction, isPending] = useActionState(
    async (
      previousState: ContactFormState,
      formData: FormData,
    ): Promise<ContactFormState> => {
      void previousState;
      formData.set("startedAt", String(startedAtRef.current ?? ""));

      const result = await sendContactMessage(null, formData);

      return {
        ...result,
        values: {
          name: readText(formData, "name"),
          email: readText(formData, "email"),
          message: readText(formData, "message"),
        },
      };
    },
    INITIAL_STATE,
  );

  useEffect(() => {
    if (state.status !== "idle" && state.status !== "sent") {
      resetWidget();
    }
  }, [state, resetWidget]);

  const onSentRef = useRef(onSent);
  const onSendingChangeRef = useRef(onSendingChange);

  useEffect(() => {
    onSentRef.current = onSent;
    onSendingChangeRef.current = onSendingChange;
  });

  useEffect(() => {
    onSendingChangeRef.current?.(isPending);
  }, [isPending]);

  useEffect(() => {
    if (state.status === "idle") return;
    const { title, description } = TOAST_MESSAGES[state.status];
    const isSent = state.status === "sent";
    // Fuera del commit de React: el toaster de Ark usa flushSync al crear el
    // toast y React no lo admite dentro de un efecto.
    queueMicrotask(() => {
      showUiToast({
        type: isSent ? "success" : "error",
        title,
        description,
        duration: isSent ? TOAST_SUCCESS_MS : TOAST_ERROR_MS,
      });
    });
    if (isSent) onSentRef.current?.();
  }, [state]);

  const isUnavailable = !siteKey;
  const status: ContactFormStatus = isPending ? "sending" : state.status;

  return {
    status,
    isSending: isPending,
    isUnavailable,
    fieldErrors: state.fieldErrors ?? {},
    values: state.status === "sent" ? undefined : state.values,
    formAction,
    turnstileContainerRef: turnstile.containerRef,
    renderTurnstile: turnstile.renderWidget,
  };
}
