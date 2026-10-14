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
}

export function UiSwitch({
  checked,
  onCheckedChange,
  label,
  checkedIcon,
  uncheckedIcon,
  thumbIcon,
  disabled = false,
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
      <Switch.Control className="border-line bg-surface-raised relative grid h-8 w-14 grid-cols-2 items-center rounded-full border text-(--accent-text)">
        <span className="grid place-items-center" aria-hidden="true">
          {uncheckedIcon}
        </span>
        <span className="grid place-items-center" aria-hidden="true">
          {checkedIcon}
        </span>
        <Switch.Thumb className="bg-accent text-on-accent absolute start-0.5 grid size-7 place-items-center rounded-full shadow-[var(--shadow-soft)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease)] data-[state=checked]:translate-x-6 motion-reduce:transition-none">
          {thumbIcon}
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label className="sr-only">{label}</Switch.Label>
    </Switch.Root>
  );
}
