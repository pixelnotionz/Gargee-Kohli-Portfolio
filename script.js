
/* 
   INTRO ANIMATION SEQUENCE
 */
(function () {

  const urlParams = new URLSearchParams(window.location.search);
  const skipIntro = urlParams.get('skipIntro');

  const intro       = document.getElementById('intro');
  const main        = document.getElementById('main');
  const homeContent = document.getElementById('homeContent');

  const letterG     = document.querySelector('.letter-g');
  const letterK     = document.querySelector('.letter-k');
  const introPortfolio = document.querySelector('.intro-portfolio-text');

  /* SKIP INTRO CASE */
  if (skipIntro === "true") {

    if (intro) intro.remove();

    main.classList.add('visible');

    document.body.style.overflow = '';

    homeContent.classList.add('animate-in');

    return;

  }

  /* NORMAL INTRO */

  document.body.style.overflow = 'hidden';

  const seq = [

    () => {
      letterG.classList.add('split');
      letterK.classList.add('split');
      introPortfolio.style.opacity = '0';
      introPortfolio.style.transform = 'translateY(-20px)';
    },

    () => {
      intro.classList.add('fade-out');
    },

    () => {
      main.classList.add('visible');
      document.body.style.overflow = '';
    },

    () => {
      homeContent.classList.add('animate-in');
    }

  ];

  const timings = [700, 1700, 2350, 2450];

  timings.forEach((t, i) => setTimeout(seq[i], t));

  setTimeout(() => {
    if (intro.parentNode) intro.parentNode.removeChild(intro);
  }, 3500);

})();

/* 
   SCROLL REVEAL
 */
(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

/* 
   SMOOTH NAV ACTIVE STATE
 */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.getAttribute('id');
        links.forEach(l => {
          l.style.color = l.getAttribute('href') === `#${id}` ? 'var(--cream)' : '';
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(s => obs.observe(s));
})();