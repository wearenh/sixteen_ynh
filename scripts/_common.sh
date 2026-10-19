#!/bin/bash

nodejs_version=22

# YunoHost turns default = "" into "no default". A question in that state
# must already exist in settings.yml or the webadmin panel will not open.
ensure_style_settings() {
    site_title="${site_title:-Sixteen}"
    site_description="${site_description:-A 16-cell video wall.}"
    custom_html="${custom_html-}"
    custom_css="${custom_css-}"
    ynh_app_setting_set --key=site_title --value="$site_title"
    ynh_app_setting_set --key=site_description --value="$site_description"
    ynh_app_setting_set --key=custom_html --value="$custom_html"
    ynh_app_setting_set --key=custom_css --value="$custom_css"
}

# Save every style field, then rewrite branding.json. Custom setters replace
# YunoHost's default writer, so the setting has to be stored here or the
# next time the panel opens the question looks uninitialized.
persist_style() {
    ynh_app_setting_set --key=site_title --value="${site_title:-Sixteen}"
    ynh_app_setting_set --key=site_description --value="${site_description:-A 16-cell video wall.}"
    ynh_app_setting_set --key=custom_html --value="${custom_html-}"
    ynh_app_setting_set --key=custom_css --value="${custom_css-}"
    write_branding
}

write_branding() {
    mkdir -p "$data_dir/brand"
    site_title="${site_title:-Sixteen}"
    site_description="${site_description:-A 16-cell video wall.}"
    custom_html="${custom_html:-}"
    custom_css="${custom_css:-}"
    feature_image="${feature_image:-}"
    favicon="${favicon:-}"
    export site_title site_description custom_html custom_css feature_image favicon
    python3 - "$data_dir" <<'PY'
import json, os, shutil, sys
data = sys.argv[1]
brand_dir = os.path.join(data, "brand")
os.makedirs(brand_dir, exist_ok=True)

def copy_upload(src, kind):
    if not src or not os.path.isfile(src):
        return
    ext = src.rsplit(".", 1)[-1].lower()
    if ext not in {"png", "jpg", "jpeg", "webp", "svg", "ico"}:
        return
    for name in os.listdir(brand_dir):
        if name.startswith(kind + "."):
            os.remove(os.path.join(brand_dir, name))
    shutil.copy(src, os.path.join(brand_dir, f"{kind}.{ext}"))

copy_upload(os.environ.get("feature_image", ""), "feature")
copy_upload(os.environ.get("favicon", ""), "favicon")
doc = {
    "site_title": os.environ.get("site_title") or "Sixteen",
    "site_description": os.environ.get("site_description") or "",
    "custom_html": os.environ.get("custom_html") or "",
    "custom_css": os.environ.get("custom_css") or "",
}
with open(os.path.join(data, "branding.json"), "w", encoding="utf-8") as handle:
    json.dump(doc, handle, indent=2)
    handle.write("\n")
PY
    chown -R "$app:$app" "$data_dir"
}
