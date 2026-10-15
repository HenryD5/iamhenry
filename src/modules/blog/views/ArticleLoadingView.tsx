import { BlogSkeletonBlock } from "../components/BlogSkeletonBlock";
import blogMessages from "../locales/es.json";
import { AppContainer } from "@/shared/components/app/AppContainer";
import { AppHeader } from "@/shared/components/app/AppHeader";

export function ArticleLoadingView() {
  return (
    <>
      <AppHeader />
      <main
        id="main-content"
        className="overflow-x-clip pt-16 max-md:pt-14"
        aria-busy="true"
      >
        <span className="sr-only">{blogMessages.loading.article}</span>
        <article>
          <AppContainer>
            <header className="mx-auto max-w-[52rem] pt-16 pb-10 max-md:pt-10 max-md:pb-7">
              <BlogSkeletonBlock className="mb-9 h-4 w-36 rounded-sm" />
              <BlogSkeletonBlock className="mb-[1.3rem] h-4 w-16 rounded-sm" />
              <div className="grid gap-3">
                <BlogSkeletonBlock className="h-14 w-full rounded-sm max-md:h-10" />
                <BlogSkeletonBlock className="h-14 w-4/5 rounded-sm max-md:h-10" />
              </div>
              <div className="mt-[1.4rem] grid max-w-[44rem] gap-2">
                <BlogSkeletonBlock className="h-5 w-full rounded-sm" />
                <BlogSkeletonBlock className="h-5 w-3/4 rounded-sm" />
              </div>
              <div className="border-line mt-8 flex gap-[1.2rem] border-t pt-[1.4rem]">
                <BlogSkeletonBlock className="h-4 w-28 rounded-sm" />
                <BlogSkeletonBlock className="h-4 w-32 rounded-sm" />
                <BlogSkeletonBlock className="h-4 w-36 rounded-sm max-md:hidden" />
              </div>
            </header>

            <BlogSkeletonBlock className="mx-auto aspect-[2/1] max-w-[64rem] rounded-lg max-md:aspect-[16/10] max-md:rounded-md" />

            <div className="mx-auto grid max-w-[42rem] gap-3 pt-9 pb-4 md:pt-14">
              {["full", "11/12", "full", "4/5", "full", "2/3"].map(
                (width, index) => (
                  <BlogSkeletonBlock
                    key={index}
                    className={`h-5 rounded-sm ${width === "full" ? "w-full" : width === "11/12" ? "w-11/12" : width === "4/5" ? "w-4/5" : "w-2/3"}`}
                  />
                ),
              )}
            </div>
          </AppContainer>
        </article>
      </main>
    </>
  );
}
