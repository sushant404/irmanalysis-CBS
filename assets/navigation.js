/* Navigation behaviors for the integral content analysis page */
/* Reading progress bar, sticky TOC active-state highlighting, back-to-top button */

(function() {
  'use strict';

  // ============================================================
  // Reading progress bar
  // ============================================================
  const progressBar = document.getElementById('reading-progress');

  function updateProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    if (progressBar) {
      progressBar.style.width = pct + '%';
    }
  }

  // ============================================================
  // Back-to-top button
  // ============================================================
  const backToTop = document.getElementById('back-to-top');
  const showAfter = 600; // px scrolled before button appears

  function updateBackToTop() {
    if (!backToTop) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > showAfter) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ============================================================
  // Sticky TOC sidebar — visibility + active section highlight
  // ============================================================
  const tocSidebar = document.getElementById('toc-sidebar');
  const sectionIds = ['frame', 'source', 'pass1', 'pass2', 'pass3', 'pass4', 'pass5', 'pass6', 'factcheck', 'sources', 'pass7'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const tocLinks = tocSidebar ? Array.from(tocSidebar.querySelectorAll('a')) : [];

  function updateTocSidebar() {
    if (!tocSidebar) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Show sidebar only after the masthead has scrolled past
    if (scrollTop > 400) {
      tocSidebar.classList.add('visible');
    } else {
      tocSidebar.classList.remove('visible');
    }

    // Highlight the section currently in view
    const viewportMidpoint = scrollTop + window.innerHeight * 0.3;
    let activeIndex = -1;
    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].getBoundingClientRect().top + scrollTop;
      if (top <= viewportMidpoint) {
        activeIndex = i;
      } else {
        break;
      }
    }

    tocLinks.forEach((link, i) => {
      const li = link.parentElement;
      if (i === activeIndex) {
        li.classList.add('active');
      } else {
        li.classList.remove('active');
      }
    });
  }

  // ============================================================
  // Smooth scroll for in-page anchor links (TOC + sidebar)
  // ============================================================
  function smoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').substring(1);
        if (!targetId) return;
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update the URL without jumping
          if (history.pushState) {
            history.pushState(null, null, '#' + targetId);
          }
        }
      });
    });
  }

  // ============================================================
  // Combined scroll handler — throttled with requestAnimationFrame
  // ============================================================
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        updateProgress();
        updateBackToTop();
        updateTocSidebar();
        ticking = false;
      });
      ticking = true;
    }
  }

  // ============================================================
  // Initialize
  // ============================================================
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('DOMContentLoaded', function() {
    smoothScrollAnchors();
    updateProgress();
    updateBackToTop();
    updateTocSidebar();
  });

  // If DOM already loaded by the time this script runs
  if (document.readyState !== 'loading') {
    smoothScrollAnchors();
    updateProgress();
    updateBackToTop();
    updateTocSidebar();
  }
})();
