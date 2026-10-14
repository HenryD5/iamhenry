"use client";

import { Carousel } from "@ark-ui/react/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

interface UiCarouselProps {
  items: readonly ReactNode[];
  ariaLabel: string;
  previousLabel: string;
  nextLabel: string;
  slidesPerPage?: number;
  className?: string;
  itemGroupClassName?: string;
  itemClassName?: string;
  title?: ReactNode;
  headerClassName?: string;
  controlClassName?: string;
  triggerClassName?: string;
  indicatorGroupClassName?: string;
  spacing?: string;
  padding?: string;
  autoSize?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
}

export function UiCarousel({
  items,
  ariaLabel,
  previousLabel,
  nextLabel,
  slidesPerPage = 1,
  className,
  itemGroupClassName,
  itemClassName,
  title,
  headerClassName,
  controlClassName,
  triggerClassName,
  indicatorGroupClassName,
  spacing = "1rem",
  padding,
  autoSize = false,
  showControls = true,
  showIndicators = true,
}: UiCarouselProps) {
  const controlTriggerClassName = [
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:!bg-transparent disabled:hover:!text-fg-muted",
    triggerClassName,
  ]
    .filter(Boolean)
    .join(" ");
  const controls = (
    <Carousel.Control className={controlClassName}>
      <Carousel.PrevTrigger
        className={controlTriggerClassName}
        aria-label={previousLabel}
      >
        <ChevronLeft />
      </Carousel.PrevTrigger>
      <Carousel.NextTrigger
        className={controlTriggerClassName}
        aria-label={nextLabel}
      >
        <ChevronRight />
      </Carousel.NextTrigger>
    </Carousel.Control>
  );
  return (
    <Carousel.Root
      className={className}
      aria-label={ariaLabel}
      slideCount={items.length}
      slidesPerPage={slidesPerPage}
      spacing={spacing}
      padding={padding}
      autoSize={autoSize}
    >
      {title ? (
        <div
          className={[
            "flex items-center justify-between gap-4",
            headerClassName,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {title}
          {showControls ? controls : null}
        </div>
      ) : null}
      <Carousel.ItemGroup
        className={[
          "scroll-smooth motion-reduce:scroll-auto",
          itemGroupClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {items.map((item, index) => (
          <Carousel.Item className={itemClassName} key={index} index={index}>
            {item}
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      {!title && showControls ? controls : null}
      {showIndicators ? (
        <Carousel.Context>
          {({ pageSnapPoints }) => (
            <Carousel.IndicatorGroup className={indicatorGroupClassName}>
              {pageSnapPoints.map((snapPoint, index) => (
                <Carousel.Indicator
                  key={`${index}-${snapPoint}`}
                  index={index}
                  aria-label={`${index + 1}`}
                />
              ))}
            </Carousel.IndicatorGroup>
          )}
        </Carousel.Context>
      ) : null}
    </Carousel.Root>
  );
}
