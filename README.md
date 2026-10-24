# HANA Media House

A complete, responsive English website built with semantic HTML, CSS, and native JavaScript. No framework, runtime dependencies, database, payment processing, analytics, or login. Original SVG illustrations are included; the supplied mockup is not used as an image.

## Run and build

Use Node.js 20 or later. No install step is necessary.

```sh
npm run dev        # http://localhost:5173
npm run check      # syntax, content, anchors, assets
npm test           # WhatsApp encoding and message coverage
npm run build      # creates dist/
node scripts/serve.mjs --dist  # preview the production build
```

## Edit content

`content.js` is the central content/configuration file. Edit brand text, the digits-only WhatsApp number, navigation, services and coverage notes, portfolio categories/items, About text, benefits, project assistant options, and section headings there. Keep navigation IDs aligned with section IDs in `index.html`. Short interface labels and the form layout live in `app.js` and `index.html`; styling lives in `styles.css`.

Set `seo.siteUrl` to the final absolute URL including a trailing slash before publication. The build generates canonical and Open Graph metadata, structured ProfessionalService/service data, robots.txt and a sitemap when a URL is configured. Until then, no domain is invented. Social link fields are intentionally empty; add only verified URLs. They populate structured data, and you can add visible social links in the footer if needed.

## Replace portfolio media

All current cards are explicitly illustrative placeholders, not completed client work. Replace each item's `image` with a local WebP/JPEG or SVG path in `assets/`, edit its descriptive `alt`, title, category and description, then set `placeholder: false` only for authorized real work. Keep categories consistent with `categories` for filtering. Set `video` to a local MP4/WebM path to enable playback in the accessible dialog. Without a video, the preview honestly explains that a video has not been added. Food and dairy feature cards are separately editable at `food.cards`.

Prefer compressed thumbnails (roughly 900px wide and under 150KB) and compressed video exports. No videos autoplay or download until a preview is opened. Below-the-fold images lazy-load. The included art is original and lightweight, with no third-party image or font requests.

## Project and contact flows

The eight-step assistant supports multi-select services, industry, location, engagement, timeline, name, optional business and optional details. It validates required answers, shows a review summary, and links to `https://wa.me/19492573300` with encoded answers. Back edits are supported. The contact form validates name and a message of at least 10 characters. It opens WhatsApp and leaves a fallback link in the page. No message is automatically sent: visitors review and send within WhatsApp. Answers are held only in memory and reset on reload. No personal information is sent to a server or persisted by this site.

## Publish

This repository includes `.github/workflows/pages.yml`. For GitHub Pages, choose **Settings → Pages → Source → GitHub Actions**, then manually run the workflow from the Actions tab when you are ready to deploy. Pushes do not trigger deployment. The workflow checks, tests, builds and deploys `dist/`. The current remote is preserved. No other repository is used.

For Netlify, Cloudflare Pages, or another static host, use `npm run build` as the build command and `dist` as the output directory. All paths are relative, so repository subpath hosting works. For a custom domain, configure it at your chosen host and add its DNS records using the provider's instructions; update `seo.siteUrl` and rebuild afterward. A `CNAME` is deliberately not included because no domain has been supplied.

## Accessibility and verification

Keyboard focus styles, a skip link, semantic landmarks, labeled forms, native radio/checkbox controls, filter pressed states, live status feedback, modal focus management and Escape handling are included. Motion respects reduced-motion preferences. Test real media after replacing placeholders and verify the final domain's metadata and WhatsApp handoff on your own devices. No fake clients, testimonials, team members, prices or performance statistics are included.

## Standalone preview

`output/HANA-preview.html` is a working preview that can be opened directly in a browser. Keep its generated `output/assets/gulf/` directory alongside it for video playback. Regenerate it after edits with:

```sh
npm run build
node scripts/package-preview.mjs output
```

The preview embeds the configuration, JavaScript, styles and artwork; videos remain separate local files loaded on click. Production hosting should use `dist/` instead.

## Gulf Projects — Restaurant & Food Content

`content.gulf.items` contains genuine Gulf Region work, separate from the illustrative portfolio and AI food advertising. Append new authorized projects to this array; never replace or remove existing entries when adding work. There is no fixed count. Keep stable unique `id` values, add a local MP4 and an actual-footage WebP thumbnail to `assets/gulf/`, and record the original width, height and duration. Existing uploads use H.264/AAC with fast-start metadata, without re-encoding the picture or audio. Thumbnails and playback preserve the full frame. Native playback controls, an explicit volume slider, mute and fullscreen controls are available in the media dialog. Videos are only mounted/requested after a visitor clicks a project; there is no background video preloading or autoplay. Playback stops and media sources are released when the dialog closes. Mobile volume may also be controlled through the device's hardware volume controls.

Use only “Gulf Region” in site labels and descriptions. These portfolio items do not imply a Gulf branch or U.S. production. Do not infer client names or campaign results. The deferred `1.mp4` is not included and has no placeholder. Add its compressed version later as a new item in this same array once supplied and authorized.
