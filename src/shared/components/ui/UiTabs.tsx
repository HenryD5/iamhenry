"use client";

import { Tabs } from "@ark-ui/react/tabs";
import type { ReactNode } from "react";

export interface UiTabItem {
  value: string;
  label: ReactNode;
  content: ReactNode;
  isPending?: boolean;
  triggerClassName?: string;
  contentClassName?: string;
  contentSurface?: "light";
  contentMotionItem?: string;
}

interface UiTabsProps {
  items: readonly UiTabItem[];
  value: string;
  ariaLabel: string;
  onValueChange: (value: string) => void;
  className?: string;
  listClassName?: string;
  beforeList?: ReactNode;
  afterContent?: ReactNode;
  isContentBeforeList?: boolean;
  motionSection?: string;
  motionItem?: string;
  surface?: "light";
}

export function UiTabs({
  items,
  value,
  ariaLabel,
  onValueChange,
  className,
  listClassName,
  beforeList,
  afterContent,
  isContentBeforeList = false,
  motionSection,
  motionItem,
  surface,
}: UiTabsProps) {
  const panels = items.map((item) => (
    <Tabs.Content
      className={["[animation:none!important]", item.contentClassName]
        .filter(Boolean)
        .join(" ")}
      key={item.value}
      value={item.value}
      data-surface={item.contentSurface}
      data-motion-item={item.contentMotionItem}
    >
      {item.content}
    </Tabs.Content>
  ));
  const list = (
    <Tabs.List className={listClassName} aria-label={ariaLabel}>
      {items.map((item) => (
        <Tabs.Trigger
          className={item.triggerClassName}
          key={item.value}
          value={item.value}
          data-pending={item.isPending || undefined}
        >
          {item.label}
        </Tabs.Trigger>
      ))}
    </Tabs.List>
  );
  return (
    <Tabs.Root
      className={className}
      value={value}
      onValueChange={({ value: nextValue }) => onValueChange(nextValue)}
      data-motion-section={motionSection}
      data-motion-item={motionItem}
      data-surface={surface}
    >
      {beforeList}
      {isContentBeforeList ? panels : null}
      {list}
      {isContentBeforeList ? null : panels}
      {afterContent}
    </Tabs.Root>
  );
}
