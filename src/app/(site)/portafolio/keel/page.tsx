import { getKeelMetadata } from "@/modules/projects/utils/project-seo";
import { KeelView } from "@/modules/projects/views/KeelView";

export const generateMetadata = getKeelMetadata;

export default function KeelPage() {
  return <KeelView />;
}
