# Sixteen on YunoHost

Install from this git repository:

```bash
sudo yunohost app install https://github.com/wearenh/sixteen_ynh --debug
```

Use path `/` on the domain that should serve the wall. A saved wall is then:

```text
https://mydomain.tv/tv/<hash>
```

If you install the app at `/tv` instead, the public URL becomes `/tv/tv/<hash>`. Leave the path at `/` when the domain is dedicated to Sixteen.

## Site style

Site style is not a page in Sixteen. Open the YunoHost webadmin, then Applications → Sixteen → Site style. The fields match a domain Features page:

- Custom title
- Description
- Feature image
- Favicon
- Custom HTML
- Custom CSS stylesheet

Saving there writes the branding the wall inherits. The title and feature image are the Open Graph tags for X, Telegram, Signal, and Nextcloud Collectives. An oEmbed document is also published at `/api/oembed`.

If the panel was installed before 1.0~ynh2 and reports that `custom_html` was not initialized, upgrade from this repository:

```bash
sudo yunohost app upgrade sixteen -u https://github.com/wearenh/sixteen_ynh --debug
```

## Walls

The editor is the app's home page. Save link writes the layout to SQLite in the data directory and opens `/tv/<hash>`. The edit key is shown once and stored in that browser. Visitors can watch. They cannot edit unless they have the key (`#k=<key>` on the wall URL).

## Build

The first install compiles the Node app. It needs about 1.5 GB of RAM during `npm run build`.
