// Light/dark theme. Loaded in <head> (not deferred) so the right theme applies before first paint.
// Defaults to the system setting; clicking the toggle saves the visitor's choice in their browser.

(function () {
  const root = document.documentElement;
  const system = window.matchMedia('(prefers-color-scheme: dark)');

  const saved = () => {
    try { return localStorage.getItem('theme'); } catch { return null; }
  };
  const apply = (theme) => { root.dataset.theme = theme; };

  apply(saved() || (system.matches ? 'dark' : 'light'));

  // Follow system changes until the visitor picks a theme themselves.
  system.addEventListener('change', (e) => {
    if (!saved()) apply(e.matches ? 'dark' : 'light');
  });

  const sun = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const moon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>';

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.createElement('button');
    btn.className = 'theme-toggle';

    const sync = () => {
      const dark = root.dataset.theme === 'dark';
      btn.innerHTML = dark ? sun : moon;
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.title = btn.getAttribute('aria-label');
    };

    btn.addEventListener('click', () => {
      const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch {}
      sync();
    });

    new MutationObserver(sync).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    sync();
    document.body.appendChild(btn);
  });
})();
