# Portfolio

My personal portfolio, live at **https://siddharth2798.github.io**: a Notion-style page with my projects, talks and writing.

All content lives in `content/` as YAML and Markdown. There's no build step and nothing to install:
edit a file, push, and the site updates.

**Features**
- About section with greeting, bio, contact buttons and an illustration
- Sections built from simple YAML files: projects as cards (with tabs), talks and posts as date-sorted lists
- "See all" pages, so long sections (like Talks) stay short on the home page
- Optional photos for talks and projects
- Blog posts written in Markdown
- Light and dark mode: follows the system setting, with a toggle that remembers the visitor's choice
- Works well on phones: large tap targets, single-column layout, no sideways scrolling
- Favicon, and link previews when shared on WhatsApp, LinkedIn, Slack and similar apps

## What's where

```
content/                ← everything you'll normally edit
  site.yaml             ← name, bio, buttons, footer credits, and which sections appear (in order)
  projects.yaml         ← project cards, grouped into tabs (Recent / Past)
  talks.yaml            ← talks, sorted by date
  writing.yaml          ← blog posts, sorted by date (section hidden until there's a post)
  skills.yaml           ← skill chips in tabs (section currently hidden)
  posts/*.md            ← blog post text (create the folder with your first post)
assets/
  avatar.svg            ← illustration next to the bio
  talks/                ← talk photos
  favicon.svg, apple-touch-icon.png, og-image.png   ← tab icon and link-preview image

index.html              ← home page
section.html            ← "See all" page for one section, e.g. section.html?s=talks
post.html               ← a single blog post, e.g. post.html?slug=my-post
app.js                  ← reads content/ and builds the pages
theme.js                ← light/dark mode and its toggle button
style.css               ← all styling
.nojekyll               ← needed for GitHub Pages (see Deploy)
```

## Run locally

The pages load their content with `fetch`, so they need to be served over HTTP. Opening `index.html` directly from disk won't work.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Common edits

### Add a talk

Append to `content/talks.yaml`. Order doesn't matter, because talks are sorted newest-first by `date`.

```yaml
  - title: My new talk
    date: 2026-11-20
    meta: PyCon India · Bengaluru
    description: One line about what it covered.
    icon: mic
    image: assets/talks/pycon-2026.jpg       # optional photo
    image_alt: Me presenting at PyCon India  # optional description for screen readers
    links:
      - label: Slides
        url: https://…
      - label: Video
        url: https://…
```

For photos, put the file in `assets/talks/`. Any shape works because it's cropped to fit, but resize it to about 1200px wide first so the page stays fast.

### Write a blog post

1. Create `content/posts/my-new-post.md` with just the body in Markdown.
2. Add an entry to `content/writing.yaml`:
   ```yaml
     - title: My new post
       date: 2026-11-01
       description: One-line summary.
       icon: file-text
       post: my-new-post        # ← matches the file name
   ```
   For a post hosted elsewhere (Medium, dev.to…), use `url: https://…` instead of `post:`.
3. If the Writing section is commented out in `site.yaml`, un-comment it.

### Add a project

Append to a tab in `content/projects.yaml`. To add a tab, add another `- name: … icon: … items: […]` block.
A tab with a `url` and no `items` becomes a link instead, e.g. `- name: All projects` / `icon: github` / `url: https://github.com/you`.

### Change the about section, buttons or footer

All of these are in `content/site.yaml`:
- `greeting` and `bio`: each `bio` entry is one paragraph
- `buttons`: label, icon and link
- `avatar`: the image next to the bio
- `credits`: the "Made using …" line in the footer, as a list of `name` and `url`

### Show, hide or reorder sections

The `sections:` list in `content/site.yaml` controls what appears on the home page, in that order.
Put `#` in front of a section's lines to hide it (Skills and Writing are hidden this way right now).

| option   | what it does                                                                                 |
|----------|----------------------------------------------------------------------------------------------|
| `title`  | Section heading                                                                              |
| `file`   | The YAML file with its items                                                                 |
| `layout` | `chips` (small boxes, good for skills), `cards` (good for projects), `list` (dated rows, good for talks and posts) |
| `limit`  | Optional. Shows only this many on the home page (the newest, for lists), plus a "See all" link |
| `id`     | Optional. Name used in links like `section.html?s=…` and `#…`. Defaults to the file name (`talks.yaml` → `talks`) |

With `limit: 3` on Talks, the home page shows the 3 newest talks and **See all talks (6) →**.
That link opens `section.html?s=talks`, which shows every talk, grouped by year once there's more than one year.
In a tabbed section, the limit applies to each tab separately.

### Add a whole new section

1. Create a file such as `content/awards.yaml` with `items:` (or `tabs:`, like `projects.yaml`).
2. Add it to `sections:` in `content/site.yaml`:
   ```yaml
     - title: Awards
       file: content/awards.yaml
       layout: list
   ```

### Item fields

Every item, in any section, can use these fields. Only `title` is required.

| field         | what it does                                                                 |
|---------------|------------------------------------------------------------------------------|
| `title`       | Main text                                                                    |
| `description` | Supports inline Markdown (`**bold**`, `[link](…)`)                           |
| `meta`        | Small grey line under the title (event, place…). Also supports Markdown links |
| `date`        | `YYYY-MM-DD`. Lists sort by it, newest first                                 |
| `icon`        | A [Lucide icon](https://lucide.dev/icons) name (e.g. `mic`, `users-round`), or an emoji |
| `tags`        | `[Python, CLI]`                                                              |
| `url`         | Makes the title a link                                                       |
| `post`        | Links to the blog post `content/posts/<post>.md`                             |
| `links`       | Extra links shown under the item: `[{ label: Slides, url: … }]`              |
| `image`       | A photo: a thumbnail in lists, a banner on cards. Click to open full size     |
| `image_alt`   | Describes the photo for screen readers (defaults to the title)               |

Links to other websites always open in a new tab.

## Troubleshooting

- **The page says "Something went wrong" and names a file.** That YAML file has a syntax error, usually from indentation or an
  unquoted value containing `: `, `#` or a leading `[`. Wrap such values in quotes, for example
  `meta: "[Build for Good](https://…) · Online"`.
- **An icon is blank.** The name doesn't exist in Lucide. Search for it at [lucide.dev/icons](https://lucide.dev/icons)
  and use the name shown there, in lowercase with dashes.
- **Nothing loads when opening the file directly.** Use a local server (see [Run locally](#run-locally)).
- **A change doesn't show on the live site.** Make sure new files (photos, posts) were committed too, then give GitHub Pages
  a minute to update.

## Deploy

It's a static folder, so it works on any static host.

- **GitHub Pages:** push this folder to a repo, then go to Settings → Pages → "Deploy from a branch" → `main` / root.
  Name the repo `<username>.github.io` to serve it at `https://<username>.github.io/`. Keep the empty
  `.nojekyll` file. Without it, GitHub turns the `.md` posts into HTML and the blog pages can't load them.
- **Netlify / Cloudflare Pages:** connect the repo, leave the build command empty, and set the publish directory to `/`.

## Customising the look

Colors are CSS variables at the top of `style.css`: `:root` holds the light theme and `[data-theme="dark"]` the dark one.
The sun/moon button (in `theme.js`) switches between them. The site follows the visitor's system setting until they click it,
and after that their choice is remembered in their browser.

To use your own picture, replace `assets/avatar.svg` with any image and update `avatar:` in `site.yaml`.

**Favicon and link previews:** the tab icon is `assets/favicon.svg` (plus `apple-touch-icon.png` for iPhones).
When the site is shared on WhatsApp, LinkedIn, Slack and so on, the preview uses `assets/og-image.png` (1200×630) and the
`og:` tags at the top of `index.html`. Link-preview services don't run JavaScript, so those tags can't come from `site.yaml`.
Update them by hand if your bio changes.

## License

[MIT](LICENSE). The site uses [js-yaml](https://github.com/nodeca/js-yaml), [Marked](https://github.com/markedjs/marked),
[Lucide](https://lucide.dev) icons and the [Inter](https://rsms.me/inter/) typeface, each under its own open source license.
