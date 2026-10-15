"use client";

import { Moon, Sun } from "lucide-react";
import { UiSwitch } from "@/shared/components/ui/UiSwitch";
import { useTheme } from "@/shared/hooks/use-theme";

interface AppThemeSwitchProps {
  label: string;
  className?: string;
  isCompact?: boolean;
}

export function AppThemeSwitch({
  label,
  className,
  isCompact = false,
}: AppThemeSwitchProps) {
  const { isMounted, isNight, setTheme } = useTheme();
  const iconClassName = isCompact ? "size-4 md:size-3.5" : "size-3.5";

  return (
    <div
      className={`${isMounted ? "opacity-100" : "pointer-events-none opacity-0"}${className ? ` ${className}` : ""}`}
    >
      <UiSwitch
        checked={isNight}
        disabled={!isMounted}
        onCheckedChange={(isChecked) => setTheme(isChecked ? "night" : "day")}
        label={label}
        isCompact={isCompact}
        uncheckedIcon={<Sun className={iconClassName} aria-hidden="true" />}
        checkedIcon={<Moon className={iconClassName} aria-hidden="true" />}
        thumbIcon={
          isNight ? (
            <Moon className={iconClassName} aria-hidden="true" />
          ) : (
            <Sun className={iconClassName} aria-hidden="true" />
          )
        }
      />
    </div>
  );
}
