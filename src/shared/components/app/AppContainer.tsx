import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

interface AppContainerProps<T extends ElementType> {
  as?: T;
  children: ReactNode;
  className?: string;
}

export function AppContainer<T extends ElementType = "div">({
  as,
  children,
  className,
  ...props
}: AppContainerProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof AppContainerProps<T>>) {
  const Component = as ?? "div";
  return (
    <Component
      {...props}
      className={[
        "relative mx-auto w-[min(86rem,calc(100%_-_6rem))] max-md:w-[calc(100%_-_2.5rem)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </Component>
  );
}
