(() => {
  const header = document.querySelector('.site-header');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!header) return;

  const syncScroll = () => header.classList.toggle('v41-scrolled', window.scrollY > 24);
  const syncNav = () => {
    const current = location.pathname.replace(/\/$/, '') || '/';
    header.querySelectorAll('.desktop-nav a,.mobile-nav__panel a').forEach(link => {
      const href = new URL(link.href, location.origin).pathname.replace(/\/$/, '') || '/';
      if (href === current) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  };

  window.addEventListener('scroll', syncScroll, { passive: true });
  mobileNav?.addEventListener('toggle', () => document.body.classList.toggle('v41-nav-open', mobileNav.open));
  syncScroll();
  syncNav();
})();
