"use client";

import { useCallback, useRef } from "react";

interface TurnstileApi {
  render: (container: HTMLElement, options: { sitekey: string }) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
}

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Render explícito: el script se carga con next/script solo cuando el
 * formulario se monta y `onReady` dibuja el widget en el contenedor. El
 * widget inyecta él mismo el campo `cf-turnstile-response` dentro del form.
 */
export function useTurnstile(siteKey: string | undefined) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    const container = containerRef.current;

    if (!siteKey || !container || !window.turnstile) {
      return;
    }

    if (widgetIdRef.current) {
      window.turnstile.remove(widgetIdRef.current);
    }

    widgetIdRef.current = window.turnstile.render(container, {
      sitekey: siteKey,
    });
  }, [siteKey]);

  // El token es de un solo uso: tras cada envío se pide uno nuevo.
  const resetWidget = useCallback(() => {
    if (widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  }, []);

  return { containerRef, renderWidget, resetWidget };
}
