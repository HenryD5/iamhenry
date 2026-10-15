import { ArticleView } from "@/modules/blog/views/ArticleView";
import {
  getArticlePageMetadata,
  getArticleStaticParams,
} from "@/modules/blog/utils/article-routes";

export const generateMetadata = getArticlePageMetadata;
export const generateStaticParams = getArticleStaticParams;
// Ruta estática aún sin navegación instantánea; pendiente: mover params tras Suspense.
// eslint-disable-next-line @typescript-eslint/naming-convention -- nombre fijo de la configuración de segmento de Next
export const instant = false;

export default function ArticlePage(props: PageProps<"/blog/[slug]">) {
  return <ArticleView params={props.params} />;
}
