import { getTranslations } from "next-intl/server";
import { NotFoundOrbitMotion } from "./NotFoundOrbitMotion";

export async function NotFoundOrbit() {
  const translate = await getTranslations("notFound");

  return (
    <NotFoundOrbitMotion
      blogLabel={translate("satellites.blog")}
      homeLabel={translate("satellites.home")}
      lostLabel={translate("lostRoute")}
      planetLabel={translate("planet")}
      searchedLabel={translate("searched")}
    />
  );
}
