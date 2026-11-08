import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import {
  showUiToast,
  uiToaster,
  UiToaster,
} from "@/shared/components/ui/UiToast";

const renderToaster = () =>
  render(<UiToaster label="Avisos" closeLabel="Cerrar aviso" />);

describe("UiToast", () => {
  afterEach(() => {
    act(() => uiToaster.dismiss());
  });

  it("renders an error toast as an alert with title, description and close control", async () => {
    renderToaster();

    act(() => {
      showUiToast({
        type: "error",
        title: "Título de error",
        description: "Descripción de error",
        duration: 60000,
      });
    });

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Título de error");
    expect(alert).toHaveTextContent("Descripción de error");
    expect(
      screen.getByRole("button", { name: "Cerrar aviso" }),
    ).toBeInTheDocument();
  });

  it("renders a success toast without the alert role", async () => {
    renderToaster();

    act(() => {
      showUiToast({
        type: "success",
        title: "Título de éxito",
        description: "Descripción de éxito",
        duration: 60000,
      });
    });

    const title = await screen.findByText("Título de éxito");
    expect(screen.getByText("Descripción de éxito")).toBeInTheDocument();
    expect(title.closest('[role="alert"]')).toBeNull();
  });

  it("dismisses the toast with the close control", async () => {
    renderToaster();

    act(() => {
      showUiToast({
        type: "error",
        title: "Cerrable",
        description: "Se puede cerrar",
        duration: 60000,
      });
    });

    const toastRoot = (await screen.findByText("Cerrable")).parentElement;
    await userEvent.click(
      within(toastRoot as HTMLElement).getByRole("button", {
        name: "Cerrar aviso",
      }),
    );

    await waitFor(() =>
      expect(screen.queryByText("Cerrable")).not.toBeInTheDocument(),
    );
  });
});
