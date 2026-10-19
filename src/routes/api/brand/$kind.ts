import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/brand/$kind")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const { readBrandFile } = await import("@/lib/store.server");
        const file = readBrandFile(params.kind);
        if (!file) return new Response("Not found", { status: 404 });
        return new Response(new Uint8Array(file.body), {
          headers: {
            "content-type": file.type,
            "cache-control": "public, max-age=300",
          },
        });
      },
    },
  },
});
