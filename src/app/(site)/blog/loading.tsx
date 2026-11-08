import { ContactAppHeaderView } from "@/modules/contact/views/ContactAppHeaderView";
import { BlogListLoadingView } from "@/modules/blog/views/BlogListLoadingView";

export default function BlogLoading() {
  return <BlogListLoadingView header={<ContactAppHeaderView />} />;
}
