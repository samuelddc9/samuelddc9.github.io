(() => {
  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const motionToggle = document.querySelector('.motion-toggle');
  let paused = false;
  let revealObserver;
  const motionEnabled = () => !reducedMotion.matches && !paused;

  function revealContent() {
    revealObserver?.disconnect();
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
  }

  // Content is visible by default. Only enhance after the observer is ready.
  if (motionEnabled() && 'IntersectionObserver' in window) {
    try {
      revealObserver = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });

      const groups = [
        ['.hero-copy > *', 90], ['.hero-art', 0],
        ['.section-top > *', 100], ['.filters', 0], ['.game-card', 140],
        ['.studio-mark, .studio-copy', 110], ['.editorial-art, .editorial-copy', 120],
        ['.contact-intro, .contact-card', 120], ['.closing > div, .closing > .button', 100]
      ];
      for (const [selector, stagger] of groups) {
        document.querySelectorAll(selector).forEach((element, index) => {
          element.style.setProperty('--enter-delay', `${Math.min(index, 3) * stagger}ms`);
          if (selector === '.game-card') element.style.setProperty('--enter-x', index % 2 ? '55px' : '-55px');
          if (selector === '.studio-mark, .studio-copy') element.style.setProperty('--enter-x', index ? '40px' : '-40px');
          element.classList.add('reveal');
          revealObserver.observe(element);
        });
      }
    } catch {
      revealContent();
    }
  }

  // Keyboard navigation must never leave focused content hidden.
  document.addEventListener('focusin', event => {
    let element = event.target;
    while (element instanceof Element) {
      if (element.classList.contains('reveal')) element.classList.add('is-visible');
      element = element.parentElement;
    }
  });

  function resetTilt() {
    document.querySelectorAll('.game-image').forEach(element => {
      element.style.removeProperty('--tilt-x');
      element.style.removeProperty('--tilt-y');
    });
  }
  motionToggle?.addEventListener('click', () => {
    paused = !paused;
    root.classList.toggle('motion-paused', paused);
    motionToggle.setAttribute('aria-pressed', String(paused));
    motionToggle.textContent = paused ? 'Resume motion' : 'Pause motion';
    if (paused) { revealContent(); resetTilt(); }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) { revealContent(); resetTilt(); }
  });

  // Tilt only the artwork surface; labels and controls stay easy to read.
  document.querySelectorAll('.game-image').forEach(element => {
    let frame;
    element.addEventListener('pointermove', event => {
      if (!motionEnabled() || !finePointer.matches) return;
      cancelAnimationFrame(frame);
      const { clientX, clientY } = event;
      frame = requestAnimationFrame(() => {
        if (!motionEnabled()) return;
        const bounds = element.getBoundingClientRect();
        const x = Math.max(-0.5, Math.min(0.5, (clientX - bounds.left) / bounds.width - 0.5));
        const y = Math.max(-0.5, Math.min(0.5, (clientY - bounds.top) / bounds.height - 0.5));
        element.style.setProperty('--tilt-x', `${-y * 4}deg`);
        element.style.setProperty('--tilt-y', `${x * 4}deg`);
      });
    });
    element.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      element.style.removeProperty('--tilt-x');
      element.style.removeProperty('--tilt-y');
    });
  });

  const header = document.querySelector('.header');
  let scrollFrame;
  function updateHeader() {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = requestAnimationFrame(() => header?.classList.toggle('is-scrolled', window.scrollY > 20));
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  if ('IntersectionObserver' in window) {
    const links = document.querySelectorAll('.header nav a[href^="#"]');
    const sectionObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });
    links.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) sectionObserver.observe(section);
    });
  }
})();
