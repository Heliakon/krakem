# Krakem

A static, four-page site for writing better AI prompts:

- **Prompt creator** (`/`): turns a task description, task type, answer format, and optional source material into a complete prompt.
- **Humanize** (`/humanize/`): turns readers, original text, and an optional voice sample into an editing brief in English, Polish, or Portuguese.
- **Claude setup** (`/claude/`): a concise, coding-focused CLAUDE.md to preview, copy, or download, and a short guide to Claude Code output styles. Its section links branch from the menu item in the header.
- **Evidence** (`/evidence/`): sourced checks of the claims behind the site, plus a dated review of eight skill and plugin repositories.

The site composes prompts in the browser. It does not call an AI model, and no visitor text is sent over the network.

## Use it

- **Online:** https://heliakon.github.io/krakem/
- **CLAUDE.md:** [download the coding rules](https://heliakon.github.io/krakem/assets/downloads/CLAUDE.md) or preview them on the [Claude setup page](https://heliakon.github.io/krakem/claude/#claude-md).

## Source

- `content/`: page bodies. Edit these, not `dist/`.
- `assets/`: styles, scripts, artwork, the social preview image, and `downloads/CLAUDE.md`.
  - `prompt.js` and `humanize-brief.js` compose prompts. `guide.js` and `humanize.js` connect them to the forms.
  - `drafts.js` keeps unfinished form drafts in `sessionStorage` for the current tab.
  - `field.js` and `field-shapes.js` draw the particle field.
- `site.config.json`: the public site URL, used for canonical URLs and social preview tags.
- `.github/workflows/pages.yml`: builds, checks, and deploys to GitHub Pages.
- `scripts/build.mjs`: assembles `dist/`.
- `scripts/check.mjs` and `scripts/check-html.py`: automated checks.
- `scripts/social-preview.html`: source for `assets/social-preview.jpg`.
- `evaluation/`: saved prompts, answers, and grades from two small evaluations.

## Build and verify

```sh
node scripts/build.mjs
node scripts/check.mjs
python3 scripts/check-html.py
python3 -m http.server 8765 --directory dist
```

Serve `dist/` over HTTP. Opening `index.html` directly from disk does not work: browsers block module scripts on `file://` pages, and folder links do not resolve to `index.html`.

## Deployment

The site is set up for GitHub Pages at https://heliakon.github.io/krakem/.

- `.github/workflows/pages.yml` runs on every push to `main`. It builds `dist/`, runs both check scripts, and deploys only if they pass. Pull requests are built and checked but not deployed.
- In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**. The repository must be named `krakem` for the URL above.
- `dist/` is built in CI and ignored by Git. Edit `content/` and `assets/`, never `dist/`.
- Pages are written with root-relative links (`/humanize/`). The build turns them into relative links, so the same output works at a domain root or under `/krakem/`. `check-html.py` fails on any root-relative link or CSS `url()` left in `dist/`.
- `siteUrl` in `site.config.json` sets canonical URLs and social preview tags. If the site moves, change it there, or set `SITE_URL` for one build.

After the first deploy, open https://heliakon.github.io/krakem/assets/social-preview.jpg and https://heliakon.github.io/krakem/assets/downloads/CLAUDE.md in a private window to confirm anonymous access.

To regenerate the 1200×630 preview image after a design change:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --force-device-scale-factor=1 --window-size=1200,630 --virtual-time-budget=2000 --screenshot="$PWD/social-preview.png" "file://$PWD/scripts/social-preview.html"
```

```sh
sips -s format jpeg -s formatOptions 86 social-preview.png --out assets/social-preview.jpg
```

## Behavior

**Prompt creator.** The creator is the first section below the menu. Prompts include the visitor's task, task-specific guidance, an answer format, and any source material, with no editing placeholders. Source material is included exactly as entered. Comparison mode requires two different subjects, a decision goal, and criteria before copying. Missing-detail links focus the relevant field. Choosing a task sets a suitable answer format until the visitor picks a format explicitly.

**Humanize.** Readers and original text are required before copying. The voice sample is optional; when it is empty, its section is left out. The original text is inserted exactly as entered, as the last section of the brief.

**Drafts.** Creator and Humanize inputs are saved to `sessionStorage` as the visitor types, including task type, format, comparison fields, and the explicit-format flag. They survive navigation and reload in the same tab and are discarded when the tab closes. **Clear draft** resets the form and removes the stored draft. If storage is blocked, the forms still work and the page says drafts are not kept. `localStorage` holds only the motion preference.

**Particle field.** A full-width field follows the creator: 780px tall on desktop, 620px on tablets, and 560px on phones. Seven unnamed shapes morph every five seconds, starting with a nautilus and a crab. A close camera crops the forms on purpose. Motion and Chaos controls sit beside the animation, and the numbered buttons work with motion off. Rendering respects reduced-motion preferences. It is capped at DPR 1.5 and pauses when offscreen or in a hidden tab.

**Evidence.** The page keeps its original research and review dates. GitHub star counts are a 23 October 2026 snapshot of popularity, not a quality or security signal. All eight reviewed repositories remain listed as historical research. Humanize and Claude setup do not recommend or install skills.

**CLAUDE.md.** Edit `assets/downloads/CLAUDE.md`. The build inserts that file into the Claude setup preview and copies it to the download path. It has no external imports.

## Verification scope

`scripts/check.mjs` covers:

- 70 task/format combinations, comparison validation, and exact source preservation;
- 27 Humanize combinations, including multi-line, quoted, and HTML-like text;
- draft restore, reset, and blocked or corrupt storage;
- versioned module imports, a scan for network calls, social metadata, and the Evidence rows;
- animation timing and lifecycle.

These are regression checks. They do not establish full accessibility conformance, real-device performance, or model-output quality. Small model evaluations are recorded in `evaluation/`; they are not benchmarks.

## License

MIT. See [LICENSE](LICENSE).
