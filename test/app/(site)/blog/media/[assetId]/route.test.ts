import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const HASH = "c".repeat(40);
const ASSET_ID = `image-${HASH}-320x240-png`;
const fetchMock = vi.fn<typeof fetch>();

vi.mock("server-only", () => ({}));
vi.mock("@/shared/utils/env-server", () => ({
  envServer: {
    SANITY_PROJECT_ID: "fake-project",
    SANITY_DATASET: "fake-dataset",
    SANITY_API_VERSION: "2025-01-01",
  },
}));

import { GET } from "@/app/(site)/blog/media/[assetId]/route";

function callRoute(assetId = ASSET_ID) {
  return GET(new Request(`https://example.test/blog/media/${assetId}`), {
    params: Promise.resolve({ assetId }),
  });
}

describe("blog media Route Handler", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
    fetchMock.mockReset();
  });
  afterEach(() => vi.unstubAllGlobals());

  it("returns 404 without fetching for an invalid id", async () => {
    expect((await callRoute("invalid")).status).toBe(404);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("proxies an image with immutable cache headers and no origin leak", async () => {
    fetchMock.mockResolvedValue(
      new Response("image-bytes", {
        status: 200,
        headers: { "content-type": "image/png" },
      }),
    );
    const response = await callRoute();

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=31536000, s-maxage=31536000, immutable",
    );
    expect([...response.headers.values()].join(" ")).not.toContain(
      "cdn.sanity.io",
    );
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining(`/${HASH}-320x240.png`),
      expect.objectContaining({
        signal: expect.any(AbortSignal),
        redirect: "error",
      }),
    );
  });

  it.each([403, 404])("maps origin status %s to 404", async (status) => {
    fetchMock.mockResolvedValue(new Response(null, { status }));
    expect((await callRoute()).status).toBe(404);
  });

  it.each([
    {
      name: "other origin error",
      response: new Response(null, { status: 500 }),
    },
    {
      name: "non-image response",
      response: new Response("text", {
        status: 200,
        headers: { "content-type": "text/plain" },
      }),
    },
  ])("returns 502 for $name", async ({ response }) => {
    fetchMock.mockResolvedValue(response);
    expect((await callRoute()).status).toBe(502);
  });

  it("returns 502 when the origin request throws", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    expect((await callRoute()).status).toBe(502);
  });
});
