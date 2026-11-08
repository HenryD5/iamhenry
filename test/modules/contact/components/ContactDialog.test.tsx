import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactDialog } from "@/modules/contact/components/ContactDialog";
import messages from "@/modules/contact/locales/es.json";

vi.mock("@/modules/contact/components/ContactForm", () => ({
  ["ContactForm"]: ({
    onSent,
    onSendingChange,
  }: {
    onSent: () => void;
    onSendingChange: (isSending: boolean) => void;
  }) => (
    <div>
      <button type="button" onClick={onSent}>
        simular envío correcto
      </button>
      <button type="button" onClick={() => onSendingChange(true)}>
        simular envío en curso
      </button>
    </div>
  ),
}));

describe("ContactDialog", () => {
  it("closes after a successful send", async () => {
    const onOpenChange = vi.fn();
    render(<ContactDialog isOpen onOpenChange={onOpenChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: "simular envío correcto" }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("closes from the close control when nothing is being sent", async () => {
    const onOpenChange = vi.fn();
    render(<ContactDialog isOpen onOpenChange={onOpenChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: messages.dialog.closeLabel }),
    );

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("blocks closing while a send is in progress", async () => {
    const onOpenChange = vi.fn();
    render(<ContactDialog isOpen onOpenChange={onOpenChange} />);

    await userEvent.click(
      screen.getByRole("button", { name: "simular envío en curso" }),
    );
    await userEvent.click(
      screen.getByRole("button", { name: messages.dialog.closeLabel }),
    );

    expect(onOpenChange).not.toHaveBeenCalled();
  });
});
