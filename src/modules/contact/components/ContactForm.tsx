"use client";

import Script from "next/script";

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

const STATUS_MESSAGES = {
  sent: messages.form.status.sent,
  invalid: messages.form.status.invalid,
  challenge_failed: messages.form.status.challengeFailed,
  unavailable: messages.form.status.unavailable,
} as const;

export function ContactForm() {
  const {
    status,
    isSending,
    isUnavailable,
    fieldErrors,
    values,
    formAction,
    turnstileContainerRef,
    renderTurnstile,
  } = useContactForm({ siteKey: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY });

  const getError = (field: ContactFieldName) => {
    const key: ContactFieldErrorKey | undefined = fieldErrors[field];
    return key ? messages.form.errors[field][key] : undefined;
  };

  const feedback =
    status === "idle"
      ? ""
      : status === "sending"
        ? messages.form.sending
        : STATUS_MESSAGES[status];
  const isFeedbackAlert =
    status !== "idle" && status !== "sending" && status !== "sent";

  return (
    <form
      action={formAction}
      className="grid gap-4"
      aria-busy={isSending}
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

      {/* Regiones vivas siempre montadas: solo cambia su contenido. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="text-body"
      >
        {isFeedbackAlert ? "" : feedback}
      </div>
      <div
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className="text-body"
      >
        {isFeedbackAlert ? feedback : ""}
      </div>

      <button
        type="submit"
        className="btn btn--md text-body mt-2 font-semibold"
        disabled={isSending || isUnavailable}
      >
        {isSending ? messages.form.sending : messages.form.submit}
      </button>
    </form>
  );
}
