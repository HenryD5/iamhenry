import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UiDialog } from "@/shared/components/ui/UiDialog";

describe("UiDialog", () => {
  it("applies backdropClassName to the backdrop", () => {
    render(
      <UiDialog
        open
        onOpenChange={() => undefined}
        title="Título ficticio"
        description="Descripción ficticia"
        closeLabel="Cerrar"
        backdropClassName="bg-(--dark-40)"
      >
        <p>Contenido</p>
      </UiDialog>,
    );

    const backdrop =
      screen.getByRole("dialog").parentElement?.previousElementSibling;
    expect(backdrop).toHaveClass("bg-(--dark-40)");
  });

  it("passes the light surface to every portal layer", () => {
    render(
      <UiDialog
        open
        onOpenChange={() => undefined}
        title="Título ficticio"
        description="Descripción ficticia"
        closeLabel="Cerrar"
        surface="light"
      >
        <p>Contenido</p>
      </UiDialog>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("data-surface", "light");
    expect(dialog.parentElement).toHaveAttribute("data-surface", "light");
    expect(dialog.parentElement?.previousElementSibling).toHaveAttribute(
      "data-surface",
      "light",
    );
  });
});
