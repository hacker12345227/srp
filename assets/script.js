// =========================================================
// SANDY ROLEPLAY — gedeelde scripts
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- mobiel menu ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- actieve link markeren ---- */
  const normalizePath = (p) => {
    if (p.endsWith('/index.html')) p = p.slice(0, -('index.html'.length));
    if (!p.endsWith('/')) p += '/';
    return p;
  };
  const currentPath = normalizePath(window.location.pathname);
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href) return;
    let linkPath;
    try { linkPath = normalizePath(new URL(href, window.location.href).pathname); }
    catch (e) { return; }
    if (linkPath === currentPath) a.classList.add('active');
  });

  /* ---- kopieer-knoppen (bv. server-IP) ---- */
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      const original = btn.dataset.originalLabel || btn.textContent;
      btn.dataset.originalLabel = original;
      try {
        await navigator.clipboard.writeText(value);
        btn.textContent = 'Gekopieerd ✓';
      } catch (e) {
        btn.textContent = 'Kopiëren mislukt';
      }
      clearTimeout(btn._copyTimeout);
      btn._copyTimeout = setTimeout(() => { btn.textContent = original; }, 1800);
    });
  });

  /* ---- scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---- accordion (support / FAQ) ---- */
  document.querySelectorAll('.accordion-item').forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.accordion').querySelectorAll('.accordion-item.open').forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove('open');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });

});
