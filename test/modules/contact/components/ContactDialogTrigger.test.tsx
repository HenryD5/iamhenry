import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactDialogTrigger } from "@/modules/contact/components/ContactDialogTrigger";

vi.mock("@/modules/contact/components/ContactDialog", () => ({
  ["ContactDialog"]: ({
    isOpen,
    onOpenChange,
  }: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
  }) => (
    <div data-testid="contact-dialog" data-open={isOpen}>
      <button type="button" onClick={() => onOpenChange(false)}>
        cerrar
      </button>
    </div>
  ),
}));

describe("ContactDialogTrigger", () => {
  it("renders the contact trigger as a button without an href", () => {
    render(<ContactDialogTrigger>Contactar</ContactDialogTrigger>);

    const trigger = screen.getByRole("button", { name: "Contactar" });
    expect(trigger).toHaveAttribute("type", "button");
    expect(trigger).not.toHaveAttribute("href");
  });

  it("opens the dialog when JavaScript handles the click", async () => {
    render(<ContactDialogTrigger>Contactar</ContactDialogTrigger>);

    expect(screen.getByTestId("contact-dialog")).toHaveAttribute(
      "data-open",
      "false",
    );
    await userEvent.click(screen.getByRole("button", { name: "Contactar" }));
    expect(screen.getByTestId("contact-dialog")).toHaveAttribute(
      "data-open",
      "true",
    );
  });

  it("does not navigate when JavaScript opens the dialog and closes it again", async () => {
    render(<ContactDialogTrigger>Contactar</ContactDialogTrigger>);
    const initialLocation = window.location.href;

    await userEvent.click(screen.getByRole("button", { name: "Contactar" }));
    await userEvent.click(screen.getByRole("button", { name: "cerrar" }));

    expect(screen.getByTestId("contact-dialog")).toHaveAttribute(
      "data-open",
      "false",
    );
    expect(window.location.href).toBe(initialLocation);
  });
});
