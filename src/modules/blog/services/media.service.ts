import "server-only";

import { envServer } from "@/shared/utils/env-server";
import type { ParsedImageAssetId } from "../utils/media-path";

const MEDIA_ORIGIN = "https://cdn.sanity.io";

function buildMediaOriginUrl({
  hash,
  width,
  height,
  extension,
}: ParsedImageAssetId): string {
  const { SANITY_PROJECT_ID, SANITY_DATASET } = envServer;

  return `${MEDIA_ORIGIN}/images/${encodeURIComponent(SANITY_PROJECT_ID)}/${encodeURIComponent(SANITY_DATASET)}/${hash}-${width}x${height}.${extension}`;
}

export async function fetchMediaOrigin(
  asset: ParsedImageAssetId,
  signal: AbortSignal,
): Promise<Response | null> {
  try {
    const response = await fetch(buildMediaOriginUrl(asset), {
      redirect: "error",
      signal,
    });

    return response;
  } catch {
    return null;
  }
}
