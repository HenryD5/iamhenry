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

  it("renders the idle form, accessible honeypot safeguards and live regions", () => {
    const { container } = render(<ContactForm />);

    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(screen.getByRole("alert")).toBeEmptyDOMElement();
    expect(screen.getByTestId("script")).toBeInTheDocument();

    const honeypot = container.querySelector<HTMLInputElement>(
      'input[name="website"]',
    );
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.parentElement).toHaveAttribute("aria-hidden", "true");
  });

  it.each([
    ["sent", "status", messages.form.status.sent],
    ["invalid", "alert", messages.form.status.invalid],
    ["challenge_failed", "alert", messages.form.status.challengeFailed],
  ] as const)(
    "shows the %s feedback in the expected live region",
    (status, role, message) => {
      useContactFormMock.mockReturnValue({ ...baseHookResult, status });
      render(<ContactForm />);

      expect(screen.getByRole(role)).toHaveTextContent(message);
    },
  );

  it("announces sending and disables submission", () => {
    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "sending",
      isSending: true,
    });
    render(<ContactForm />);

    expect(screen.getByRole("status")).toHaveTextContent(messages.form.sending);
    expect(
      screen.getByRole("button", { name: messages.form.sending }),
    ).toBeDisabled();
  });

  it("disables submission without a site key, skips the widget and shows no unavailable message", () => {
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
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
    expect(screen.getByRole("alert")).toBeEmptyDOMElement();
    expect(
      screen.queryByText(messages.form.status.unavailable),
    ).not.toBeInTheDocument();
  });

  it("shows the unavailable message when the action reports unavailable", () => {
    useContactFormMock.mockReturnValue({
      ...baseHookResult,
      status: "unavailable",
      isUnavailable: false,
    });
    render(<ContactForm />);

    expect(screen.getByRole("alert")).toHaveTextContent(
      messages.form.status.unavailable,
    );
  });

  it("has no topic select and leaves the message empty", () => {
    const { container } = render(<ContactForm />);

    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(container.querySelector('[name="topic"]')).toBeNull();
    expect(screen.getByRole("textbox", { name: /^mensaje/i })).toHaveValue("");
  });
});
