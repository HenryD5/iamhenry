import { BlogListView } from "@/modules/blog/views/BlogListView";
import { getBlogListMetadata } from "@/modules/blog/utils/article-seo";

export const generateMetadata = getBlogListMetadata;

export default function BlogPage() {
  return <BlogListView />;
}
