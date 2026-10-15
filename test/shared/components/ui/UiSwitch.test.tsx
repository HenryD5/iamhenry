import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UiSwitch } from "@/shared/components/ui/UiSwitch";
import { renderWithProviders } from "@/../test/utils/render";

describe("UiSwitch", () => {
  it("exposes its accessible name and reports a checked change", async () => {
    const onCheckedChange = vi.fn();
    renderWithProviders(
      <UiSwitch
        checked={false}
        onCheckedChange={onCheckedChange}
        label="Modo noche"
        checkedIcon={<span>Moon</span>}
        uncheckedIcon={<span>Sun</span>}
        thumbIcon={<span>Current</span>}
      />,
    );

    const toggle = screen.getByRole("switch", { name: "Modo noche" });
    expect(toggle).not.toBeChecked();
    await userEvent.click(toggle);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("renders the compact track and keeps its accessible name", () => {
    renderWithProviders(
      <UiSwitch
        checked={false}
        onCheckedChange={vi.fn()}
        label="Modo noche"
        checkedIcon={<span>Moon</span>}
        uncheckedIcon={<span>Sun</span>}
        thumbIcon={<span>Current</span>}
        isCompact
      />,
    );

    const toggle = screen.getByRole("switch", { name: "Modo noche" });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    expect(toggle.nextElementSibling).toHaveClass(
      "h-[var(--control-h-md)]",
      "w-19",
      "md:h-8",
      "md:w-14",
    );
  });
});
