import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppThemeSwitch } from "@/shared/components/app/AppThemeSwitch";
import { renderWithProviders } from "@/../test/utils/render";

describe("AppThemeSwitch", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("toggles night mode through its accessible switch", async () => {
    renderWithProviders(<AppThemeSwitch label="Modo noche" />);
    const toggle = screen.getByRole("switch", { name: "Modo noche" });
    await waitFor(() => expect(toggle).toBeEnabled());

    await userEvent.click(toggle);
    expect(toggle).toBeChecked();
    expect(document.documentElement).toHaveAttribute("data-theme", "night");
    expect(localStorage.getItem("theme")).toBe("night");

    await userEvent.click(toggle);
    expect(toggle).not.toBeChecked();
    expect(document.documentElement).not.toHaveAttribute("data-theme");
    expect(localStorage.getItem("theme")).toBe("day");
  });
});
