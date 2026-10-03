export function wrapHtmlDocument(html: string) {
  const trimmed = html.trim();
  if (/<!doctype/i.test(trimmed) || /<html[\s>]/i.test(trimmed)) {
    return trimmed;
  }
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
