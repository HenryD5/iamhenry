import { describe, expect, it } from "vitest";
import {
  getBlogMediaPath,
  parseImageAssetId,
} from "@/modules/blog/utils/media-path";

const HASH = "b".repeat(40);

describe("media paths", () => {
  it("parses a valid image asset id", () => {
    expect(parseImageAssetId(`image-${HASH}-1200x800-webp`)).toEqual({
      hash: HASH,
      width: "1200",
      height: "800",
      extension: "webp",
    });
  });

  it.each([
    `image-${"a".repeat(39)}-1200x800-jpg`,
    `image-${HASH}-1200x800-svg`,
    `image-${HASH}-01200x800-png`,
    `image-${HASH}-1200x0800-gif`,
  ])("rejects invalid asset id %s", (assetId) => {
    expect(parseImageAssetId(assetId)).toBeNull();
  });

  it("builds only a local proxy path", () => {
    const path = getBlogMediaPath(`image-${HASH}-10x10-jpg`);
    expect(path).toBe(`/blog/media/image-${HASH}-10x10-jpg`);
    expect(path).not.toContain("cdn.sanity.io");
  });
});
