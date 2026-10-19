import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { getBrandingPublic, saveBrandingPublic } from "@/lib/wall-api";

export const Route = createFileRoute("/admin")({
  loader: () => getBrandingPublic(),
  component: AdminPage,
});

function AdminPage() {
  const initial = Route.useLoaderData();
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [customHtml, setCustomHtml] = useState(initial.customHtml);
  const [customCss, setCustomCss] = useState(initial.customCss);
  const [feature, setFeature] = useState<string | undefined>();
  const [favicon, setFavicon] = useState<string | undefined>();
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function onFile(file: File | undefined, set: (value: string) => void) {
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    set(dataUrl);
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      await saveBrandingPublic({
        data: { title, description, customHtml, customCss, featureImageDataUrl: feature, faviconDataUrl: favicon },
      });
      setMessage("Saved. The wall and shared links use this now.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="h-full overflow-y-auto bg-[#f4f6f8] text-[#1c2833]">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 px-5 py-8">
        <div>
          <p className="text-xs tracking-wide text-[#607080] uppercase">Domains / Features</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">Site style</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#4d5b6a]">
            Same fields as a YunoHost domain Features page. Custom HTML and CSS style the wall.
            The title and feature image are what X, Telegram, Signal, and Nextcloud Collectives
            show when a /tv/… link is shared.
          </p>
        </div>

        {initial.yunohost ? (
          <p className="rounded-md border border-[#d5dde6] bg-white px-4 py-3 text-sm leading-relaxed">
            This server is YunoHost. Change these in the webadmin: Sixteen → Site style. That
            panel writes the same settings this page shows.
          </p>
        ) : null}

        <form
          className="flex flex-col gap-5 rounded-md border border-[#d5dde6] bg-white p-5"
          onSubmit={(event) => {
            event.preventDefault();
            void save();
          }}
        >
          <Field label="Custom title" help="Shown as the site name and as the title of a shared link.">
            <input
              className={inputClass}
              value={title}
              maxLength={80}
              disabled={initial.yunohost}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Field>
          <Field label="Description" help="The sentence under the title in a link preview.">
            <textarea
              className={inputClass}
              rows={3}
              value={description}
              maxLength={300}
              disabled={initial.yunohost}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Field>
          <Field label="Feature image" help="PNG, JPEG, WEBP, or SVG. This is the preview image.">
            {initial.featureImage ? (
              <img src={initial.featureImage} alt="" className="mb-2 h-24 w-auto rounded-sm border border-[#d5dde6] object-cover" />
            ) : null}
            <input
              className="text-sm"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              disabled={initial.yunohost}
              onChange={(event) => void onFile(event.target.files?.[0], setFeature)}
            />
          </Field>
          <Field label="Favicon" help="PNG, SVG, or ICO. Shown in the browser tab.">
            <input
              className="text-sm"
              type="file"
              accept="image/png,image/svg+xml,image/x-icon,image/webp"
              disabled={initial.yunohost}
              onChange={(event) => void onFile(event.target.files?.[0], setFavicon)}
            />
          </Field>
          <Field label="Custom HTML" help="You can use HTML. Basic styles apply to generic elements.">
            <textarea
              className={`${inputClass} font-mono`}
              rows={8}
              value={customHtml}
              disabled={initial.yunohost}
              onChange={(event) => setCustomHtml(event.target.value)}
              spellCheck={false}
            />
          </Field>
          <Field
            label="Custom CSS stylesheet"
            help="For admins customizing how the wall looks. This CSS is applied to the whole site."
          >
            <textarea
              className={`${inputClass} font-mono`}
              rows={8}
              value={customCss}
              disabled={initial.yunohost}
              onChange={(event) => setCustomCss(event.target.value)}
              spellCheck={false}
            />
          </Field>
          {message ? <p className="text-sm text-[#2f6f3e]">{message}</p> : null}
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="text-sm text-[#2f6f3e] underline-offset-2 hover:underline">
              Back to the wall
            </Link>
            <button
              type="submit"
              disabled={saving || initial.yunohost}
              className="h-10 rounded-md bg-[#2f9e44] px-4 text-sm font-medium text-white disabled:opacity-50"
            >
              {saving ? "Saving" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-md border border-[#c5d0db] bg-white px-3 py-2 text-sm text-[#1c2833] outline-none focus:border-[#2f9e44]";

function Field({ label, help, children }: { label: string; help: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium">{label}</span>
      {children}
      <span className="text-xs leading-relaxed text-[#607080]">{help}</span>
    </label>
  );
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}
