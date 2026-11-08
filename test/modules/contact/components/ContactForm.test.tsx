import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/modules/contact/components/ContactForm";
import messages from "@/modules/contact/locales/es.json";

const { useContactFormMock } = vi.hoisted(() => ({
  useContactFormMock: vi.fn(),
}));

vi.mock("@/modules/contact/actions/send-contact", () => ({
  sendContactMessage: vi.fn(),
}));

vi.mock("@/modules/contact/hooks/use-contact-form", () => ({
  useContactForm: useContactFormMock,
}));

vi.mock("@/shared/utils/env", () => ({
  env: { NEXT_PUBLIC_TURNSTILE_SITE_KEY: undefined },
}));

vi.mock("next/script", () => ({
  default: ({ src }: { src: string }) => (
    <span data-testid="script" data-src={src} />
  ),
}));

const baseHookResult = {
  status: "idle",
  isSending: false,
  isUnavailable: false,
  fieldErrors: {},
  values: undefined,
  formAction: vi.fn(),
  turnstileContainerRef: { current: null },
  renderTurnstile: vi.fn(),
};

describe("ContactForm", () => {
  beforeEach(() => {
    useContactFormMock.mockReturnValue(baseHookResult);
  });

  it("renders the idle form and accessible honeypot safeguards without live feedback regions", () => {
    const { container } = render(<ContactForm />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.getByTestId("script")).toBeInTheDocument();

    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="website"]',
    );
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it.each(["sent", "invalid", "challenge_failed", "unavailable"] as const)(
    "does not render the %s result inline (it goes to the toast)",
    (status) => {
      useContactFormMock.mockReturnValue({ ...baseHookResult, status });
      render(<ContactForm />);

      expect(screen.queryByRole("status")).not.toBeInTheDocument();
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
      Object.values(messages.form.toast).forEach(({ title, description }) => {
        expect(screen.queryByText(title)).not.toBeInTheDocument();
        expect(screen.queryByText(description)).not.toBeInTheDocument();
      });
    },
  );

  it("forwards the sent and sending callbacks to the form hook", () => {
    const onSent = vi.fn();
    const onSendingChange = vi.fn();
    render(<ContactForm onSent={onSent} onSendingChange={onSendingChange} />);

    expect(useContactFormMock).toHaveBeenCalledWith(
      expect.objectContaining({ onSent, onSendingChange }),
    );
  });

  it("shows field errors with their specific message and marks the field invalid", () => {
    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "invalid",
      fieldErrors: { name: "required" },
    });
    render(<ContactForm />);

    expect(screen.getByRole("textbox", { name: /^nombre/i })).toBeInvalid();
    expect(
      screen.getByText(messages.form.errors.name.required),
    ).toBeInTheDocument();
  });

  it("keeps the typed values after a failed attempt and clears them after success", () => {
    const values = { name: "Ana", email: "ana@example.com", message: "Hola" };
    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "challenge_failed",
      values,
    });
    const { unmount } = render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /^nombre/i })).toHaveValue(
      "Ana",
    );
    unmount();

    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "sent",
      values: undefined,
    });
    render(<ContactForm />);
    expect(screen.getByRole("textbox", { name: /^nombre/i })).toHaveValue("");
  });

  it("disables submission while sending", () => {
    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "sending",
      isSending: true,
    });
    render(<ContactForm />);

    expect(
      screen.getByRole("button", { name: messages.form.sending }),
    ).toBeDisabled();
  });

  it("disables submission without a site key and skips the widget", () => {
    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "idle",
      isUnavailable: true,
    });
    render(<ContactForm />);

    expect(screen.queryByTestId("script")).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: messages.form.submit }),
    ).toBeDisabled();
  });

  it("has no topic select and leaves the message empty", () => {
    const { container } = render(<ContactForm />);

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(container.querySelector('[name="topic"]')).toBeNull();
    expect(screen.getByRole("textbox", { name: /^mensaje/i })).toHaveValue("");
  });
});
