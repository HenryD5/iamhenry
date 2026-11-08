import { ContactAppHeaderView } from "@/modules/contact/views/ContactAppHeaderView";
import { ArticleLoadingView } from "@/modules/blog/views/ArticleLoadingView";

export default function ArticleLoading() {
  return <ArticleLoadingView header={<ContactAppHeaderView />} />;
}
