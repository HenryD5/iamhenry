export const BLOG_PATH = "/blog";

export function getArticlePath(slug: string): string {
  return `${BLOG_PATH}/${encodeURIComponent(slug)}`;
}
