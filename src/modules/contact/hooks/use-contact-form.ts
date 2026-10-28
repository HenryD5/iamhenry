"use client";

import { useActionState, useEffect, useRef } from "react";

import { sendContactMessage } from "../actions/send-contact";
import type { ContactFieldErrors, ContactStatus } from "../types/contact.types";
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
}

export function useContactForm({ siteKey }: UseContactFormOptions) {
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

  const isUnavailable = !siteKey;
  const status: ContactFormStatus = isPending ? "sending" : state.status;

  return {
    status,
    isSending: isPending,
    isUnavailable,
    fieldErrors: state.fieldErrors ?? {},
    values: state.values,
    formAction,
    turnstileContainerRef: turnstile.containerRef,
    renderTurnstile: turnstile.renderWidget,
  };
}
