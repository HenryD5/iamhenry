"use client";

import { Switch } from "@ark-ui/react/switch";
import type { ReactNode } from "react";

interface UiSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
  checkedIcon: ReactNode;
  uncheckedIcon: ReactNode;
  thumbIcon: ReactNode;
  disabled?: boolean;
  isCompact?: boolean;
}

export function UiSwitch({
  checked,
  onCheckedChange,
  label,
  checkedIcon,
  uncheckedIcon,
  thumbIcon,
  disabled = false,
  isCompact = false,
}: UiSwitchProps) {
  return (
    <Switch.Root
      className="m-0 inline-flex cursor-pointer items-center rounded-full has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-(--focus-ring)"
      checked={checked}
      disabled={disabled}
      onCheckedChange={({ checked: nextChecked }) =>
        onCheckedChange(nextChecked)
      }
    >
      <Switch.HiddenInput role="switch" aria-checked={checked} />
      <Switch.Control
        className={`border-line bg-surface-raised relative grid grid-cols-2 items-center rounded-full border text-(--accent-text) ${isCompact ? "h-[var(--control-h-md)] w-19 md:h-8 md:w-14" : "h-8 w-14"}`}
      >
        <span className="grid place-items-center" aria-hidden="true">
          {uncheckedIcon}
        </span>
        <span className="grid place-items-center" aria-hidden="true">
          {checkedIcon}
        </span>
        <Switch.Thumb
          className={`bg-accent text-on-accent absolute start-0.5 grid place-items-center rounded-full shadow-[var(--shadow-soft)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease)] motion-reduce:transition-none ${isCompact ? "size-[calc(var(--control-h-md)-.25rem)] data-[state=checked]:translate-x-7 md:size-7 md:data-[state=checked]:translate-x-6" : "size-7 data-[state=checked]:translate-x-6"}`}
        >
          {thumbIcon}
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label className="sr-only">{label}</Switch.Label>
    </Switch.Root>
  );
}
