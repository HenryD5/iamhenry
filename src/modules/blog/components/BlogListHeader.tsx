import blogMessages from "../locales/es.json";

export function BlogListHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto] items-end gap-12 py-24 pb-14 max-md:grid-cols-1 max-md:gap-[1.2rem] max-md:py-14 max-md:pb-8">
      <div>
        <p className="font-primary text-body-sm text-(--accent-text) before:bg-tertiary-500 mb-[1.3rem] inline-flex items-center gap-[.6rem] leading-[1.2] font-semibold before:size-[.55rem] before:rounded-full before:content-['']">
          {blogMessages.common.eyebrow}
        </p>
        <h1 className="text-h2 max-w-[17ch] text-balance max-md:max-w-none">
          {blogMessages.list.title} <em>{blogMessages.list.accent}</em>
        </h1>
      </div>
      <p className="text-body-lg text-fg-muted m-0 max-w-[36ch] leading-[1.45] max-md:max-w-none">
        {blogMessages.list.description}
      </p>
    </header>
  );
}
