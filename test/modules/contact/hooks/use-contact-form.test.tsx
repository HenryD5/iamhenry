import { act, renderHook, waitFor } from "@testing-library/react";
import { startTransition } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useContactForm } from "@/modules/contact/hooks/use-contact-form";
import messages from "@/modules/contact/locales/es.json";

const { sendMock, showToastMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
  showToastMock: vi.fn(),
}));

vi.mock("@/modules/contact/actions/send-contact", () => ({
  sendContactMessage: sendMock,
}));

vi.mock("@/shared/components/ui/UiToast", () => ({
  showUiToast: showToastMock,
}));

const buildFormData = () => {
  const formData = new FormData();
  formData.set("name", "Ana");
  formData.set("email", "ana@example.com");
  formData.set("message", "Mensaje de prueba largo");
  return formData;
};

describe("useContactForm", () => {
  beforeEach(() => {
    sendMock.mockReset();
    showToastMock.mockReset();
  });

  it("shows no toast and does not close before submitting", () => {
    const onSent = vi.fn();
    renderHook(() => useContactForm({ siteKey: "key", onSent }));

    expect(showToastMock).not.toHaveBeenCalled();
    expect(onSent).not.toHaveBeenCalled();
  });

  it("shows a success toast, calls onSent and clears the values after a sent result", async () => {
    sendMock.mockResolvedValue({ status: "sent" });
    const onSent = vi.fn();
    const { result } = renderHook(() =>
      useContactForm({ siteKey: "key", onSent }),
    );

    await act(async () => {
      result.current.formAction(buildFormData());
    });

    await waitFor(() => expect(onSent).toHaveBeenCalledTimes(1));
    expect(showToastMock).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "success",
        title: messages.form.toast.sent.title,
        description: messages.form.toast.sent.description,
        duration: 4000,
      }),
    );
    expect(result.current.values).toBeUndefined();
  });

  it.each([
    ["invalid", messages.form.toast.invalid],
    ["challenge_failed", messages.form.toast.challengeFailed],
    ["unavailable", messages.form.toast.unavailable],
  ] as const)(
    "shows an error toast for %s, keeps the dialog open and keeps the values",
    async (status, toast) => {
      sendMock.mockResolvedValue({ status });
      const onSent = vi.fn();
      const { result } = renderHook(() =>
        useContactForm({ siteKey: "key", onSent }),
      );

      await act(async () => {
        result.current.formAction(buildFormData());
      });

      await waitFor(() => expect(showToastMock).toHaveBeenCalledTimes(1));
      expect(showToastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
          title: toast.title,
          description: toast.description,
          duration: 6000,
        }),
      );
      expect(onSent).not.toHaveBeenCalled();
      expect(result.current.values).toEqual({
        name: "Ana",
        email: "ana@example.com",
        message: "Mensaje de prueba largo",
      });
    },
  );

  it("reports the sending state changes", async () => {
    let resolveSend: (value: { status: "sent" }) => void = () => undefined;
    sendMock.mockReturnValue(
      new Promise((resolve) => {
        resolveSend = resolve;
      }),
    );
    const onSendingChange = vi.fn();
    const { result } = renderHook(() =>
      useContactForm({ siteKey: "key", onSendingChange }),
    );

    await act(async () => {
      startTransition(() => result.current.formAction(buildFormData()));
    });
    await waitFor(() => expect(onSendingChange).toHaveBeenLastCalledWith(true));

    await act(async () => resolveSend({ status: "sent" }));
    await waitFor(() =>
      expect(onSendingChange).toHaveBeenLastCalledWith(false),
    );
  });
});
