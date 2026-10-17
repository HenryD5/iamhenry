"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/shared/hooks/use-theme";

interface ProjectDiagramFrameProps {
  src: string;
  title: string;
}

/**
 * Incrusta un diagrama HTML autónomo de `public/media/`. Sin JavaScript queda
 * con una altura fija; al hidratar ajusta la altura al contenido y le pasa el
 * tema del sitio, porque el documento incrustado solo conoce el del sistema.
 */
export function ProjectDiagramFrame({ src, title }: ProjectDiagramFrameProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | null = null;

    const handleFrameReady = () => {
      const frameDocument = frame.contentDocument;
      if (!frameDocument?.body) return;
      frameDocument.documentElement.dataset.theme =
        theme === "night" ? "dark" : "light";
      observer?.disconnect();
      observer = new ResizeObserver(() => {
        setContentHeight(frameDocument.body.scrollHeight);
      });
      observer.observe(frameDocument.body);
    };

    if (frame.contentDocument?.readyState === "complete") {
      handleFrameReady();
    }
    frame.addEventListener("load", handleFrameReady);

    return () => {
      frame.removeEventListener("load", handleFrameReady);
      observer?.disconnect();
    };
  }, [theme]);

  return (
    <iframe
      ref={frameRef}
      className="block h-[66rem] w-full border-0 max-lg:h-[110rem]"
      src={src}
      title={title}
      loading="lazy"
      style={contentHeight ? { height: contentHeight } : undefined}
    />
  );
}
