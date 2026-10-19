import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/oembed")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { readBranding } = await import("@/lib/store.server");
        const url = new URL(request.url);
        const brand = readBranding();
        const target = url.searchParams.get("url") || url.origin;
        const image = brand.featureImage ? new URL(brand.featureImage, url.origin).href : undefined;
        return Response.json({
          version: "1.0",
          type: "link",
          title: brand.title,
          provider_name: brand.title,
          description: brand.description,
          thumbnail_url: image,
          thumbnail_width: 1200,
          thumbnail_height: 630,
          url: target,
        });
      },
    },
  },
});
