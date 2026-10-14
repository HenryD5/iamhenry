import { getTranslations } from "next-intl/server";
import { questionItems } from "../content/home.content";
import { QuestionTabs } from "./QuestionTabs";
import { AppIcon } from "@/shared/components/app/AppIcon";
import { AppContainer } from "@/shared/components/app/AppContainer";

export async function PreguntaSection() {
  const translate = await getTranslations("home");
  const items = questionItems.map((item) => ({
    id: item.id,
    prompt: translate(item.promptKey as Parameters<typeof translate>[0]),
    answer: translate(item.answerKey as Parameters<typeof translate>[0]),
    ...(item.emphasisKey
      ? {
          emphasis: translate(
            item.emphasisKey as Parameters<typeof translate>[0],
          ),
        }
      : {}),
    cards: item.miniCards.map((card) => ({
      label: translate(card.labelKey as Parameters<typeof translate>[0]),
      value: translate(card.valueKey as Parameters<typeof translate>[0]),
    })),
  }));

  return (
    <section
      className="relative scroll-mt-20 overflow-hidden bg-neutral-100 py-30 max-md:py-18"
      id="pregunta"
      data-motion-section="question"
    >
      <div className="absolute top-[52%] left-[74%] h-[46rem] w-[62rem] -translate-1/2 bg-[radial-gradient(circle_at_28%_50%,var(--primary-400)_0,transparent_45%),radial-gradient(circle_at_54%_44%,var(--primary-300)_0,transparent_42%),radial-gradient(circle_at_78%_60%,var(--tertiary-300)_0,transparent_36%)] opacity-[.55] blur-[4.5rem]" />
      <AppContainer className="grid grid-cols-[5fr_7fr] items-center gap-20 max-md:grid-cols-1 max-md:gap-[2.6rem]">
        <div>
          <p className="font-primary text-body-sm text-primary-500 before:bg-tertiary-500 mb-[1.3rem] inline-flex items-center gap-[.6rem] leading-[1.2] font-semibold before:size-[.55rem] before:rounded-full before:content-['']">
            {translate("question.eyebrow")}
          </p>
          <h2 className="mb-[1.4rem] max-w-[16ch] max-md:max-w-none">
            {translate("question.title")}{" "}
            <em>{translate("question.accent")}</em>
          </h2>
          <p className="text-body-lg text-fg-muted m-0 max-w-[42ch] leading-[1.45] max-md:max-w-none">
            {translate("question.lead")}
          </p>
          <ul className="text-body text-fg-muted mt-[2.2rem] mb-0 grid list-none gap-[.9rem] p-0">
            {(["today", "technologies", "ai"] as const).map((key) => (
              <li className="m-0 flex items-center gap-[.8rem]" key={key}>
                <AppIcon
                  className="stroke-primary-500 size-[1.3rem] shrink-0 fill-none stroke-[1.6] [stroke-linecap:round] [stroke-linejoin:round]"
                  name="check"
                />
                {translate(`question.benefits.${key}`)}
              </li>
            ))}
          </ul>
        </div>
        <QuestionTabs
          items={items}
          tabsLabel={translate("question.tabsLabel")}
          assistant={translate("question.assistant")}
          availability={translate("question.availability")}
          inputLabel={translate("question.input")}
        />
      </AppContainer>
    </section>
  );
}
