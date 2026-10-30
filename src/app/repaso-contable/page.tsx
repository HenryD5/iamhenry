import { getStudyMetadata, StudyView } from "@/modules/study/views/StudyView";

export const generateMetadata = getStudyMetadata;

export default function StudyPage() {
  return <StudyView />;
}
