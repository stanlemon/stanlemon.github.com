// Shrink header image on scroll (for non-homepage pages only)
(function() {
  'use strict';

  // Only run on non-homepage pages
  if (document.body.classList.contains('homepage')) {
    return;
  }

  const headerWrapper = document.querySelector('.header-wrapper');
  const headerImg = document.querySelector('.post-img');

  if (!headerWrapper || !headerImg) {
    return;
  }

  let ticking = false;
  const scrollThreshold = 50; // Start shrinking after 50px of scroll

  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.scrollY > scrollThreshold;

        if (scrolled) {
          headerWrapper.classList.add('shrink');
          headerImg.classList.add('shrink');
        } else {
          headerWrapper.classList.remove('shrink');
          headerImg.classList.remove('shrink');
        }

        ticking = false;
      });

      ticking = true;
    }
  }

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Check initial state
  handleScroll();
})();
