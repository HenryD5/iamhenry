"use client";

import { useState } from "react";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { UiTabs, type UiTabItem } from "@/shared/components/ui/UiTabs";

interface QuestionViewModel {
  id: string;
  prompt: string;
  answer: string;
  emphasis?: string;
  cards: readonly { label: string; value: string }[];
}

export function QuestionTabs({
  items,
  tabsLabel,
  assistant,
  availability,
  inputLabel,
}: {
  items: readonly QuestionViewModel[];
  tabsLabel: string;
  assistant: string;
  availability: string;
  inputLabel: string;
}) {
  const [value, setValue] = useState(items[0]?.id ?? "");
  const tabs: readonly UiTabItem[] = items.map((item) => ({
    value: item.id,
    label: item.prompt,
    contentClassName: "grid gap-[1.1rem]",
    triggerClassName:
      "!rounded-full !border !border-line !px-4 !py-[.65rem] !font-primary !text-body-sm !leading-none !font-medium !normal-case !text-fg !shadow-none hover:!bg-[color-mix(in_srgb,var(--fg)_9%,transparent)] hover:!text-fg focus-visible:!text-fg data-[selected]:!border-primary-400 data-[selected]:!text-fg data-[selected]:hover:!text-fg data-[selected]:focus-visible:!text-fg data-[selected]:!shadow-[0_0_var(--glow-size)_color-mix(in_srgb,var(--primary-500)_var(--glow-strength),transparent)]",
    content: (
      <>
        <div className="bg-primary-500 font-primary text-body justify-self-end rounded-[1.2rem_1.2rem_.3rem_1.2rem] px-[1.2rem] py-[.85rem] leading-[1.3] font-medium text-white">
          {item.prompt}
        </div>
        <div className="border-line bg-surface-raised text-body text-fg rounded-[.3rem_1.2rem_1.2rem_1.2rem] border px-6 py-[1.4rem] leading-[var(--leading-body)]">
          {item.emphasis ? (
            <>
              <b className="text-fg font-semibold">{item.emphasis}</b>{" "}
            </>
          ) : null}
          {item.answer}
          <span className="bg-tertiary-400 ml-1 inline-block h-5 w-[.6rem] align-[-.2rem]" />
          <div className="mt-[1.1rem] grid grid-cols-[1.25fr_1fr_1fr] gap-[.8rem] max-md:grid-cols-2">
            {item.cards.map((card, index) => (
              <div
                className={`border-line bg-surface rounded-sm border px-4 py-[.9rem] ${index === 0 ? "max-md:col-span-2" : ""}`}
                key={card.label}
              >
                <small className="text-caption text-fg-muted block">
                  {card.label}
                </small>
                <strong className="font-secondary text-fg text-[1.12rem] leading-[1.25] font-extrabold tracking-[-.01em]">
                  {card.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </>
    ),
  }));

  return (
    <UiTabs
      className="relative grid gap-[1.1rem] rounded-lg p-[1.7rem] shadow-[0_3rem_6rem_-2.4rem_color-mix(in_srgb,var(--primary-800)_70%,transparent)]"
      listClassName="!flex !flex-wrap !gap-[.6rem] !overflow-visible !border-b-0"
      items={tabs}
      value={value}
      ariaLabel={tabsLabel}
      onValueChange={setValue}
      isContentBeforeList
      surface="light"
      motionItem="assistant-panel"
      beforeList={
        <div className="text-body-sm text-fg-muted flex items-center justify-between px-[.3rem] pb-[.3rem] max-md:flex-col max-md:items-start max-md:gap-2">
          <b className="font-secondary text-body text-fg flex items-center gap-[.6rem] leading-none font-extrabold">
            <i className="size-4 rounded-full bg-[radial-gradient(circle_at_30%_26%,var(--primary-300),var(--primary-500)_45%,var(--tertiary-500))]" />
            {assistant}
          </b>
          <span>{availability}</span>
        </div>
      }
      afterContent={
        <div className="border-primary-400 text-body text-fg-muted flex items-center justify-between rounded-sm border py-[.7rem] pr-[.7rem] pl-[1.2rem]">
          {inputLabel}
          <i className="bg-fg text-surface grid size-10 place-items-center rounded-[.7rem]">
            <AppIcon name="arrow-up" />
          </i>
        </div>
      }
    />
  );
}
