import { createFileRoute, notFound } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { Sixteen } from "@/components/wall/Sixteen";
import { getWallPublic } from "@/lib/wall-api";
import { useWallStore } from "@/lib/wall-store";

export const Route = createFileRoute("/tv/$hash")({
  loader: async ({ params }) => {
    const wall = await getWallPublic({ data: { hash: params.hash } });
    if (!wall) throw notFound();
    return wall;
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const title = loaderData.brand.title;
    const description = loaderData.brand.description;
    const meta: Array<Record<string, string>> = [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: loaderData.url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];
    if (loaderData.brand.featureImageUrl) {
      meta.push({ property: "og:image", content: loaderData.brand.featureImageUrl });
      meta.push({ name: "twitter:image", content: loaderData.brand.featureImageUrl });
    }
    return {
      meta,
      links: [
        { rel: "icon", href: loaderData.brand.faviconUrl || "/favicon.svg" },
        {
          rel: "alternate",
          type: "application/json+oembed",
          href: `/api/oembed?url=${encodeURIComponent(loaderData.url)}`,
          title,
        },
      ],
    };
  },
  notFoundComponent: () => (
    <main className="flex h-full items-center justify-center px-6 text-center">
      <p className="text-sm text-muted">This wall does not exist.</p>
    </main>
  ),
  component: HashWall,
});

function tokenFromLocation(hash: string) {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`sixteen-edit:${hash}`);
  const fragment = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("k");
  return fragment || stored;
}

function HashWall() {
  const { hash } = Route.useParams();
  const wall = Route.useLoaderData();
  const attachRemote = useWallStore((s) => s.attachRemote);

  useLayoutEffect(() => {
    const token = tokenFromLocation(hash);
    if (token) localStorage.setItem(`sixteen-edit:${hash}`, token);
    attachRemote(hash, wall.cells, token, wall.url);
    if (window.location.hash.includes("k=")) {
      window.history.replaceState(window.history.state, "", window.location.pathname);
    }
  }, [attachRemote, hash, wall.cells, wall.url]);

  return <Sixteen hash={hash} />;
}
