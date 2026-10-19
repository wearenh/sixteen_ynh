import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { getBrandingPublic } from "@/lib/wall-api";
import appCss from "../styles.css?url";

const APP_NAME = "Sixteen";
const FALLBACK_DESCRIPTION =
  "A 16-cell video wall locked to 1920×1080. Four cameras on top, four on the bottom, a program in the center, two custom frames on the sides.";

export const Route = createRootRoute({
  loader: () => getBrandingPublic(),
  head: ({ loaderData }) => {
    const title = loaderData?.title || APP_NAME;
    const description = loaderData?.description || FALLBACK_DESCRIPTION;
    const meta: Array<Record<string, string>> = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#09090b" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ];
    if (loaderData?.featureImageUrl) {
      meta.push({ property: "og:image", content: loaderData.featureImageUrl });
      meta.push({ name: "twitter:image", content: loaderData.featureImageUrl });
    }
    return {
      meta,
      links: [
        { rel: "icon", type: "image/svg+xml", href: loaderData?.faviconUrl || "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600&display=swap",
        },
      ],
    };
  },
  component: RootLayout,
});

function RootLayout() {
  const brand = Route.useLoaderData();
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
        {brand.customCss ? <style>{brand.customCss}</style> : null}
      </head>
      <body className="bg-bg text-fg">
        <div className="flex h-dvh flex-col">
          {brand.customHtml ? (
            <div className="site-intro shrink-0" dangerouslySetInnerHTML={{ __html: brand.customHtml }} />
          ) : null}
          <div className="min-h-0 flex-1">
            <PreviewHostBridge />
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}