"use client";

import { RadioGroup } from "@ark-ui/react/radio-group";
import type { ReactNode } from "react";

export interface UiRadioGroupOption {
  value: string;
  label: ReactNode;
  className?: string;
}

interface UiRadioGroupProps {
  label: ReactNode;
  options: UiRadioGroupOption[];
  value?: string | null;
  isDisabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
}

export function UiRadioGroup({
  label,
  options,
  value,
  isDisabled = false,
  className,
  onValueChange,
}: UiRadioGroupProps) {
  return (
    <RadioGroup.Root
      value={value ?? null}
      disabled={isDisabled}
      className={["data-[disabled]:opacity-100", className]
        .filter(Boolean)
        .join(" ")}
      onValueChange={(details) => {
        if (details.value) onValueChange?.(details.value);
      }}
    >
      <RadioGroup.Label className="text-body mb-4 leading-snug font-semibold data-[disabled]:opacity-100">
        {label}
      </RadioGroup.Label>
      <div className="grid gap-2">
        {options.map((option) => (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={[
              "border-line data-[state=checked]:border-primary-500 data-[focus-visible]:border-primary-500 flex cursor-pointer items-start gap-3 rounded-sm border p-3 transition-colors duration-150 data-[disabled]:cursor-default data-[disabled]:opacity-100",
              option.className,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <RadioGroup.ItemControl className="border-line data-[state=checked]:border-primary-500 data-[state=checked]:bg-primary-500 mt-[.2em] size-4 shrink-0 rounded-full border data-[disabled]:opacity-100 data-[state=checked]:shadow-[inset_0_0_0_.2rem_var(--bg-raised)]" />
            <RadioGroup.ItemText className="text-body-sm leading-snug font-normal data-[disabled]:opacity-100">
              {option.label}
            </RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        ))}
      </div>
    </RadioGroup.Root>
  );
}
