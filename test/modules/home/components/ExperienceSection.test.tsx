import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { ExperienceSection } from "@/modules/home/components/ExperienceSection";

vi.mock("next-intl/server", () => ({
  getTranslations: async () => (key: string) => key,
}));

describe("ExperienceSection", () => {
  it("renders the figures, current role and server-mounted journey", async () => {
    const section = await ExperienceSection();
    const serverHtml = renderToStaticMarkup(section);
    render(section);

    expect(screen.getByText("+5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    const trigger = screen.getByRole("button", {
      name: "experience.journeyAction",
    });
    expect(trigger).toBeInTheDocument();
    expect(screen.getAllByText("Metrica · Culqi")).toHaveLength(2);
    expect(
      screen.getByText("experience.stages.bluex.title"),
    ).toBeInTheDocument();
    expect(screen.getByText("experience.education")).toBeInTheDocument();
    expect(serverHtml).toContain('data-motion-item="experience-journey"');
    expect(serverHtml).toContain("experience.stages.bluex.title");

    fireEvent.click(trigger);
    expect(
      await screen.findByRole("dialog", { name: "experience.journeyTitle" }),
    ).toBeVisible();
    fireEvent.click(
      screen.getByRole("button", { name: "experience.journeyClose" }),
    );
    await waitFor(() => expect(trigger).toHaveFocus());
  });
});
