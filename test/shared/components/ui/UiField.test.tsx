import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { UiField } from "@/shared/components/ui/UiField";

describe("UiField", () => {
  it.each([
    ["input", "textbox"],
    ["textarea", "textbox"],
  ] as const)("renders the %s variant", (variant, role) => {
    render(
      <UiField label={`Campo ${variant}`} name={variant} variant={variant} />,
    );

    expect(
      screen.getByRole(role, { name: `Campo ${variant}` }),
    ).toBeInTheDocument();
  });

  it("only renders the error when the field is invalid", () => {
    const { rerender } = render(
      <UiField label="Nombre" name="name" errorText="Error ficticio" />,
    );
    expect(screen.queryByText("Error ficticio")).not.toBeInTheDocument();

    rerender(
      <UiField
        label="Nombre"
        name="name"
        errorText="Error ficticio"
        isInvalid
      />,
    );
    expect(screen.getByText("Error ficticio")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Nombre" })).toBeInvalid();
  });

  it("links the visible error to the control and marks it invalid", () => {
    render(
      <UiField
        label="Nombre"
        name="name"
        errorText="Falta el nombre"
        isInvalid
      />,
    );

    const input = screen.getByRole("textbox", { name: "Nombre" });
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription("Falta el nombre");
  });

  it("renders the error with an icon hidden from assistive technology", () => {
    render(
      <UiField
        label="Nombre"
        name="name"
        errorText="Falta el nombre"
        isInvalid
      />,
    );

    const error = screen.getByText("Falta el nombre");
    const icon = error.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });
});
