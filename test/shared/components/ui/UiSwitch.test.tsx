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
});
