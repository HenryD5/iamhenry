import { getPurafruitMetadata } from "@/modules/projects/utils/project-seo";
import { PurafruitView } from "@/modules/projects/views/PurafruitView";

export const generateMetadata = getPurafruitMetadata;

export default function PurafruitPage() {
  return <PurafruitView />;
}
