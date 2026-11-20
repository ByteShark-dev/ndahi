/* Ndähi — interacciones sin dependencias */
'use strict';

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');

// Menú accesible para pantallas pequeñas.
function setMenu(open) {
  if (!menuToggle || !mobileMenu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileMenu.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 830) setMenu(false);
  });
}

// Mostrar logotipo proporcionado por el equipo cuando exista el archivo.
const uploadedLogo = document.querySelector('[data-brand-img]');
const brandFallback = document.querySelector('[data-brand-fallback]');
if (uploadedLogo && brandFallback) {
  uploadedLogo.addEventListener('load', () => {
    uploadedLogo.hidden = false;
    brandFallback.hidden = true;
  });
  uploadedLogo.addEventListener('error', () => {
    uploadedLogo.hidden = true;
    brandFallback.hidden = false;
  });
  if (uploadedLogo.complete && uploadedLogo.naturalWidth > 0) {
    uploadedLogo.hidden = false;
    brandFallback.hidden = true;
  }
}

// Las fotografías sustituyen automáticamente las tarjetas temporales.
document.querySelectorAll('[data-gallery-image]').forEach((photo) => {
  const placeholder = photo.parentElement?.querySelector('.gallery-empty');
  const showPhoto = () => {
    photo.hidden = false;
    if (placeholder) placeholder.hidden = true;
  };
  const showPlaceholder = () => {
    photo.hidden = true;
    if (placeholder) placeholder.hidden = false;
  };
  photo.addEventListener('load', showPhoto);
  photo.addEventListener('error', showPlaceholder);
  if (photo.complete && photo.naturalWidth > 0) showPhoto();
});

// Animaciones suaves; se respetan las preferencias de movimiento reducido.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('motion-ready');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -18px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Año del pie actualizado automáticamente.
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
