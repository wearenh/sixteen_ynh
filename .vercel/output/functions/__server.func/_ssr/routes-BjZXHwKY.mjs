import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Play, c as Download, i as RotateCcw, l as CircleHelp, n as Upload, o as Pencil, s as Fullscreen, t as X } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, f as Slot, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/@radix-ui/react-switch+[...].mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BjZXHwKY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function padCell(id) {
	return String(id).padStart(2, "0");
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-surface-2 text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)] hover:bg-surface",
			ghost: "text-muted hover:bg-surface-2 hover:text-fg",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			default: "h-10 px-4",
			sm: "h-8 px-3 text-xs",
			icon: "size-10",
			"icon-sm": "size-8"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-bg/80", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, container, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, {
	container: container ?? void 0,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		ref,
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-full max-w-xl -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg bg-surface p-6 text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent),0_24px_48px_-24px_rgba(0,0,0,0.6)]", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 inline-flex size-10 items-center justify-center rounded-sm text-muted transition-colors duration-150 hover:text-fg focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:outline-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})]
}));
DialogContent.displayName = DialogContent$1.displayName;
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("font-sans text-lg leading-snug font-medium tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm leading-normal text-muted", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-10 w-full rounded-sm bg-surface-2 px-3 text-sm text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[0_0_0_2px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted", className),
	...props
}));
Label.displayName = Root.displayName;
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full bg-surface-2 shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_16%,transparent)] transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:outline-none data-[state=checked]:bg-accent", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-fg transition-transform duration-150 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-accent-fg" })
}));
Switch.displayName = Switch$1.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-40 w-full resize-y rounded-sm bg-surface-2 px-3 py-2 font-mono text-xs leading-relaxed text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_12%,transparent)] outline-none transition-[box-shadow] duration-150 placeholder:text-subtle focus-visible:shadow-[0_0_0_2px_var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-40", className),
		ref,
		...props
	});
});
Textarea.displayName = "Textarea";
var WALL_WIDTH = 1920;
var WALL_HEIGHT = 1080;
var STORAGE_KEY = "sixteen-wall-v1";
var ACTIVE_CELL_IDS = [
	1,
	2,
	3,
	4,
	5,
	6,
	8,
	13,
	14,
	15,
	16
];
var SAMPLE = {
	bunny: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
	elephants: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
	blazes: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
	escapes: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
	fun: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
	joyrides: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
	meltdowns: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
	sintel: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
	tears: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
};
var STARTER_HTML = `<div class="wrap">
  <p class="kicker">Custom frame</p>
  <h1>Your code lives here</h1>
  <p>Replace this markup with any HTML, CSS, or a small script. Clocks, tickers, notes, iframes — this cell is a sandbox.</p>
</div>
<style>
  .wrap { height:100%; display:flex; flex-direction:column; justify-content:flex-end; gap:12px; }
  .kicker { margin:0; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#a1a1aa; }
  h1 { margin:0; font-size:28px; font-weight:500; letter-spacing:-0.03em; }
  p { margin:0; max-width:36ch; font-size:14px; line-height:1.5; color:#a1a1aa; }
</style>`;
var DEFAULT_CELLS = {
	1: {
		id: 1,
		type: "video",
		label: "CAM 01",
		src: SAMPLE.bunny,
		muted: true,
		loop: true,
		autoplay: true
	},
	2: {
		id: 2,
		type: "video",
		label: "CAM 02",
		src: SAMPLE.elephants,
		muted: true,
		loop: true,
		autoplay: true
	},
	3: {
		id: 3,
		type: "video",
		label: "CAM 03",
		src: SAMPLE.blazes,
		muted: true,
		loop: true,
		autoplay: true
	},
	4: {
		id: 4,
		type: "video",
		label: "CAM 04",
		src: SAMPLE.escapes,
		muted: true,
		loop: true,
		autoplay: true
	},
	5: {
		id: 5,
		type: "clock",
		label: "TIME",
		html: STARTER_HTML
	},
	6: {
		id: 6,
		type: "video",
		label: "PGM",
		src: SAMPLE.tears,
		muted: true,
		loop: true,
		autoplay: true
	},
	8: {
		id: 8,
		type: "html",
		label: "SLATE",
		html: `<div class="slate">
  <p class="kicker">Program</p>
  <h1>Evening block</h1>
  <ol>
    <li><span>19:00</span> Open + ident</li>
    <li><span>19:08</span> Feature A</li>
    <li><span>19:42</span> Hold / slate</li>
    <li><span>19:45</span> Feature B</li>
    <li><span>20:30</span> Close</li>
  </ol>
  <p class="foot">Edit this cell and paste any HTML you want in the side frame.</p>
</div>
<style>
  .slate { height:100%; display:flex; flex-direction:column; }
  .kicker { margin:0 0 8px; font-size:11px; letter-spacing:0.22em; text-transform:uppercase; color:#a1a1aa; }
  h1 { margin:0 0 28px; font-size:32px; font-weight:500; letter-spacing:-0.03em; }
  ol { list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:10px; flex:1; }
  li { display:flex; gap:16px; font-size:15px; color:#f4f4f5; border-top:1px solid #2a2a30; padding-top:10px; }
  li span { font-family: "IBM Plex Mono", ui-monospace, monospace; color:#a1a1aa; font-size:12px; min-width:4.5ch; }
  .foot { margin:24px 0 0; font-size:12px; line-height:1.5; color:#71717a; }
</style>`
	},
	13: {
		id: 13,
		type: "video",
		label: "CAM 05",
		src: SAMPLE.fun,
		muted: true,
		loop: true,
		autoplay: true
	},
	14: {
		id: 14,
		type: "video",
		label: "CAM 06",
		src: SAMPLE.joyrides,
		muted: true,
		loop: true,
		autoplay: true
	},
	15: {
		id: 15,
		type: "video",
		label: "CAM 07",
		src: SAMPLE.meltdowns,
		muted: true,
		loop: true,
		autoplay: true
	},
	16: {
		id: 16,
		type: "video",
		label: "CAM 08",
		src: SAMPLE.sintel,
		muted: true,
		loop: true,
		autoplay: true
	}
};
var TYPE_HELP = {
	video: "MP4, WebM, YouTube video or playlist, Vimeo, or a PeerTube video or playlist",
	iframe: "Any embed URL or iframe. YouTube and PeerTube playlist links are turned into players.",
	image: "Still image URL — fills the frame",
	html: "Raw HTML / CSS / JS, rendered in a sandbox",
	clock: "Live clock and date — no source needed",
	board: "Director board with source counts and stage lock"
};
function isActiveCellId(id) {
	return ACTIVE_CELL_IDS.includes(id);
}
function cloneDefaults() {
	return JSON.parse(JSON.stringify(DEFAULT_CELLS));
}
function serializeWall(cells) {
	return JSON.stringify({
		version: 1,
		name: "sixteen",
		cells
	}, null, 2);
}
function parseWallFile(text) {
	let data;
	try {
		data = JSON.parse(text);
	} catch {
		throw new Error("That file is not valid JSON.");
	}
	const record = data && typeof data === "object" && "cells" in data ? data.cells : data;
	if (!record || typeof record !== "object" || Array.isArray(record)) throw new Error("No frames found. Export a wall from Sixteen and import that file.");
	const cells = cloneDefaults();
	let found = 0;
	for (const [key, value] of Object.entries(record)) {
		const id = Number(key);
		if (!isActiveCellId(id) || !value || typeof value !== "object") continue;
		cells[id] = {
			...cells[id],
			...value,
			id
		};
		found += 1;
	}
	if (found === 0) throw new Error("No frames found. Export a wall from Sixteen and import that file.");
	return cells;
}
function persist(cells) {
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(cells));
	} catch {}
}
var useWallStore = create((set, get) => ({
	cells: cloneDefaults(),
	editMode: false,
	editingId: null,
	helpOpen: false,
	hydrated: false,
	hydrate: () => {
		let helpOpen = false;
		let cells = cloneDefaults();
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw);
				for (const [key, value] of Object.entries(parsed)) {
					const id = Number(key);
					if (isActiveCellId(id) && value && typeof value === "object") cells[id] = {
						...cells[id],
						...value,
						id
					};
				}
			}
		} catch {}
		set({
			cells,
			hydrated: true,
			helpOpen
		});
	},
	setEditMode: (value) => set({
		editMode: value,
		editingId: value ? get().editingId : null
	}),
	openEditor: (id) => set({
		editMode: true,
		editingId: id
	}),
	closeEditor: () => set({ editingId: null }),
	setHelpOpen: (value) => {
		set({ helpOpen: value });
		if (!value) try {
			localStorage.setItem("sixteen-seen-help", "1");
		} catch {}
	},
	updateCell: (id, patch) => {
		const cells = {
			...get().cells,
			[id]: {
				...get().cells[id],
				...patch,
				id
			}
		};
		persist(cells);
		set({ cells });
	},
	replaceCells: (cells) => {
		persist(cells);
		set({
			cells,
			editingId: null
		});
	},
	reset: () => {
		const cells = cloneDefaults();
		persist(cells);
		set({
			cells,
			editingId: null
		});
	}
}));
var TYPES = [
	"video",
	"iframe",
	"image",
	"html",
	"clock",
	"board"
];
function EditDialog({ container }) {
	const editingId = useWallStore((s) => s.editingId);
	const cells = useWallStore((s) => s.cells);
	const closeEditor = useWallStore((s) => s.closeEditor);
	const updateCell = useWallStore((s) => s.updateCell);
	const live = editingId ? cells[editingId] : null;
	const [draft, setDraft] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setDraft(live ? { ...live } : null);
	}, [live]);
	const open = Boolean(editingId && draft);
	function save() {
		if (!editingId || !draft) return;
		updateCell(editingId, draft);
		closeEditor();
	}
	function revert() {
		if (!editingId) return;
		const original = DEFAULT_CELLS[editingId];
		setDraft({ ...original });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => !next && closeEditor(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			container,
			className: cn((draft?.type === "html" || draft?.type === "iframe") && "max-w-2xl"),
			children: draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, { children: [
					"Cell ",
					padCell(draft.id),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-2 font-sans text-sm font-normal text-muted",
						children: [" ", draft.label]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Each frame is independent. Paste a video URL or drop HTML into a side cell." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Type" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-3 gap-1",
									children: TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDraft((d) => d ? {
											...d,
											type,
											html: d.html || STARTER_HTML
										} : d),
										className: cn("h-10 rounded-sm text-xs tracking-wide uppercase transition-colors duration-150", draft.type === type ? "bg-accent text-accent-fg" : "bg-surface-2 text-muted hover:text-fg"),
										children: type
									}, type))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs leading-normal text-subtle",
									children: TYPE_HELP[draft.type]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cell-label",
								children: "Label"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cell-label",
								value: draft.label,
								onChange: (e) => setDraft({
									...draft,
									label: e.target.value
								}),
								maxLength: 24
							})]
						}),
						draft.type === "video" || draft.type === "image" || draft.type === "iframe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cell-src",
								children: draft.type === "iframe" ? "Embed URL" : "Source"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "cell-src",
								value: draft.src ?? "",
								onChange: (e) => setDraft({
									...draft,
									src: e.target.value
								}),
								placeholder: draft.type === "image" ? "https://…jpg" : draft.type === "iframe" ? "https://…/embed/…  or a playlist URL" : "mp4, YouTube, playlist, or PeerTube"
							})]
						}) : null,
						draft.type === "html" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "cell-html",
								children: "HTML"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								id: "cell-html",
								value: draft.html ?? "",
								onChange: (e) => setDraft({
									...draft,
									html: e.target.value
								}),
								rows: 12,
								spellCheck: false
							})]
						}) : null,
						draft.type === "video" || draft.type === "iframe" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									id: "muted",
									label: "Muted",
									checked: draft.muted !== false,
									onCheckedChange: (muted) => setDraft({
										...draft,
										muted
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									id: "loop",
									label: "Loop",
									checked: draft.loop !== false,
									onCheckedChange: (loop) => setDraft({
										...draft,
										loop
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									id: "autoplay",
									label: "Autoplay",
									checked: draft.autoplay !== false,
									onCheckedChange: (autoplay) => setDraft({
										...draft,
										autoplay
									})
								})
							]
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						onClick: revert,
						children: "Revert cell"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						onClick: closeEditor,
						children: "Cancel"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: save,
						children: "Save frame"
					})
				] })
			] }) : null
		})
	});
}
function Toggle({ id, label, checked, onCheckedChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
			id,
			checked,
			onCheckedChange
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			htmlFor: id,
			className: "text-sm text-fg",
			children: label
		})]
	});
}
function Toolbar({ onFullscreen, hidden }) {
	const editMode = useWallStore((s) => s.editMode);
	const setEditMode = useWallStore((s) => s.setEditMode);
	const setHelpOpen = useWallStore((s) => s.setHelpOpen);
	const reset = useWallStore((s) => s.reset);
	const cells = useWallStore((s) => s.cells);
	const replaceCells = useWallStore((s) => s.replaceCells);
	const fileRef = (0, import_react.useRef)(null);
	function exportWall() {
		const blob = new Blob([serializeWall(cells)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = "sixteen-wall.json";
		link.click();
		URL.revokeObjectURL(url);
	}
	function importWall(file) {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				replaceCells(parseWallFile(String(reader.result ?? "")));
			} catch (error) {
				window.alert(error instanceof Error ? error.message : "Could not import that file.");
			}
		};
		reader.readAsText(file);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: hidden ? "hidden" : "z-30 flex shrink-0 items-center justify-between gap-3 border-b border-border bg-bg px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium tracking-widest text-fg uppercase",
				children: "Sixteen"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden font-mono text-xs tracking-wide text-subtle uppercase sm:block",
				children: "1920 × 1080"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: editMode ? "default" : "ghost",
					onClick: () => setEditMode(!editMode),
					"aria-pressed": editMode,
					"aria-label": editMode ? "Exit edit mode" : "Enter edit mode",
					title: "Edit frames (E)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: onFullscreen,
					"aria-label": "Fullscreen",
					title: "Fullscreen (F)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fullscreen, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: exportWall,
					"aria-label": "Export wall",
					title: "Export wall",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: () => fileRef.current?.click(),
					"aria-label": "Import wall",
					title: "Import wall",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: fileRef,
					type: "file",
					accept: "application/json,.json",
					className: "sr-only",
					onChange: (event) => {
						const file = event.target.files?.[0];
						event.target.value = "";
						if (file) importWall(file);
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: () => {
						if (window.confirm("Reset every frame to the default wall?")) reset();
					},
					"aria-label": "Reset wall",
					title: "Reset wall",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "icon-sm",
					variant: "ghost",
					onClick: () => setHelpOpen(true),
					"aria-label": "Help",
					title: "Help",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, {})
				})
			]
		})]
	});
}
function HelpDialog({ container }) {
	const helpOpen = useWallStore((s) => s.helpOpen);
	const setHelpOpen = useWallStore((s) => s.setHelpOpen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: helpOpen,
		onOpenChange: setHelpOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			container,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Sixteen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "A 16-cell wall locked to 1920×1080 fullscreen. Four cameras on top, four on the bottom, a program window the size of four cells in the center, and two custom frames on the sides." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-col gap-3 text-sm leading-normal text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-fg",
						children: "E"
					}), " — toggle edit mode, then click any frame to change its source, label, or HTML."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-fg",
						children: "F"
					}), " — fullscreen. The wall fills the screen and the bar hides. Press F again or Escape to leave."] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Video cells take an MP4, a YouTube video or playlist, Vimeo, or a PeerTube video or playlist. Iframe cells take any embed URL." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Edits stay in this browser. Download saves a JSON file; upload restores one. Reset restores the sample wall." })
				]
			})]
		})
	});
}
function EditBanner() {
	if (!useWallStore((s) => s.editMode)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "pointer-events-none absolute inset-x-0 bottom-3 z-30 text-center font-mono text-xs tracking-widest text-muted uppercase",
		children: "Edit mode — click a frame"
	});
}
function wrapHtmlDocument(html) {
	const trimmed = html.trim();
	if (/<!doctype/i.test(trimmed) || /<html[\s>]/i.test(trimmed)) return trimmed;
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    html, body { margin: 0; height: 100%; background: #121214; color: #f4f4f5; font-family: Outfit, ui-sans-serif, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
    body { padding: 40px 24px 24px; box-sizing: border-box; overflow: auto; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
${trimmed}
</body>
</html>`;
}
var FILE = /\.(mp4|webm|ogg|ogv|mov|m4v)(\?.*)?$/i;
var YT_HOST = /^(?:www\.|m\.|music\.)?(?:youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;
function flag(on, fallback = true) {
	return on === false ? "0" : fallback ? "1" : "0";
}
function asUrl(value) {
	try {
		return new URL(value);
	} catch {
		return null;
	}
}
function iframeSrcFromMarkup(value) {
	return value.match(/<iframe\b[^>]*\ssrc=["']([^"']+)["']/i)?.[1]?.trim() || null;
}
function parseYoutube(url) {
	const host = url.hostname.replace(/^www\./, "");
	if (!YT_HOST.test(url.hostname) && host !== "youtu.be") return null;
	const list = url.searchParams.get("list")?.trim() || "";
	let videoId = url.searchParams.get("v")?.trim() || "";
	const parts = url.pathname.split("/").filter(Boolean);
	if (host === "youtu.be" || url.hostname === "youtu.be") videoId = parts[0] ?? "";
	else if (parts[0] === "embed" && parts[1] && parts[1] !== "videoseries") videoId = parts[1];
	else if (parts[0] === "shorts" || parts[0] === "live") videoId = parts[1] ?? "";
	else if (parts[0] === "playlist" || parts[1] === "videoseries") videoId = "";
	if (list && !videoId) return {
		kind: "youtube-playlist",
		id: list
	};
	if (videoId && list) return {
		kind: "youtube",
		id: videoId,
		list
	};
	if (videoId) return {
		kind: "youtube",
		id: videoId
	};
	if (list) return {
		kind: "youtube-playlist",
		id: list
	};
	return null;
}
function parsePeerTube(url) {
	if (YT_HOST.test(url.hostname) || /vimeo\.com$/i.test(url.hostname)) return null;
	const parts = url.pathname.split("/").filter(Boolean);
	const origin = url.origin;
	if (parts[0] === "w" && parts[1] === "p" && parts[2]) return {
		kind: "peertube-playlist",
		origin,
		id: parts[2]
	};
	if (parts[0] === "video-playlists" && parts[1] === "embed" && parts[2]) return {
		kind: "peertube-playlist",
		origin,
		id: parts[2]
	};
	if (parts[0] === "videos" && parts[1] === "watch" && parts[2] === "playlist" && parts[3]) return {
		kind: "peertube-playlist",
		origin,
		id: parts[3]
	};
	if (parts[0] === "w" && parts[1]) return {
		kind: "peertube",
		origin,
		id: parts[1]
	};
	if (parts[0] === "videos" && (parts[1] === "watch" || parts[1] === "embed") && parts[2]) return {
		kind: "peertube",
		origin,
		id: parts[2]
	};
	return null;
}
function parseMedia(src) {
	const raw = src.trim();
	if (!raw) return {
		kind: "unknown",
		src: raw
	};
	const value = iframeSrcFromMarkup(raw) ?? raw;
	const url = asUrl(value);
	if (url) {
		const youtube = parseYoutube(url);
		if (youtube) return youtube;
		const vimeo = value.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
		if (vimeo?.[1]) return {
			kind: "vimeo",
			id: vimeo[1]
		};
		const peer = parsePeerTube(url);
		if (peer) return peer;
		if (FILE.test(url.pathname) || value.startsWith("blob:") || value.startsWith("data:video")) return {
			kind: "file",
			src: value
		};
		if (url.protocol === "http:" || url.protocol === "https:") return {
			kind: "iframe",
			src: value
		};
	}
	if (FILE.test(value) || value.startsWith("blob:") || value.startsWith("data:video")) return {
		kind: "file",
		src: value
	};
	if (/^[A-Za-z0-9_-]{11}$/.test(value)) return {
		kind: "youtube",
		id: value
	};
	return {
		kind: "unknown",
		src: value
	};
}
function youtubeEmbed(id, list, opts) {
	const q = new URLSearchParams({
		autoplay: flag(opts.autoplay),
		mute: flag(opts.muted),
		rel: "0",
		modestbranding: "1",
		playsinline: "1",
		iv_load_policy: "3"
	});
	if (opts.loop !== false) {
		q.set("loop", "1");
		q.set("playlist", list || id);
	}
	if (list) q.set("list", list);
	return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}
function youtubePlaylistEmbed(id, opts) {
	const q = new URLSearchParams({
		list: id,
		autoplay: flag(opts.autoplay),
		mute: flag(opts.muted),
		rel: "0",
		modestbranding: "1",
		playsinline: "1"
	});
	if (opts.loop !== false) q.set("loop", "1");
	return `https://www.youtube-nocookie.com/embed/videoseries?${q.toString()}`;
}
function vimeoEmbed(id, opts) {
	return `https://player.vimeo.com/video/${id}?${new URLSearchParams({
		autoplay: flag(opts.autoplay),
		muted: flag(opts.muted),
		loop: flag(opts.loop),
		background: "1",
		title: "0",
		byline: "0",
		portrait: "0"
	}).toString()}`;
}
function peertubeEmbed(origin, id, playlist, opts) {
	const q = new URLSearchParams({
		autoplay: flag(opts.autoplay),
		muted: flag(opts.muted),
		loop: flag(opts.loop),
		title: "0",
		warningTitle: "0",
		peertubeLink: "0",
		p2p: "0",
		controls: "0"
	});
	return `${origin}/${playlist ? "video-playlists" : "videos"}/embed/${encodeURIComponent(id)}?${q.toString()}`;
}
function resolveEmbed(src, opts) {
	const parsed = parseMedia(src);
	switch (parsed.kind) {
		case "youtube": return youtubeEmbed(parsed.id, parsed.list, opts);
		case "youtube-playlist": return youtubePlaylistEmbed(parsed.id, opts);
		case "vimeo": return vimeoEmbed(parsed.id, opts);
		case "peertube": return peertubeEmbed(parsed.origin, parsed.id, false, opts);
		case "peertube-playlist": return peertubeEmbed(parsed.origin, parsed.id, true, opts);
		case "iframe": return parsed.src;
		default: return null;
	}
}
function Frame({ cell, editMode, onEdit, autoPlay, featured }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "frame-inner",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameBody, {
				cell,
				autoPlay: autoPlay ?? cell.autoplay !== false,
				featured
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FrameChrome, {
				cell,
				featured
			}),
			editMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: onEdit,
				className: "absolute inset-0 z-20 flex items-end justify-end p-2",
				"aria-label": `Edit cell ${padCell(cell.id)} ${cell.label}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5 rounded-sm bg-surface px-2 py-1 text-xs text-fg shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-fg)_14%,transparent)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), padCell(cell.id)]
				})
			}) : null
		]
	});
}
function FrameBody({ cell, autoPlay, featured }) {
	switch (cell.type) {
		case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoBody, {
			cell,
			autoPlay,
			featured
		});
		case "iframe": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmbedBody, { cell });
		case "image": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageBody, { cell });
		case "html": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HtmlBody, { cell });
		case "clock": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClockBody, {});
		case "board": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BoardBody, {});
		default: return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBody, { label: "Unknown type" });
	}
}
function VideoBody({ cell, autoPlay, featured }) {
	const parsed = (0, import_react.useMemo)(() => parseMedia(cell.src ?? ""), [cell.src]);
	const embed = (0, import_react.useMemo)(() => resolveEmbed(cell.src ?? "", {
		muted: cell.muted,
		loop: cell.loop,
		autoplay: cell.autoplay
	}), [
		cell.src,
		cell.muted,
		cell.loop,
		cell.autoplay
	]);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [playing, setPlaying] = (0, import_react.useState)(autoPlay);
	(0, import_react.useEffect)(() => {
		setReady(false);
		setPlaying(autoPlay);
	}, [cell.src, autoPlay]);
	if (!cell.src?.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBody, { label: "No video source" });
	if (embed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerFrame, {
		title: cell.label,
		src: embed
	});
	if (parsed.kind !== "file") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBody, { label: "Unrecognized video link" });
	if (!playing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick: () => setPlaying(true),
		className: "absolute inset-0 flex items-center justify-center bg-surface",
		"aria-label": `Play ${cell.label}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "inline-flex size-12 items-center justify-center rounded-full bg-accent text-accent-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-5 translate-x-px" })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdleLabel, { cell }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
		src: parsed.src,
		muted: cell.muted !== false,
		loop: cell.loop !== false,
		autoPlay: true,
		playsInline: true,
		preload: featured ? "auto" : "metadata",
		onCanPlay: () => setReady(true),
		className: cn("transition-opacity duration-300", ready ? "opacity-100" : "opacity-0")
	}, parsed.src)] });
}
function EmbedBody({ cell }) {
	const src = (0, import_react.useMemo)(() => resolveEmbed(cell.src ?? "", {
		muted: cell.muted !== false,
		loop: cell.loop !== false,
		autoplay: cell.autoplay !== false
	}) ?? cell.src?.trim() ?? "", [
		cell.src,
		cell.muted,
		cell.loop,
		cell.autoplay
	]);
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBody, { label: "No embed URL" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayerFrame, {
		title: cell.label,
		src
	});
}
function PlayerFrame({ title, src }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex items-center justify-center bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-subtle uppercase",
			children: title
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		src,
		title,
		allow: "autoplay; encrypted-media; picture-in-picture; fullscreen",
		allowFullScreen: true,
		referrerPolicy: "strict-origin-when-cross-origin",
		className: cn("transition-opacity duration-300", ready ? "opacity-100" : "opacity-0"),
		onLoad: () => setReady(true)
	}, src)] });
}
function ImageBody({ cell }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (!cell.src?.trim() || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyBody, { label: failed ? "Image failed to load" : "No image source" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: cell.src,
		alt: cell.label,
		className: "outline outline-1 -outline-offset-1 outline-fg/10",
		onError: () => setFailed(true)
	});
}
function HtmlBody({ cell }) {
	const srcDoc = wrapHtmlDocument(cell.html ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
		title: cell.label,
		srcDoc,
		sandbox: "allow-scripts allow-popups allow-popups-to-escape-sandbox",
		className: "bg-surface"
	});
}
function ClockBody() {
	const [now, setNow] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	const time = now ? new Intl.DateTimeFormat(void 0, {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false
	}).format(now) : "--:--:--";
	const date = now ? new Intl.DateTimeFormat(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	}).format(now) : "\xA0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col justify-between bg-surface px-6 pt-12 pb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Local time"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 font-sans text-6xl leading-none font-medium tracking-tight text-fg tabular-nums",
				children: time
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: date
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-t border-border pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-wide text-subtle uppercase",
				children: "Stage lock"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs text-muted tabular-nums",
				children: "1920 × 1080"
			})]
		})]
	});
}
function BoardBody() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 flex flex-col justify-between bg-surface px-6 pt-12 pb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-widest text-muted uppercase",
				children: "Director"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 text-3xl leading-tight font-medium tracking-tight",
				children: "Sixteen"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xs text-sm leading-normal text-muted",
				children: "4×4 grid. Eight cameras, one program, two custom frames."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Canvas",
					value: "1920×1080"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Cells",
					value: "16"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Sources",
					value: "9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Sides",
					value: "2"
				})
			]
		})]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-xs tracking-wide text-subtle uppercase",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-1 font-mono text-sm text-fg tabular-nums",
		children: value
	})] });
}
function IdleLabel({ cell }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex items-center justify-center bg-surface",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-xs tracking-widest text-subtle uppercase",
			children: cell.label
		})
	});
}
function EmptyBody({ label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 flex items-center justify-center bg-surface px-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: label
		})
	});
}
function FrameChrome({ cell, featured }) {
	const isVideo = cell.type === "video" || cell.type === "iframe";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-x-0 top-0 z-10 flex h-10 items-center justify-between frame-chrome px-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs tracking-widest text-fg tabular-nums",
				children: padCell(cell.id)
			}), isVideo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "inline-flex items-center gap-1 text-xs tracking-widest text-live uppercase",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-live" }), "Live"]
			}) : null]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("truncate text-xs tracking-wide text-muted uppercase", featured && "text-fg"),
			children: cell.label
		})]
	});
}
var SMALL = [
	1,
	2,
	3,
	4,
	13,
	14,
	15,
	16
];
function WallStack({ cells, editMode, onEdit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col gap-2 px-3 py-3 pb-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative aspect-video overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
					cell: cells[6],
					editMode,
					onEdit: () => onEdit(6),
					featured: true,
					autoPlay: true
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: SMALL.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative aspect-video overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						cell: cells[id],
						editMode,
						onEdit: () => onEdit(id),
						autoPlay: false
					})
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-80 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						cell: cells[5],
						editMode,
						onEdit: () => onEdit(5)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative min-h-80 overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						cell: cells[8],
						editMode,
						onEdit: () => onEdit(8)
					})
				})]
			})
		]
	});
}
function WallTable({ cells, editMode, onEdit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
		className: "wall",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
				className: "sr-only",
				children: "Sixteen-cell video wall. Four videos along the top, four along the bottom, a 2 by 2 program in the center, and two custom frames on the sides."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("colgroup", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "col" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "col" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "col" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("col", { className: "col" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "row-top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[1],
								editMode,
								onEdit: () => onEdit(1)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[2],
								editMode,
								onEdit: () => onEdit(2)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[3],
								editMode,
								onEdit: () => onEdit(3)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[4],
								editMode,
								onEdit: () => onEdit(4)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "row-mid",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-side",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[5],
								editMode,
								onEdit: () => onEdit(5)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-center",
							colSpan: 2,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[6],
								editMode,
								onEdit: () => onEdit(6),
								featured: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-side",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[8],
								editMode,
								onEdit: () => onEdit(8)
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "row-bottom",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[13],
								editMode,
								onEdit: () => onEdit(13)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[14],
								editMode,
								onEdit: () => onEdit(14)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[15],
								editMode,
								onEdit: () => onEdit(15)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "cell-1x1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								cell: cells[16],
								editMode,
								onEdit: () => onEdit(16)
							})
						})
					]
				})
			] })
		]
	});
}
var STACK_BREAKPOINT = 900;
function fitStage(w, h) {
	let width = w;
	let height = w * WALL_HEIGHT / WALL_WIDTH;
	if (height > h) {
		height = h;
		width = h * WALL_WIDTH / WALL_HEIGHT;
	}
	if (w - width < 2) width = w;
	if (h - height < 2) height = h;
	return {
		width: Math.max(0, width),
		height: Math.max(0, height)
	};
}
function Sixteen() {
	const wrapRef = (0, import_react.useRef)(null);
	const viewRef = (0, import_react.useRef)(null);
	const [box, setBox] = (0, import_react.useState)({
		width: WALL_WIDTH,
		height: WALL_HEIGHT
	});
	const [stacked, setStacked] = (0, import_react.useState)(false);
	const [fullscreen, setFullscreen] = (0, import_react.useState)(false);
	const [portal, setPortal] = (0, import_react.useState)(null);
	const cells = useWallStore((s) => s.cells);
	const editMode = useWallStore((s) => s.editMode);
	const setEditMode = useWallStore((s) => s.setEditMode);
	const openEditor = useWallStore((s) => s.openEditor);
	const closeEditor = useWallStore((s) => s.closeEditor);
	const hydrate = useWallStore((s) => s.hydrate);
	const setHelpOpen = useWallStore((s) => s.setHelpOpen);
	(0, import_react.useEffect)(() => {
		hydrate();
		setPortal(wrapRef.current);
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		const onChange = () => {
			setFullscreen(document.fullscreenElement === wrapRef.current);
		};
		document.addEventListener("fullscreenchange", onChange);
		return () => document.removeEventListener("fullscreenchange", onChange);
	}, []);
	(0, import_react.useEffect)(() => {
		const view = viewRef.current;
		if (!view) return;
		const fit = () => {
			const w = view.clientWidth;
			const h = view.clientHeight;
			const fs = document.fullscreenElement === wrapRef.current;
			setStacked(!fs && w < STACK_BREAKPOINT);
			if ((fs || w >= STACK_BREAKPOINT) && w > 0 && h > 0) setBox(fitStage(w, h));
		};
		fit();
		const observer = new ResizeObserver(fit);
		observer.observe(view);
		window.addEventListener("resize", fit);
		return () => {
			observer.disconnect();
			window.removeEventListener("resize", fit);
		};
	}, [fullscreen]);
	(0, import_react.useEffect)(() => {
		function onKey(event) {
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable)) return;
			if (event.key === "e" || event.key === "E") {
				event.preventDefault();
				setEditMode(!useWallStore.getState().editMode);
			} else if (event.key === "f" || event.key === "F") {
				event.preventDefault();
				toggleFullscreen();
			} else if (event.key === "?" || event.key === "h" || event.key === "H") {
				event.preventDefault();
				setHelpOpen(true);
			} else if (event.key === "Escape" && !document.fullscreenElement) {
				if (useWallStore.getState().editingId) closeEditor();
				else setEditMode(false);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		closeEditor,
		setEditMode,
		setHelpOpen
	]);
	function toggleFullscreen() {
		const node = wrapRef.current;
		if (!node) return;
		if (document.fullscreenElement) {
			document.exitFullscreen();
			return;
		}
		node.requestFullscreen().catch(() => {});
	}
	function onEdit(id) {
		openEditor(id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "sixteen-root flex h-dvh w-dvw flex-col overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toolbar, {
				onFullscreen: toggleFullscreen,
				hidden: fullscreen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: viewRef,
				className: "relative min-h-0 flex-1",
				children: [stacked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-full overflow-y-auto overflow-x-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WallStack, {
						cells,
						editMode,
						onEdit
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full w-full items-center justify-center overflow-hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-bg",
						style: {
							width: box.width,
							height: box.height
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WallTable, {
							cells,
							editMode,
							onEdit
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditBanner, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditDialog, { container: portal }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpDialog, { container: portal })
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sixteen, {});
}
//#endregion
export { Home as component };
