import { BlogSkeletonBlock } from "../components/BlogSkeletonBlock";
import blogMessages from "../locales/es.json";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppHeader } from "@/shared/components/app/AppHeader";

const SKELETON_CARD_KEYS = ["first", "second", "third"] as const;

export function BlogListLoadingView() {
  return (
    <>
      <AppHeader />
      <main
        id="main-content"
        className="overflow-x-clip pt-16 max-md:pt-14"
        aria-busy="true"
      >
        <span className="sr-only">{blogMessages.loading.list}</span>
        <AppContainer>
          <header className="grid grid-cols-[1fr_auto] items-end gap-12 py-24 pb-14 max-md:grid-cols-1 max-md:gap-[1.2rem] max-md:py-14 max-md:pb-8">
            <div>
              <BlogSkeletonBlock className="mb-[1.3rem] h-4 w-20 rounded-sm" />
              <div className="grid max-w-[34rem] gap-3 max-md:max-w-none">
                <BlogSkeletonBlock className="h-12 w-full rounded-sm max-md:h-9" />
                <BlogSkeletonBlock className="h-12 w-3/5 rounded-sm max-md:h-9" />
              </div>
            </div>
            <div className="grid w-[36ch] max-w-full gap-2 max-md:w-full">
              <BlogSkeletonBlock className="h-5 w-full rounded-sm" />
              <BlogSkeletonBlock className="h-5 w-11/12 rounded-sm" />
              <BlogSkeletonBlock className="h-5 w-3/5 rounded-sm" />
            </div>
          </header>

          <div className="pb-24 max-md:pb-16">
            <div className="border-line bg-surface-raised grid grid-cols-[1.35fr_1fr] gap-6 rounded-md border p-[.6rem] max-md:grid-cols-1 max-md:gap-0">
              <BlogSkeletonBlock className="min-h-80 rounded-[calc(var(--radius-md)-.35rem)] max-md:aspect-video max-md:min-h-0" />
              <div className="flex flex-col justify-center gap-[.75rem] py-[1.4rem] pr-[1.4rem] pl-[.4rem] max-md:px-[.9rem] max-md:pt-[1.1rem] max-md:pb-4">
                <BlogSkeletonBlock className="h-3 w-28 rounded-sm" />
                <BlogSkeletonBlock className="h-8 w-full rounded-sm" />
                <BlogSkeletonBlock className="h-8 w-4/5 rounded-sm" />
                <BlogSkeletonBlock className="h-4 w-full rounded-sm" />
                <BlogSkeletonBlock className="h-4 w-3/4 rounded-sm" />
                <BlogSkeletonBlock className="mt-2 h-4 w-24 rounded-sm" />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
              {SKELETON_CARD_KEYS.map((cardKey) => (
                <div
                  key={cardKey}
                  className="border-line bg-surface-raised flex h-full flex-col rounded-md border p-[.6rem]"
                  aria-hidden="true"
                >
                  <BlogSkeletonBlock className="aspect-video rounded-[calc(var(--radius-md)-.35rem)]" />
                  <div className="grid gap-[.7rem] px-[.9rem] pt-[1.1rem] pb-4">
                    <BlogSkeletonBlock className="h-3 w-24 rounded-sm" />
                    <BlogSkeletonBlock className="h-6 w-full rounded-sm" />
                    <BlogSkeletonBlock className="h-6 w-3/4 rounded-sm" />
                    <BlogSkeletonBlock className="h-4 w-full rounded-sm" />
                    <BlogSkeletonBlock className="h-4 w-2/3 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AppContainer>
      </main>
    </>
  );
}
