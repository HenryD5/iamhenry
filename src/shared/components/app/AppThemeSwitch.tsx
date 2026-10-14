"use client";

import { Moon, Sun } from "lucide-react";
import { UiSwitch } from "@/shared/components/ui/UiSwitch";
import { useTheme } from "@/shared/hooks/use-theme";

interface AppThemeSwitchProps {
  label: string;
  className?: string;
}

export function AppThemeSwitch({ label, className }: AppThemeSwitchProps) {
  const { isMounted, isNight, setTheme } = useTheme();
  const iconClassName = "size-3.5";

  return (
    <div
      className={`${isMounted ? "opacity-100" : "pointer-events-none opacity-0"}${className ? ` ${className}` : ""}`}
    >
      <UiSwitch
        checked={isNight}
        disabled={!isMounted}
        onCheckedChange={(isChecked) =>
          setTheme(isChecked ? "night" : "day")
        }
        label={label}
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
