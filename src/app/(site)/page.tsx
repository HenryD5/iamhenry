import { HomeView } from "@/modules/home/views/HomeView";
import { PersonJsonLd } from "@/shared/seo/person-json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <HomeView />
    </>
  );
}
