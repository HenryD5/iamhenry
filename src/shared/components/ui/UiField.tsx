"use client";

import { Field } from "@ark-ui/react/field";
import type { ComponentProps, ReactNode } from "react";

type UiFieldControlProps = Omit<
  ComponentProps<"input">,
  "children" | "className"
> &
  Omit<
    ComponentProps<"textarea">,
    "children" | "className" | keyof ComponentProps<"input">
  >;

interface UiFieldProps extends UiFieldControlProps {
  label: string;
  helperText?: string;
  errorText?: ReactNode;
  isInvalid?: boolean;
  isRequired?: boolean;
  isDisabled?: boolean;
  variant?: "input" | "textarea";
  rows?: number;
  className?: string;
  controlClassName?: string;
}

export function UiField({
  label,
  helperText,
  errorText,
  isInvalid = false,
  isRequired = false,
  isDisabled = false,
  variant = "input",
  rows,
  className,
  controlClassName,
  ...controlProps
}: UiFieldProps) {
  return (
    <Field.Root
      invalid={isInvalid}
      required={isRequired}
      disabled={isDisabled}
      className={className}
    >
      <Field.Label className="text-body-sm font-medium">
        {label}
        {isRequired ? (
          <Field.RequiredIndicator>*</Field.RequiredIndicator>
        ) : null}
      </Field.Label>
      {variant === "textarea" ? (
        <Field.Textarea
          {...(controlProps as ComponentProps<"textarea">)}
          rows={rows}
          className={controlClassName}
        />
      ) : (
        <Field.Input
          {...(controlProps as ComponentProps<"input">)}
          className={controlClassName}
        />
      )}
      {helperText ? <Field.HelperText>{helperText}</Field.HelperText> : null}
      {isInvalid && errorText ? (
        <Field.ErrorText>{errorText}</Field.ErrorText>
      ) : null}
    </Field.Root>
  );
}
