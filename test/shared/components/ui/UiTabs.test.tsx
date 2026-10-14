import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { UiTabs } from "@/shared/components/ui/UiTabs";
import { renderWithProviders } from "@/../test/utils/render";

describe("UiTabs", () => {
  it("reports the selected value", async () => {
    const onValueChange = vi.fn();
    renderWithProviders(<UiTabs ariaLabel="Stages" value="one" onValueChange={onValueChange} items={[{ value: "one", label: "One", content: <p>First</p> }, { value: "two", label: "Two", content: <p>Second</p> }]} />);
    await userEvent.click(screen.getByRole("tab", { name: "Two" }));
    expect(onValueChange).toHaveBeenCalledWith("two");
  });
});
