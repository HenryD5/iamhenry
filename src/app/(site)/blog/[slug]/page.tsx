import { ArticleView } from "@/modules/blog/views/ArticleView";
import {
  getArticlePageMetadata,
  getArticleStaticParams,
} from "@/modules/blog/utils/article-routes";

export const generateMetadata = getArticlePageMetadata;
export const generateStaticParams = getArticleStaticParams;

export default function ArticlePage(props: PageProps<"/blog/[slug]">) {
  return <ArticleView params={props.params} />;
}
