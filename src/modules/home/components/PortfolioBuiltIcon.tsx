import type { BuiltItem } from "../types/home-content.types";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { AppIconHalo } from "@/shared/components/app/AppIconHalo";

const BUILT_ICONS = {
  rewards: "gift",
  commerce: "commerce",
  payments: "payments",
  mercadosya: "store",
  bluex: "robot",
} as const;

export function PortfolioBuiltIcon({ item }: { item: BuiltItem }) {
  return (
    <AppIconHalo
      className={`row-span-2 grid size-[3.6rem] place-items-center rounded-full text-white shadow-[0_0_0_.45rem_color-mix(in_srgb,var(--primary-500)_16%,transparent),0_0_0_.95rem_color-mix(in_srgb,var(--primary-500)_7%,transparent)] ${item.isAi ? "bg-[radial-gradient(circle_at_30%_26%,var(--primary-300),var(--primary-500)_45%,var(--tertiary-500))]" : "bg-primary-500"}`}
      motionItem="portfolio-built-icon"
    >
      <AppIcon name={BUILT_ICONS[item.id]} />
    </AppIconHalo>
  );
}
