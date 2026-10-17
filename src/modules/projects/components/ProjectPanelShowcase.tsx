"use client";

import Image from "next/image";
import {
  type FocusEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  domAnimation,
  m,
  useReducedMotion,
} from "motion/react";

interface ProjectPanelScreen {
  id: string;
  image: string;
  imagePlaceholder: string;
  width: number;
  height: number;
  title: string;
  text: string;
  alt: string;
}

interface ProjectPanelShowcaseProps {
  screens: readonly ProjectPanelScreen[];
  listLabel: string;
}

const AUTOPLAY_DURATION_SECONDS = 6;

export function ProjectPanelShowcase({
  screens,
  listLabel,
}: ProjectPanelShowcaseProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusedWithin, setIsFocusedWithin] = useState(false);
  const [isInViewport, setIsInViewport] = useState(true);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const baseId = useId();
  const activeScreen = screens[activeIndex] ?? screens[0];
  const isAutoplayActive =
    isAutoplayEnabled &&
    !shouldReduceMotion &&
    !isHovered &&
    !isFocusedWithin &&
    isInViewport &&
    isDocumentVisible;

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsInViewport(entry?.isIntersecting ?? false);
    });

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsDocumentVisible(document.visibilityState === "visible");
    };

    handleVisibilityChange();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isAutoplayActive || screens.length < 2) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % screens.length);
    }, AUTOPLAY_DURATION_SECONDS * 1000);

    return () => window.clearTimeout(timeoutId);
  }, [activeIndex, isAutoplayActive, screens.length]);

  if (!activeScreen) {
    return null;
  }

  const panelId = `${baseId}-panel`;

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    setIsAutoplayEnabled(false);
  };

  const handleTabKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % screens.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + screens.length) % screens.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = screens.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusedWithin(false);
    }
  };

  const handleFocus = () => setIsFocusedWithin(true);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig reducedMotion="user">
        <div
          className="grid grid-cols-[minmax(14rem,20rem)_minmax(0,1fr)] items-start gap-8 max-md:grid-cols-1 max-md:gap-5"
          data-motion-item="purafruit-panel-showcase"
          ref={rootRef}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="grid gap-3 max-md:grid-cols-3 max-md:gap-2"
            role="tablist"
            aria-label={listLabel}
          >
            {screens.map((screen, index) => {
              const isActive = index === activeIndex;
              const tabId = `${baseId}-tab-${screen.id}`;

              return (
                <button
                  className={`border-line relative overflow-hidden rounded-md border px-5 py-5 text-left transition-colors max-md:px-3 max-md:py-3 max-md:text-center ${isActive ? "border-primary-500 bg-surface" : "bg-surface-raised hover:bg-surface"}`}
                  id={tabId}
                  key={screen.id}
                  type="button"
                  role="tab"
                  aria-controls={panelId}
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(event) => handleTabKeyDown(index, event)}
                >
                  <span
                    className={`text-h5 max-md:text-caption block max-md:leading-[1.25] max-md:font-semibold ${isActive ? "text-primary-500" : ""}`}
                  >
                    {screen.title}
                  </span>
                  <span className="text-body-sm text-fg-muted mt-2 block max-md:hidden">
                    {screen.text}
                  </span>
                  {isActive ? (
                    <m.span
                      className="bg-primary-500 absolute right-0 bottom-0 left-0 h-0.5 origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isAutoplayActive ? 1 : 0 }}
                      transition={{
                        duration: isAutoplayActive
                          ? AUTOPLAY_DURATION_SECONDS
                          : 0,
                        ease: "linear",
                      }}
                      aria-hidden="true"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div>
            <div
              className="border-line bg-surface-raised overflow-hidden rounded-md border shadow-(--shadow-medium)"
              id={panelId}
              role="tabpanel"
              aria-labelledby={`${baseId}-tab-${activeScreen.id}`}
            >
              <div
                className="border-line flex h-8 items-center gap-1.5 border-b px-3"
                aria-hidden="true"
              >
                <span className="bg-tertiary-500 size-2 rounded-full" />
                <span className="bg-fg-muted size-2 rounded-full" />
                <span className="bg-fg-muted size-2 rounded-full" />
              </div>
              <div className="bg-surface-sunken relative overflow-hidden">
                <AnimatePresence initial={false} mode="popLayout">
                  <m.div
                    key={activeScreen.id}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, scale: 0.98, filter: "blur(6px)" }
                    }
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, scale: 0.98, filter: "blur(6px)" }
                    }
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.45,
                      ease: "easeOut",
                    }}
                  >
                    <m.div
                      animate={
                        shouldReduceMotion
                          ? { scale: 1, y: 0 }
                          : { scale: 1.04, y: -6 }
                      }
                      transition={{
                        duration: AUTOPLAY_DURATION_SECONDS,
                        ease: "linear",
                      }}
                    >
                      <Image
                        className="block h-auto w-full"
                        src={activeScreen.image}
                        alt={activeScreen.alt}
                        width={activeScreen.width}
                        height={activeScreen.height}
                        placeholder="blur"
                        blurDataURL={activeScreen.imagePlaceholder}
                        sizes="(min-width: 1024px) 56rem, 100vw"
                      />
                    </m.div>
                  </m.div>
                </AnimatePresence>
              </div>
            </div>
            <p className="text-body-sm text-fg-muted m-0 mt-4 hidden max-md:block">
              {activeScreen.text}
            </p>
          </div>
        </div>
      </MotionConfig>
    </LazyMotion>
  );
}
