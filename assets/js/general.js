// Smooth scroll for in-page anchor links
document.addEventListener('click', function (event) {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  const hash = link.getAttribute('href');
  if (hash === '#' || hash.length < 2) return;
  const target = document.querySelector(hash);
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  history.replaceState(null, '', hash);
});

// Mobile nav toggle styling (active class on burger label)
document.addEventListener('DOMContentLoaded', function () {
  const navToggleLabel = document.querySelector('.nav-toggle-label');
  if (navToggleLabel) {
    navToggleLabel.addEventListener('click', function () {
      navToggleLabel.classList.toggle('nav-toggle-active');
    });
  }
});

// Auto-close mobile nav when clicking outside
window.addEventListener('mouseup', function (event) {
  const navUl = document.getElementById('nav-ul');
  const label = document.getElementById('nav-toggle-label');
  const checkbox = document.getElementById('nav-toggle');
  if (!label || !navUl || !checkbox) return;
  if (
    label.classList.contains('nav-toggle-active') &&
    !navUl.contains(event.target) &&
    !label.contains(event.target)
  ) {
    navUl.classList.add('hide');
    setTimeout(() => navUl.classList.remove('hide'), 200);
    checkbox.checked = false;
    label.classList.remove('nav-toggle-active');
  }
});

// Auto-close services dropdown (PC) when clicking outside
window.addEventListener('mouseup', function (event) {
  const sluzbyBox = document.getElementById('show-dropdown');
  const sluzbyLabel = document.getElementById('sluzby-toggle-label');
  const sluzbyCheckbox = document.getElementById('sluzby-toggle');
  if (!sluzbyBox || !sluzbyLabel || !sluzbyCheckbox) return;
  if (!sluzbyBox.contains(event.target) && !sluzbyLabel.contains(event.target)) {
    sluzbyBox.style.transform = sluzbyBox.style.transform.replace(
      /scale\([0-9|\.]*\)/,
      'scale(0)'
    );
    sluzbyCheckbox.checked = false;
  }
});

// Scroll-to-top fade
const scrollTopBtn = document.getElementById('scrolltop');
if (scrollTopBtn) {
  scrollTopBtn.style.transition = 'opacity 0.25s ease';
  scrollTopBtn.style.opacity = '0';
  scrollTopBtn.style.pointerEvents = 'none';
  window.addEventListener('scroll', function () {
    if (window.scrollY > 0) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });
}

// "Zistiť viac" button click animation + redirect
document.addEventListener('click', function (event) {
  const btn = event.target.closest('.viac-btn');
  if (!btn) return;
  const href = btn.getAttribute('data-href');
  if (!href) return;

  const effect = document.createElement('div');
  effect.id = 'effect';
  document.body.appendChild(effect);

  btn.classList.add('button-ani');
  effect.classList.add('effect-ani');

  setTimeout(() => {
    btn.classList.remove('button-ani');
    if (effect.parentNode) effect.parentNode.removeChild(effect);
  }, 850);
  setTimeout(() => {
    location.href = href;
  }, 750);
});
