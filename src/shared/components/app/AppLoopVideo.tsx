"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const MOTION_ALLOWED_QUERY = "(prefers-reduced-motion: no-preference)";

function subscribeToMotionPreference(handleChange: () => void) {
  const query = window.matchMedia(MOTION_ALLOWED_QUERY);
  query.addEventListener("change", handleChange);
  return () => query.removeEventListener("change", handleChange);
}

function getCanPlayMotion() {
  return window.matchMedia(MOTION_ALLOWED_QUERY).matches;
}

function getServerCanPlayMotion() {
  return false;
}

interface AppLoopVideoProps {
  basePath: string;
  width: number;
  height: number;
  className?: string;
  motionItem?: string;
}

export function AppLoopVideo({
  basePath,
  width,
  height,
  className,
  motionItem,
}: AppLoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canPlayMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getCanPlayMotion,
    getServerCanPlayMotion,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canPlayMotion) return;

    video.load();
    let isInView = false;
    const syncPlayback = () => {
      if (isInView && document.visibilityState === "visible") {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry?.isIntersecting ?? false;
        syncPlayback();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [canPlayMotion]);

  return (
    <video
      ref={videoRef}
      className={className}
      width={width}
      height={height}
      poster={`${basePath}.webp`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      data-motion-item={motionItem}
    >
      {canPlayMotion ? (
        <>
          <source src={`${basePath}.webm`} type="video/webm" />
          <source src={`${basePath}.mp4`} type="video/mp4" />
        </>
      ) : null}
    </video>
  );
}
