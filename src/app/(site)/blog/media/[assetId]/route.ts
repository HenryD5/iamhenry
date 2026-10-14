import { fetchMediaOrigin } from "@/modules/blog/services/media.service";
import { parseImageAssetId } from "@/modules/blog/utils/media-path";

const IMMUTABLE_CACHE_CONTROL =
  "public, max-age=31536000, s-maxage=31536000, immutable";

export async function GET(
  request: Request,
  ctx: RouteContext<"/blog/media/[assetId]">,
) {
  const { assetId } = await ctx.params;
  const asset = parseImageAssetId(assetId);

  if (!asset) {
    return new Response(null, { status: 404 });
  }

  const origin = await fetchMediaOrigin(asset, request.signal);

  if (!origin) {
    return new Response(null, { status: 502 });
  }

  const contentType = origin.headers.get("content-type");

  if (origin.status === 404 || origin.status === 403) {
    return new Response(null, { status: 404 });
  }

  if (!origin.ok || !origin.body || !contentType?.startsWith("image/")) {
    return new Response(null, { status: 502 });
  }

  return new Response(origin.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": IMMUTABLE_CACHE_CONTROL,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
