// All gallery image filenames in assets/image/galeria/
// Add or remove entries as you add/remove files in that folder.
const GALLERY_IMAGES = [
  'img1.jpg',
  'img2.JPG',
  'img3.JPG',
  'img4.JPG',
  'img5.JPG',
  'img6.JPG',
  'img7.JPG',
  'img8.JPG',
  'img9.JPG',
  'img10.JPG',
  'img11.JPG',
  'img12.JPG',
  'img13.JPG',
  'img14.JPG',
  'img15.JPG',
  'img16.JPG',
  'img17.JPG',
  'img18.JPG',
  'img19.JPG',
  'img20.JPG',
  'img21.JPG',
  'img22.JPG',
  'img23.JPG',
  'img24.JPG',
  'img25.JPG',
  'img26.JPG',
  'img27.JPG',
  'img28.JPG',
  'img29.JPG',
  'img30.JPG',
  'img31.JPG',
  'img32.JPG',
  'img33.JPG',
];

const grid = document.getElementById('galeria-grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCounter = document.getElementById('lightbox-counter');
let currentIndex = 0;

// Render gallery grid
GALLERY_IMAGES.forEach((file, idx) => {
  const a = document.createElement('a');
  a.href = `assets/image/galeria/${file}`;
  a.className = 'grid-item show';
  a.dataset.index = String(idx);

  const img = document.createElement('img');
  img.src = `assets/image/galeria/${file}`;
  img.alt = file;
  img.loading = 'lazy';

  a.appendChild(img);
  a.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(idx);
  });
  grid.appendChild(a);
});

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = `assets/image/galeria/${GALLERY_IMAGES[currentIndex]}`;
  lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function showNext(step) {
  currentIndex = (currentIndex + step + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  lightboxImg.src = `assets/image/galeria/${GALLERY_IMAGES[currentIndex]}`;
  lightboxCounter.textContent = `${currentIndex + 1} / ${GALLERY_IMAGES.length}`;
}

lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', () => showNext(-1));
lightbox.querySelector('.lb-next').addEventListener('click', () => showNext(1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  else if (e.key === 'ArrowRight') showNext(1);
  else if (e.key === 'ArrowLeft') showNext(-1);
});
