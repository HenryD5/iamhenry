import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/shared/layouts/SiteLayout", () => ({
  ["SiteLayout"]: ({
    children,
    floatingContactTrigger,
  }: {
    children: React.ReactNode;
    floatingContactTrigger: React.ReactNode;
  }) => (
    <>
      {children}
      {floatingContactTrigger}
    </>
  ),
}));

vi.mock("@/modules/not-found/views/NotFoundView", () => ({
  ["NotFoundView"]: ({ header }: { header: React.ReactNode }) => <>{header}</>,
}));

vi.mock("@/modules/contact/views/ContactAppHeaderView", () => ({
  ["ContactAppHeaderView"]: () => <header>Cabecera</header>,
}));

vi.mock("@/shared/components/app/AppContactIcon", () => ({
  ["AppContactIcon"]: () => null,
}));

vi.mock("@/modules/contact/components/ContactDialog", () => ({
  ["ContactDialog"]: ({ isOpen }: { isOpen: boolean }) => (
    <div role="dialog" data-open={isOpen} />
  ),
}));

import NotFound from "@/app/not-found";

describe("not-found", () => {
  it("opens the contact dialog from the floating trigger", async () => {
    render(<NotFound />);

    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toHaveAttribute("data-open", "false");

    await userEvent.click(screen.getByRole("button", { name: "Hablemos" }));

    expect(dialog).toHaveAttribute("data-open", "true");
  });
});
