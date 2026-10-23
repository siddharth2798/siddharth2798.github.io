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

// ── phone app (≤720px) ─────────────────────────────────────────
// On phones the home page is a small app: an About screen plus one screen per section, switched from a bar
// at the bottom. Each section screen has a search box and (when its items have dates) a calendar filter.
// It's rendered next to the desktop page and style.css shows whichever fits the screen.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const itemsOfData = (data) => (data?.tabs ? data.tabs.flatMap((t) => t.items || []) : data?.items || []);

const ymOf = (it) => {
  const d = toDate(it.date);
  return d && !isNaN(d) ? { y: d.getUTCFullYear(), m: d.getUTCMonth() } : null;
};

const filterActive = (f) => Boolean(f.q.trim() || f.year);

// Search looks in the title, description, event line and tags. The calendar picks a year, then optionally a month.
function itemMatches(it, f) {
  if (f.year) {
    const ym = ymOf(it);
    if (!ym || ym.y !== f.year || (f.month !== null && ym.m !== f.month)) return false;
  }
  const q = f.q.trim().toLowerCase();
  if (!q) return true;
  return [it.title, it.description, it.meta, ...(it.tags || [])].filter(Boolean).join(' ').toLowerCase().includes(q);
}

const mLinks = (it) =>
  it.links?.length ? `<span class="m-links">${it.links.map((l) => `<a ${linkAttrs(l.url)}>${esc(l.label)} ↗</a>`).join('')}</span>` : '';

const mTitle = (it) => {
  const href = hrefFor(it);
  return href
    ? `<a class="m-title" ${linkAttrs(href)}>${esc(it.title)}</a>`
    : `<span class="m-title">${esc(it.title)}</span>`;
};

// Project-style card: icon, title, two lines of description, tags and links on one row.
const mCard = (it) => `<article class="m-card">
  <span class="m-ico">${icon(it.icon)}</span>
  <div class="m-card-body">
    ${mTitle(it)}
    ${it.description ? `<p class="m-desc">${inline(it.description)}</p>` : ''}
    <div class="m-foot"><span class="m-meta">${esc((it.tags || []).slice(0, 2).join(' · '))}</span>${mLinks(it)}</div>
  </div>
</article>`;

// Talk / writing row: small photo (if any) beside the text, date and event on a single line.
const mRow = (it) => {
  const date = fmtDate(it.date, { day: 'numeric', month: 'short', year: 'numeric' });
  const line = [esc(date), it.meta ? inline(it.meta) : ''].filter(Boolean).join(' · ');
  return `<li class="m-row">
    ${photo(it, 'm-thumb')}
    <div class="m-row-body">
      <div class="m-line">${line}</div>
      ${mTitle(it)}
      ${it.description ? `<p class="m-desc">${inline(it.description)}</p>` : ''}
      ${mLinks(it)}
    </div>
  </li>`;
};

const mRender = (section, items) =>
  section.layout === 'list'
    ? `<ul class="m-list">${byDateDesc(items).map(mRow).join('')}</ul>`
    : `<div class="m-cards">${items.map(mCard).join('')}</div>`;

// Chips for whatever filters are on (tap to remove), plus "N of M".
const mFilterBar = (f, shown, total) => !filterActive(f) ? '' : `<div class="m-filters">
  ${f.q.trim() ? `<button class="m-chip" data-m-clear="q">“${esc(f.q.trim())}” ${icon('x')}</button>` : ''}
  ${f.year ? `<button class="m-chip" data-m-clear="date">${f.month !== null ? `${MONTHS[f.month]} ` : ''}${f.year} ${icon('x')}</button>` : ''}
  <span class="m-count">${shown} of ${total}</span>
</div>`;

// What a section screen shows. Unfiltered: its tabs (e.g. Recent / Past) as a switch. Filtered: one flat list.
function mViewBody(section, data, f) {
  const all = itemsOfData(data);
  if (filterActive(f)) {
    const items = all.filter((it) => itemMatches(it, f));
    return mFilterBar(f, items.length, all.length) + (items.length ? mRender(section, items) : `<div class="m-empty">
      ${icon('search-x')}<p>No ${esc(section.title.toLowerCase())} match these filters.</p>
      <button class="m-chip" data-m-clear="all">Clear filters</button></div>`);
  }
  if (!data?.tabs?.length) return all.length ? mRender(section, all) : '<p class="empty">Nothing here yet.</p>';

  const first = data.tabs.findIndex((t) => !(t.url && !t.items));
  return `<div class="m-seg" role="tablist">${data.tabs.map((t, i) => t.url && !t.items
      ? `<a class="m-seg-link" ${linkAttrs(t.url)}>${esc(t.name)} ↗</a>`
      : `<button role="tab" class="${i === first ? 'active' : ''}" data-m-seg="${i}">${esc(t.name)}</button>`).join('')}</div>` +
    data.tabs.map((t, i) => t.url && !t.items ? '' :
      `<div data-m-panel="${i}"${i === first ? '' : ' hidden'}>${mRender(section, t.items || [])}</div>`).join('');
}

function phoneApp(site, sections, sectionData) {
  const bio = [].concat(site.bio || []);
  const tabs = [{ id: 'about', title: 'About', icon: 'user' },
    ...sections.map((s) => ({ id: sectionId(s), title: s.title, icon: s.icon || 'file-text' }))];

  return `<div class="m-app">
    <div class="m-bar"></div>
    <div class="m-view m-about" data-m-view="about">
      ${site.avatar ? `<img class="m-avatar" src="${esc(site.avatar)}" alt="${esc(site.name || '')}">` : ''}
      ${site.greeting ? `<h1 class="m-greeting">${esc(site.greeting)}</h1>` : ''}
      ${bio.map((p) => `<p>${inline(p)}</p>`).join('')}
      ${site.buttons?.length ? `<div class="buttons">${site.buttons.map((b) =>
        `<a class="button" ${linkAttrs(b.url)}>${icon(b.icon)}<span>${esc(b.label)}</span></a>`).join('')}</div>` : ''}
      ${footer(site)}
    </div>
    ${sections.map((s, i) => `<div class="m-view" data-m-view="${esc(sectionId(s))}" hidden>
      <div class="m-body">${mViewBody(s, sectionData[i], { q: '', year: null, month: null })}</div></div>`).join('')}
    <nav class="m-tabs" aria-label="Sections">${tabs.map((t) =>
      `<button class="m-tab" data-m-go="${esc(t.id)}">${icon(t.icon)}<span>${esc(t.title)}</span></button>`).join('')}</nav>
  </div>`;
}

function initPhoneApp(root, site, sections, sectionData) {
  const info = Object.fromEntries(sections.map((s, i) => [sectionId(s), { section: s, data: sectionData[i] }]));
  const state = Object.fromEntries(Object.keys(info).map((id) => [id, { q: '', year: null, month: null, searching: false }]));
  const bar = root.querySelector('.m-bar');
  let view = 'about';

  const itemsOf = (id) => itemsOfData(info[id].data);
  const yearsOf = (id) => [...new Set(itemsOf(id).map(ymOf).filter(Boolean).map((d) => d.y))].sort((a, b) => b - a);
  const hasDates = (id) => yearsOf(id).length > 0;
  const icons = () => window.lucide?.createIcons();

  const closeSheet = () => root.querySelector('.m-sheet')?.remove();

  // Year chips, then a month grid (months with nothing in them are greyed out).
  const sheetHtml = (id) => {
    const f = state[id];
    const all = itemsOf(id);
    const ys = yearsOf(id);
    const year = f.year || ys[0];
    const withItems = new Set(all.map(ymOf).filter((d) => d && d.y === year).map((d) => d.m));
    const count = all.filter((it) => itemMatches(it, f)).length;
    return `<div class="m-sheet" role="dialog" aria-label="Filter by date">
      <div class="m-sheet-card">
        <div class="m-sheet-title">Filter by date</div>
        <div class="m-sheet-label">Year</div>
        <div class="m-opts">
          <button class="m-opt${f.year ? '' : ' active'}" data-m-year="all">All</button>
          ${ys.map((y) => `<button class="m-opt${f.year === y ? ' active' : ''}" data-m-year="${y}">${y}</button>`).join('')}
        </div>
        <div class="m-sheet-label">Month <span>· ${year}</span></div>
        <div class="m-months">${MONTHS.map((m, i) =>
          `<button class="m-opt${f.year && f.month === i ? ' active' : ''}" data-m-month="${i}"${withItems.has(i) ? '' : ' disabled'}>${m}</button>`).join('')}</div>
        <div class="m-sheet-actions">
          <button class="m-opt" data-m-clear="date"${f.year ? '' : ' disabled'}>Clear</button>
          <button class="m-primary" data-m-sheet-close>Show ${count} ${count === 1 ? 'result' : 'results'}</button>
        </div>
      </div>
    </div>`;
  };

  const renderBar = (focus = false) => {
    const theme = `<button class="m-icon-btn" data-m-theme aria-label="Switch light / dark mode">${icon('sun-moon')}</button>`;
    if (view === 'about') {
      bar.innerHTML = `<span class="m-bar-title">${esc(site.title || site.name || '')}</span><span class="m-tools">${theme}</span>`;
    } else {
      const f = state[view];
      const title = esc(info[view].section.title);
      bar.innerHTML = f.searching
        // The search box grows out of the icon and covers the title.
        ? `<div class="m-search">${icon('search')}<input data-m-search type="search" enterkeyhint="search"
             placeholder="Search ${title.toLowerCase()}" value="${esc(f.q)}" aria-label="Search ${title}">
             <button class="m-icon-btn" data-m-search-close aria-label="Close search">${icon('x')}</button></div>`
        : `<span class="m-bar-title">${title}</span><span class="m-tools">
             <button class="m-icon-btn${f.q.trim() ? ' on' : ''}" data-m-search-open aria-label="Search ${title}">${icon('search')}</button>
             ${hasDates(view) ? `<button class="m-icon-btn${f.year ? ' on' : ''}" data-m-cal aria-label="Filter by date">${icon('calendar')}</button>` : ''}
             ${theme}</span>`;
    }
    icons();
    if (focus) bar.querySelector('[data-m-search]')?.focus();
  };

  const renderBody = (id) => {
    root.querySelector(`[data-m-view="${id}"] .m-body`).innerHTML = mViewBody(info[id].section, info[id].data, state[id]);
    icons();
  };

  const setView = (id, { updateHash = true } = {}) => {
    view = id === 'about' || info[id] ? id : 'about';
    closeSheet();
    root.querySelectorAll('.m-view').forEach((v) => { v.hidden = v.dataset.mView !== view; });
    root.querySelectorAll('.m-tab').forEach((t) => {
      const on = t.dataset.mGo === view;
      t.classList.toggle('active', on);
      if (on) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
    });
    renderBar();
    window.scrollTo(0, 0);
    // Keep the address in step so "← Back" from a post (or a shared link) lands on the right screen.
    if (updateHash) history.replaceState(null, '', view === 'about' ? location.pathname + location.search : `#${view}`);
  };

  const fromHash = () => decodeURIComponent(location.hash.slice(1));

  root.addEventListener('click', (e) => {
    const t = e.target;
    const go = t.closest('[data-m-go]');
    if (go) return setView(go.dataset.mGo);
    if (t.closest('[data-m-theme]')) { document.querySelector('.theme-toggle')?.click(); return; }

    const seg = t.closest('[data-m-seg]');
    if (seg) {
      const body = seg.closest('.m-body');
      body.querySelectorAll('[data-m-seg]').forEach((b) => b.classList.toggle('active', b === seg));
      body.querySelectorAll('[data-m-panel]').forEach((p) => { p.hidden = p.dataset.mPanel !== seg.dataset.mSeg; });
      return;
    }

    if (view === 'about') return;
    const f = state[view];

    if (t.closest('[data-m-search-open]')) { f.searching = true; closeSheet(); renderBar(true); return; }
    if (t.closest('[data-m-search-close]')) { Object.assign(f, { searching: false, q: '' }); renderBar(); renderBody(view); return; }
    if (t.closest('[data-m-cal]')) {
      if (root.querySelector('.m-sheet')) closeSheet(); else { root.insertAdjacentHTML('beforeend', sheetHtml(view)); icons(); }
      return;
    }
    if (t.closest('[data-m-sheet-close]') || t.classList.contains('m-sheet')) { closeSheet(); return; }

    const refreshSheet = () => {
      if (!root.querySelector('.m-sheet')) return;
      closeSheet();
      root.insertAdjacentHTML('beforeend', sheetHtml(view));
      root.querySelector('.m-sheet').classList.add('still'); // no fade-in replay on every tap
    };
    const year = t.closest('[data-m-year]');
    if (year) {
      f.year = year.dataset.mYear === 'all' ? null : Number(year.dataset.mYear);
      f.month = null;
      renderBar(); renderBody(view); refreshSheet();
      return;
    }
    const month = t.closest('[data-m-month]');
    if (month && !month.disabled) {
      const m = Number(month.dataset.mMonth);
      f.year = f.year || yearsOf(view)[0];
      f.month = f.month === m ? null : m; // tap again to deselect
      renderBar(); renderBody(view); refreshSheet();
      return;
    }
    const clear = t.closest('[data-m-clear]');
    if (clear) {
      if (clear.dataset.mClear !== 'date') { f.q = ''; f.searching = false; }
      if (clear.dataset.mClear !== 'q') { f.year = null; f.month = null; }
      closeSheet(); renderBar(); renderBody(view);
    }
  });

  // Typing filters live. Only the list re-renders, so the input keeps focus.
  root.addEventListener('input', (e) => {
    if (!e.target.matches('[data-m-search]')) return;
    state[view].q = e.target.value;
    renderBody(view);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSheet();
  });

  window.addEventListener('hashchange', () => setView(fromHash(), { updateHash: false }));
  setView(fromHash(), { updateHash: false });
}

// ── pages ──────────────────────────────────────────────────────

async function renderHome() {
  const site = await load('content/site.yaml');
  document.title = [site.name, site.title].filter(Boolean).join(' · ') || 'Portfolio';

  const sectionData = await Promise.all((site.sections || []).map((s) => load(s.file)));
  const bio = [].concat(site.bio || []);

  // Desktop page and phone app are both rendered; style.css shows one of them (breakpoint: 720px).
  app.classList.add('home');
  document.body.classList.add('m-home');
  const sections = site.sections || [];

  app.innerHTML = `<div class="d-page">
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
    ${sections.map((s, i) => renderSection(s, sectionData[i], i)).join('')}
    ${footer(site)}
  </div>${phoneApp(site, sections, sectionData)}`;
  initPhoneApp(app.querySelector('.m-app'), site, sections, sectionData);

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
