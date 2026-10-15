import { HomeView } from "@/modules/home/views/HomeView";
import { PersonJsonLd } from "@/shared/seo/person-json-ld";
import { WebsiteJsonLd } from "@/shared/seo/website-json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <WebsiteJsonLd />
      <HomeView />
    </>
  );
}
