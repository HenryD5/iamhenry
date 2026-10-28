import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ContactDialogTrigger } from "@/modules/contact/components/ContactDialogTrigger";

vi.mock("@/modules/contact/components/ContactDialog", () => ({
  ["ContactDialog"]: ({ isOpen }: { isOpen: boolean }) => (
    <div data-testid="contact-dialog" data-open={isOpen} />
  ),
}));

describe("ContactDialogTrigger", () => {
  it("falls back to the contact page without a topic", () => {
    render(<ContactDialogTrigger>Contactar</ContactDialogTrigger>);

    expect(screen.getByRole("link", { name: "Contactar" })).toHaveAttribute(
      "href",
      "/contacto",
    );
  });

  it("opens the dialog when JavaScript handles the click", async () => {
    render(<ContactDialogTrigger>Contactar</ContactDialogTrigger>);

    expect(screen.getByTestId("contact-dialog")).toHaveAttribute(
      "data-open",
      "false",
    );
    await userEvent.click(screen.getByRole("link", { name: "Contactar" }));
    expect(screen.getByTestId("contact-dialog")).toHaveAttribute(
      "data-open",
      "true",
    );
  });
});
