# Portfolio

A Notion-style personal portfolio. All content lives in `content/` as YAML and Markdown.
There's no build step and no dependencies: edit a file, refresh, done.

```
content/
  site.yaml        ← name, bio, buttons, and which sections appear (in order)
  skills.yaml      ← chips, grouped into tabs
  projects.yaml    ← cards, grouped into tabs (Featured / Past)
  talks.yaml       ← dated list
  writing.yaml     ← dated list of blog posts
  posts/*.md       ← blog post bodies
assets/            ← images (avatar, etc.)
```

## Run locally

The page loads its content with `fetch`, so it needs to be served over HTTP. Opening `index.html` directly from disk won't work.

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Common edits

**Add a talk** by appending to `content/talks.yaml` (it gets sorted by date automatically):

```yaml
  - title: My new talk
    date: 2026-11-20
    meta: PyCon India · Bengaluru
    icon: mic
    links:
      - label: Slides
        url: https://…
```

**Write a blog post**

1. Create `content/posts/my-new-post.md` with just the body in Markdown.
2. Add an entry to `content/writing.yaml`:
   ```yaml
     - title: My new post
       date: 2026-11-01
       description: One-line summary.
       icon: file-text
       post: my-new-post        # ← matches the file name
   ```
   For a post hosted elsewhere, use `url: https://…` instead of `post:`.

**Add a project** by appending to a tab in `content/projects.yaml`. To add a new tab, add another `- name: … items: […]` block.
A tab with a `url` and no `items` becomes a link instead, e.g. `- name: All projects` / `icon: github` / `url: https://github.com/you`.

**Add a whole new section** (e.g. "Open Source", "Awards"):

1. Create `content/awards.yaml` with `items:` (or `tabs:`).
2. Add it to `sections:` in `content/site.yaml`:
   ```yaml
     - title: Awards
       file: content/awards.yaml
       layout: list    # chips | cards | list
   ```

### Item fields

Every item, in any section, can use any of these fields. Only `title` is required.

| field         | what it does                                        |
|---------------|-----------------------------------------------------|
| `title`       | Main text                                           |
| `description` | Supports inline markdown (`**bold**`, `[link](…)`)  |
| `icon`        | A [Lucide icon](https://lucide.dev/icons) name, or an emoji |
| `date`        | `YYYY-MM-DD`. List layouts sort by it, newest first |
| `meta`        | Small grey line under the title (event, place…)     |
| `tags`        | `[Python, CLI]`                                     |
| `url`         | Makes the title a link                              |
| `post`        | Links to `content/posts/<post>.md`                  |
| `links`       | Extra links: `[{ label: Slides, url: … }]`          |
| `image`       | A photo (e.g. `assets/talks/x.jpg`): a thumbnail in lists, a banner on cards |
| `image_alt`   | Describes the photo for screen readers (defaults to the title) |

## Deploy

It's a static folder, so it works on any static host.

  Name the repo `<username>.github.io` to serve it at `https://<username>.github.io/`. Keep the empty
  `.nojekyll` file. Without it, GitHub turns the `.md` posts into HTML and the blog pages can't load them.

## Customising the look

Colors are CSS variables at the top of `style.css`: `:root` holds the light theme and `[data-theme="dark"]` the dark one.
The sun/moon button (in `theme.js`) switches between them. The site follows the visitor's system setting until they click it,
and after that their choice is remembered in their browser.
To use your own picture, replace `assets/avatar.svg` with any image and update `avatar:` in `site.yaml`.
>>>>>>> 33501b3 (feat: add initial portfolio structure with projects, writing, and talks sections)
