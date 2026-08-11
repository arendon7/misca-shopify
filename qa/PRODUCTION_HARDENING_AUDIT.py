from pathlib import Path
import json, re, sys

theme = Path(__file__).resolve().parents[1] / "theme"
errors = []
warnings = []

# JSON validity.
for p in theme.rglob("*.json"):
    try:
        json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:
        errors.append(f"{p.relative_to(theme)} invalid JSON: {e}")

# Schema JSON validity.
for p in (theme / "sections").glob("*.liquid"):
    text = p.read_text(encoding="utf-8")
    m = re.search(r"{%\s*schema\s*%}(.*?){%\s*endschema\s*%}", text, re.S)
    if m:
        try:
            json.loads(m.group(1).strip())
        except Exception as e:
            errors.append(f"{p.name} invalid schema JSON: {e}")

# No Liquid inside normal CSS/JS assets.
for p in list((theme/"assets").glob("*.css")) + list((theme/"assets").glob("*.js")):
    txt = p.read_text(encoding="utf-8")
    if "{{" in txt or "{%" in txt:
        errors.append(f"{p.name}: Liquid found in static asset")

# Template section references exist.
section_types = {p.stem for p in (theme/"sections").glob("*.liquid")}
for p in (theme/"templates").rglob("*.json"):
    obj = json.loads(p.read_text(encoding="utf-8"))
    for sid, section in obj.get("sections", {}).items():
        stype = section.get("type")
        if stype and stype not in section_types:
            errors.append(f"{p.relative_to(theme)} references missing section {stype}")

# Rendered snippets exist.
snippets = {p.stem for p in (theme/"snippets").glob("*.liquid")}
for p in theme.rglob("*.liquid"):
    txt = p.read_text(encoding="utf-8")
    for name in re.findall(r"{%\s*render\s+['\"]([^'\"]+)['\"]", txt):
        if name not in snippets:
            errors.append(f"{p.relative_to(theme)} renders missing snippet {name}")

# Deprecated include tag.
for p in theme.rglob("*.liquid"):
    if re.search(r"{%\s*include\b", p.read_text(encoding="utf-8")):
        errors.append(f"{p.relative_to(theme)} uses deprecated include tag")

# Customer-facing admin phrases.
admin_phrases = [
    "Completa el metafield",
    "Completa custom.",
    "Configura la promesa",
    "Selecciona un metaobject",
]
for p in (theme/"sections").glob("*.liquid"):
    txt = p.read_text(encoding="utf-8")
    for phrase in admin_phrases:
        if phrase in txt:
            warnings.append(f"{p.name}: construction phrase remains: {phrase}")

# Product rich snippets.
product_section = (theme/"sections"/"main-product.liquid").read_text(encoding="utf-8")
if "product | structured_data" not in product_section:
    errors.append("main-product.liquid: missing Shopify structured_data output")

# Critical head metadata.
layout = (theme/"layout"/"theme.liquid").read_text(encoding="utf-8")
for token in ["canonical_url", "page_title", "page_description", "content_for_header", "content_for_layout"]:
    if token not in layout:
        errors.append(f"theme.liquid missing {token}")

# Empty dynamic CTA risk patterns.
cta_patterns = [
    r'href="{{\s*section\.settings\.primary_link\s*}}"',
    r'href="{{\s*section\.settings\.secondary_link\s*}}"',
    r'href="{{\s*section\.settings\.button_link\s*}}"',
]
for p in (theme/"sections").glob("*.liquid"):
    txt = p.read_text(encoding="utf-8")
    for pat in cta_patterns:
        if re.search(pat, txt) and "!= blank" not in txt:
            warnings.append(f"{p.name}: dynamic CTA should be guarded against blank link")

report = {"errors": errors, "warnings": warnings, "pass": not errors}
print(json.dumps(report, ensure_ascii=False, indent=2))
sys.exit(1 if errors else 0)
