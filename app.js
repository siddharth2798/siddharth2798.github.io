// Renders the portfolio from the YAML/Markdown files in content/.
// You shouldn't need to touch this file to change content — edit content/ instead.

const app = document.getElementById('app');

// ── helpers ────────────────────────────────────────────────────

async function load(path) {
  const res = await fetch(path, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Couldn't load ${path} (${res.status})`);
  const text = await res.text();
  if (path.endsWith('.json')) return JSON.parse(text);
  if (path.endsWith('.md')) return text;
  try {
    return jsyaml.load(text);
  } catch (err) {
    // Name the file and line, so a typo in content/ is easy to find.
    throw new Error(`There's a mistake in ${path}: ${err.reason || err.message} ${err.mark ? `(line ${err.mark.line + 1})` : ''}`);
  }
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// Markdown links to other sites open in a new tab, like every other external link on the page.
const newTab = (html) => html.replace(/<a href="(https?:\/\/[^"]*)"/g, '<a href="$1" target="_blank" rel="noopener"');

const inline = (s) => (s ? newTab(marked.parseInline(String(s))) : '');

// Lucide icon name (e.g. "code") or any emoji / text.
const icon = (name) => {
  if (!name) return '';
  if (/^[a-z0-9-]+$/.test(name)) return `<i data-lucide="${name}" class="icon"></i>`;
  return `<span class="icon emoji">${esc(name)}</span>`;
};

const toDate = (d) => (d instanceof Date ? d : d ? new Date(d) : null);

const fmtDate = (d, opts = { month: 'short', year: 'numeric' }) => {
  const date = toDate(d);
  return date && !isNaN(date) ? date.toLocaleDateString('en', { ...opts, timeZone: 'UTC' }) : '';
};

const byDateDesc = (items) => [...items].sort((a, b) => (toDate(b.date) || 0) - (toDate(a.date) || 0));

// A section's id, used in URLs: `id:` from site.yaml, or the data file's name (content/talks.yaml → "talks").
const sectionId = (section) => section.id || section.file.split('/').pop().replace(/\.\w+$/, '');

const hrefFor = (item) => (item.post ? `post.html?slug=${encodeURIComponent(item.post)}` : item.url || '');

const isExternal = (href) => /^https?:\/\//.test(href);

const linkAttrs = (href) => `href="${esc(href)}"${isExternal(href) ? ' target="_blank" rel="noopener"' : ''}`;

const wrapLink = (href, inner, cls = '') =>
  href ? `<a class="${cls}" ${linkAttrs(href)}>${inner}</a>` : `<div class="${cls}">${inner}</div>`;

const tags = (item) =>
  item.tags?.length ? `<div class="tags">${item.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : '';

const links = (item) =>
  item.links?.length
    ? `<div class="links">${item.links.map((l) => `<a ${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`).join('')}</div>`
    : '';

// "a", "a and b", "a, b and c"
const joinAnd = (parts) =>
  parts.length < 2 ? parts.join('') : `${parts.slice(0, -1).join(', ')} and ${parts.at(-1)}`;

const footer = (site) => {
  const credits = (site.credits || []).map((c) => (c.url ? `<a ${linkAttrs(c.url)}>${esc(c.name)}</a>` : esc(c.name)));
  return `<footer class="footer">
    <span>© ${new Date().getFullYear()} ${esc(site.name || '')}</span>
    ${credits.length ? `<span>Made using ${joinAnd(credits)}.</span>` : ''}
  </footer>`;
};

const showError = (err) => {
  console.error(err);
  app.innerHTML = `<div class="error"><strong>Something went wrong.</strong><br>${esc(err.message)}
    <p class="hint">If you opened this file directly, run a local server instead: <code>python3 -m http.server</code></p></div>`;
};

// Optional photo for an item: `image: assets/talks/foo.jpg` (+ `image_alt:` for screen readers).
// Clicking it opens the full-size image.
const photo = (item, cls) =>
  item.image
    ? `<a class="${cls}" href="${esc(item.image)}" target="_blank" rel="noopener">` +
      `<img src="${esc(item.image)}" alt="${esc(item.image_alt || item.title)}" loading="lazy" decoding="async"></a>`
    : '';

// ── section layouts ────────────────────────────────────────────

const layouts = {
  chips: (items) => `<div class="grid chips">${items.map((it) =>
    wrapLink(hrefFor(it), `${icon(it.icon)}<span>${esc(it.title)}</span>`, 'chip box')
  ).join('')}</div>`,

  cards: (items) => `<div class="grid cards">${items.map((it) => {
    const href = hrefFor(it);
    const title = href
      ? `<a class="card-title" ${linkAttrs(href)}>${icon(it.icon)}<span>${esc(it.title)}</span></a>`
      : `<div class="card-title">${icon(it.icon)}<span>${esc(it.title)}</span></div>`;
    return `<article class="card box${it.image ? ' has-image' : ''}">
      ${photo(it, 'card-img')}
      ${title}
      ${it.description ? `<p class="desc">${inline(it.description)}</p>` : ''}
      ${tags(it)}${links(it)}
    </article>`;
  }).join('')}</div>`,

  list: (items) => {
    return `<ul class="list">${byDateDesc(items).map((it) => {
      const href = hrefFor(it);
      const title = href
        ? `<a class="row-title" ${linkAttrs(href)}>${esc(it.title)}</a>`
        : `<span class="row-title">${esc(it.title)}</span>`;
      return `<li class="row${it.image ? ' has-image' : ''}">
        ${it.image ? photo(it, 'row-thumb') : `<span class="row-icon">${icon(it.icon)}</span>`}
        <div class="row-body">
          ${title}
          ${it.meta ? `<div class="meta">${inline(it.meta)}</div>` : ''}
          ${it.description ? `<p class="desc">${inline(it.description)}</p>` : ''}
          ${tags(it)}${links(it)}
        </div>
        <time class="row-date">${fmtDate(it.date)}</time>
      </li>`;
    }).join('')}</ul>`;
  },
};

// Renders one section.
//   On the home page, `limit` (from site.yaml) caps how many items show, with a "See all" link to the full page.
//   On the section's own page (full = true), everything shows, and dated lists are grouped by year.
function renderSection(section, data, index, { full = false, activeTab = 0 } = {}) {
  const layout = layouts[section.layout] ? section.layout : 'cards';
  const render = layouts[layout];
  const id = `s${index}`;
  const tabs = data?.tabs || [{ items: data?.items || [] }];
  const hasTabs = Boolean(data?.tabs);
  const limit = full ? 0 : Number(section.limit) || 0;
  const pageHref = (tabIndex) =>
    `section.html?s=${encodeURIComponent(sectionId(section))}${hasTabs && tabIndex ? `&tab=${tabIndex}` : ''}`;

  const renderItems = (items, tabIndex) => {
    if (!items.length) return '<p class="empty">Nothing here yet.</p>';
    const ordered = layout === 'list' ? byDateDesc(items) : items;

    if (limit && ordered.length > limit) {
      return render(ordered.slice(0, limit)) +
        `<a class="see-all" href="${pageHref(tabIndex)}"><span>See all ${esc(section.title.toLowerCase())}` +
        ` <span class="count">(${ordered.length})</span></span><span aria-hidden="true">→</span></a>`;
    }

    // Full page: group dated lists under year headings (only worth it when there's more than one year).
    const years = [...new Set(ordered.map((it) => toDate(it.date)?.getUTCFullYear()).filter(Boolean))];
    if (full && layout === 'list' && years.length > 1) {
      const undated = ordered.filter((it) => !toDate(it.date));
      return years.map((y) => `<h2 class="group-year">${y}</h2>` +
        render(ordered.filter((it) => toDate(it.date)?.getUTCFullYear() === y))).join('') +
        (undated.length ? `<h2 class="group-year">Other</h2>${render(undated)}` : '');
    }
    return render(ordered);
  };

  const tabBar = hasTabs
    ? `<div class="tabs" role="tablist">${tabs.map((t, i) =>
        // A tab with a `url` and no items is just a link (e.g. "Past Projects" → GitHub).
        t.url && !t.items
          ? `<a class="tab" ${linkAttrs(t.url)}>${icon(t.icon)}<span>${esc(t.name)} ↗</span></a>`
          : `<button class="tab${i === activeTab ? ' active' : ''}" role="tab" data-target="${id}-${i}">${icon(t.icon)}<span>${esc(t.name)}</span></button>`
      ).join('')}</div>`
    : '';

  const panels = tabs.map((t, i) => t.url && !t.items ? '' :
    `<div class="panel" id="${id}-${i}"${i === activeTab ? '' : ' hidden'}>${renderItems(t.items || [], i)}</div>`
  ).join('');

  return `<section class="section" id="${esc(sectionId(section))}">
    ${full ? '' : `<h2>${esc(section.title)}</h2>`}
    ${tabBar}${panels}
  </section>`;
}

// Tab switching (one listener for the whole page).
app.addEventListener('click', (e) => {
  const tab = e.target.closest('button.tab');
  if (!tab) return;
  const section = tab.closest('.section');
  section.querySelectorAll('.tab').forEach((t) => t.classList.toggle('active', t === tab));
  section.querySelectorAll('.panel').forEach((p) => { p.hidden = p.id !== tab.dataset.target; });
});

// ── pages ──────────────────────────────────────────────────────

async function renderHome() {
  const site = await load('content/site.yaml');
  document.title = [site.name, site.title].filter(Boolean).join(' · ') || 'Portfolio';

  const sectionData = await Promise.all((site.sections || []).map((s) => load(s.file)));
  const bio = [].concat(site.bio || []);

  app.innerHTML = `
    ${site.title ? `<h1 class="page-title">${esc(site.title)}</h1>` : ''}
    <header class="hero">
      <div class="hero-text">
        ${site.greeting ? `<h2 class="greeting">${esc(site.greeting)}</h2>` : ''}
        ${bio.map((p) => `<p>${inline(p)}</p>`).join('')}
        ${site.buttons?.length ? `<div class="buttons">${site.buttons.map((b) =>
          `<a class="button" ${linkAttrs(b.url)}>${icon(b.icon)}<span>${esc(b.label)}</span></a>`
        ).join('')}</div>` : ''}
      </div>
      ${site.avatar ? `<img class="avatar" src="${esc(site.avatar)}" alt="${esc(site.name || '')}">` : ''}
    </header>
    ${(site.sections || []).map((s, i) => renderSection(s, sectionData[i], i)).join('')}
    ${footer(site)}
  `;

  // Content arrives after the browser's own jump-to-#anchor, so do it ourselves (e.g. "← Home" from /section.html).
  const target = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (target) target.scrollIntoView();
}

async function renderSectionPage() {
  const params = new URLSearchParams(location.search);
  const site = await load('content/site.yaml');
  const sections = site.sections || [];
  const index = sections.findIndex((s) => sectionId(s) === params.get('s'));
  if (index === -1) throw new Error(`There's no section called "${params.get('s') || ''}".`);

  const section = sections[index];
  const data = await load(section.file);
  const tabCount = data?.tabs?.length || 1;
  const activeTab = Math.min(Math.max(parseInt(params.get('tab'), 10) || 0, 0), tabCount - 1);

  document.title = `${section.title} · ${site.name || site.title || ''}`;
  app.innerHTML = `
    <a class="back" href="./#${esc(sectionId(section))}">← Home</a>
    <h1 class="page-title">${esc(section.title)}</h1>
    ${renderSection(section, data, index, { full: true, activeTab })}
    ${footer(site)}
  `;
}

async function renderPost() {
  const slug = new URLSearchParams(location.search).get('slug') || '';
  if (!/^[\w-]+$/.test(slug)) throw new Error('No post specified.');

  const site = await load('content/site.yaml');
  const [body, sectionData] = await Promise.all([
    load(`content/posts/${slug}.md`),
    Promise.all((site.sections || []).map((s) => load(s.file))),
  ]);

  // Find this post's title/date/description in whichever section lists it.
  const allItems = sectionData.flatMap((d) => (d?.tabs ? d.tabs.flatMap((t) => t.items || []) : d?.items || []));
  const meta = allItems.find((it) => it.post === slug) || { title: slug };
  const home = (site.sections || []).find((s, i) => {
    const d = sectionData[i];
    return (d?.tabs ? d.tabs.flatMap((t) => t.items || []) : d?.items || []).some((it) => it.post === slug);
  });

  document.title = `${meta.title} · ${site.name || site.title || ''}`;
  app.innerHTML = `
    <a class="back" href="./${home ? `#${esc(sectionId(home))}` : ''}">← Back</a>
    <article class="post">
      <h1 class="page-title">${esc(meta.title)}</h1>
      ${meta.date ? `<time class="post-date">${fmtDate(meta.date, { day: 'numeric', month: 'long', year: 'numeric' })}</time>` : ''}
      <div class="prose">${newTab(marked.parse(body))}</div>
    </article>
    ${footer(site)}
  `;
}

const pages = { post: renderPost, section: renderSectionPage };

(pages[app.dataset.page] || renderHome)()
  .then(() => window.lucide?.createIcons())
  .catch(showError);
