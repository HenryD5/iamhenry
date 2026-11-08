"use client";

import { LoaderCircle } from "lucide-react";
import Script from "next/script";
import { type FormEvent, useState } from "react";

import { UiField } from "@/shared/components/ui/UiField";
import { env } from "@/shared/utils/env";

import { TURNSTILE_SCRIPT_SRC } from "../hooks/use-turnstile";
import { useContactForm } from "../hooks/use-contact-form";
import messages from "../locales/es.json";
import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
} from "../schemas/contact.schema";
import type {
  ContactFieldErrorKey,
  ContactFieldName,
} from "../types/contact.types";

const REQUIRED_FIELDS: readonly ContactFieldName[] = [
  "name",
  "email",
  "message",
];

type ContactFormValues = Partial<Record<ContactFieldName, string>>;

const hasAllRequired = (values: ContactFormValues | undefined): boolean =>
  REQUIRED_FIELDS.every((field) => (values?.[field] ?? "").trim().length > 0);

interface ContactFormProps {
  onSent?: () => void;
  onSendingChange?: (isSending: boolean) => void;
}

export function ContactForm({ onSent, onSendingChange }: ContactFormProps) {
  const {
    isSending,
    isUnavailable,
    fieldErrors,
    values,
    formAction,
    turnstileContainerRef,
    renderTurnstile,
  } = useContactForm({
    siteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    onSent,
    onSendingChange,
  });

  // El botón de enviar se habilita solo cuando los tres campos tienen texto.
  // Tras un error, el formulario se rellena con los valores enviados.
  const [isComplete, setIsComplete] = useState(() => hasAllRequired(values));
  const [previousValues, setPreviousValues] = useState(values);

  if (values !== previousValues) {
    setPreviousValues(values);
    setIsComplete(hasAllRequired(values));
  }

  const handleInput = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget);
    setIsComplete(
      hasAllRequired({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        message: String(formData.get("message") ?? ""),
      }),
    );
  };

  const getError = (field: ContactFieldName) => {
    const key: ContactFieldErrorKey | undefined = fieldErrors[field];
    return key ? messages.form.errors[field][key] : undefined;
  };

  return (
    <form
      action={formAction}
      className="grid gap-4"
      aria-busy={isSending}
      onInput={handleInput}
      noValidate
    >
      <UiField
        label={messages.form.fields.name.label}
        name="name"
        type="text"
        autoComplete="name"
        placeholder={messages.form.fields.name.placeholder}
        defaultValue={values?.name}
        isRequired
        isInvalid={Boolean(getError("name"))}
        errorText={getError("name")}
        maxLength={NAME_MAX_LENGTH}
        isDisabled={isSending}
      />
      <UiField
        label={messages.form.fields.email.label}
        name="email"
        type="email"
        autoComplete="email"
        placeholder={messages.form.fields.email.placeholder}
        defaultValue={values?.email}
        isRequired
        isInvalid={Boolean(getError("email"))}
        errorText={getError("email")}
        maxLength={EMAIL_MAX_LENGTH}
        isDisabled={isSending}
      />
      <UiField
        variant="textarea"
        label={messages.form.fields.message.label}
        name="message"
        rows={5}
        placeholder={messages.form.fields.message.placeholder}
        defaultValue={values?.message}
        isRequired
        isInvalid={Boolean(getError("message"))}
        errorText={getError("message")}
        maxLength={MESSAGE_MAX_LENGTH}
        isDisabled={isSending}
      />

      {/* Honeypot: fuera de pantalla, sin foco ni lectura por lector de pantalla. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] size-px overflow-hidden opacity-0"
      >
        <label htmlFor="contact-website">{messages.form.honeypotLabel}</label>
        <input
          id="contact-website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>

      {isUnavailable ? null : (
        <>
          <div ref={turnstileContainerRef} />
          <Script
            src={TURNSTILE_SCRIPT_SRC}
            strategy="afterInteractive"
            onReady={() => renderTurnstile()}
          />
        </>
      )}

      <button
        type="submit"
        className="btn btn--md text-body mt-2 inline-flex items-center justify-center gap-2 font-semibold"
        disabled={isSending || isUnavailable || !isComplete}
      >
        {isSending ? (
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin motion-reduce:animate-none"
          />
        ) : null}
        {isSending ? messages.form.sending : messages.form.submit}
      </button>
    </form>
  );
}
