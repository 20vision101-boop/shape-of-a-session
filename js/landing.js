/* Homepage navigation and motion controls; no dependencies or storage. */
(() => {
  const hero = document.querySelector('.fc-hero');
  const toggle = document.querySelector('.fc-toggle');
  const overlay = document.querySelector('.fc-overlay');
  const backdrop = document.querySelector('.fc-backdrop');
  const panel = document.querySelector('.fc-panel');
  if (!hero || !toggle || !overlay || !backdrop || !panel) return;

  const desktop = matchMedia('(min-width: 1024px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let isOpen = false;
  let previousOverflow = '';
  document.documentElement.classList.add('fc-menu-ready');
  toggle.hidden = false;
  const background = [
    document.querySelector('.fc-content'),
    document.querySelector('.fc-bottom'),
    document.querySelector('main'),
    document.querySelector('footer'),
    document.querySelector('.fc-brand')
  ].filter(Boolean);
  const savedInert = new Map();

  function setMenu(open, restoreFocus = true) {
    if (open === isOpen || (open && desktop.matches)) return;
    isOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    overlay.classList.toggle('is-open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    overlay.inert = !open;
    if (open) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      background.forEach(element => {
        savedInert.set(element, element.inert);
        element.inert = true;
      });
      panel.querySelector('a').focus();
    } else {
      document.body.style.overflow = previousOverflow;
      background.forEach(element => { element.inert = savedInert.get(element); });
      savedInert.clear();
      if (restoreFocus) toggle.focus();
    }
  }

  toggle.addEventListener('click', () => setMenu(!isOpen));
  backdrop.addEventListener('click', () => setMenu(false));
  overlay.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    setMenu(false, false);
    if (link.hash) {
      const target = document.getElementById(link.hash.slice(1));
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
  document.addEventListener('keydown', event => {
    if (!isOpen) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false);
    }
    if (event.key === 'Tab') {
      const links = [...panel.querySelectorAll('a[href]')];
      const first = toggle;
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  desktop.addEventListener('change', () => {
    if (desktop.matches) setMenu(false, false);
  });

  const video = document.querySelector('.fc-video');
  const motion = document.querySelector('.fc-motion');
  if (!video || !motion) return;
  let userPaused = false;
  const updateLabel = () => {
    motion.textContent = video.paused ? 'Play background' : 'Pause background';
  };
  const applyMotion = () => {
    motion.hidden = reducedMotion.matches;
    if (reducedMotion.matches || userPaused) video.pause();
    else video.play().catch(updateLabel);
    updateLabel();
  };
  motion.addEventListener('click', () => {
    userPaused = !video.paused;
    if (userPaused) video.pause();
    else video.play().catch(updateLabel);
    updateLabel();
  });
  video.addEventListener('play', updateLabel);
  video.addEventListener('pause', updateLabel);
  reducedMotion.addEventListener('change', applyMotion);
  applyMotion();
})();
