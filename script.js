const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');

menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.desktop-nav a').forEach(link => {
  link.addEventListener('click', () => {
    header.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const electroMedia = [
  'WhatsApp_Image_2025-12-27_at_21.webp', 'IS_XP215A_-1600x1600h.webp',
  'WhatsApp_Image_2025-10-18_at_4_r6iHeZP.webp', '1_sK3PzZh.webp',
  'WhatsApp_Image_2025-09-17_at_1_TJfIPgR.webp', '4_VuVLBC3.webp',
  '10_taUVRa2.webp', 'WhatsApp_Image_2025-09-14_at_1.webp',
  'IS_XP215A_FRONT-1600x1600h.webp', '7_m9m9BY9.webp',
  'Design_sans_titre_1_38CBpsn.webp', 'WhatsApp_Image_2025-10-10_at_8.webp',
  '11_sZGsc66.webp', '12_6g5y5bs.webp', '13_TlWzoUd.webp', '14_nZbrn6T.webp',
  '15_d0DXovf.webp', '16_FrqOQDs.webp', '17_xdMUlbG.webp', '19_4RIm8k7.webp',
  '2_4K1HnHV.webp', '2_Xk4TTHm.webp', '3_EMj5q5P.webp', '3_OKDkoQL.webp',
  '4_FdxdhQp.webp', '4_sHWMpql.webp', '5_B1Uzc7U.webp', '6_eQMdX4R.webp',
  '6_xmP2wUz.webp', '7_JhBLEcc.webp', '8_0gRAnTV.webp', '8_9trBURg.webp',
  '9_8FlTlJu.webp', '9_kStPg0D.webp',
  'Blanc_Elegant_et_Simple_General_Photographie_Site_Web.webp',
  'E_2.png', 'SITTY_QigJfa9.png', 'Screenshot_from_2024-09-06_18-24-02.webp',
  'WhatsApp_Image_2025-09-14_at_1_9S6PSKc.webp',
  'WhatsApp_Image_2025-09-14_at_1_BJopJge.webp',
  'WhatsApp_Image_2025-09-14_at_1_CJp5F78.webp',
  'WhatsApp_Image_2025-09-17_at_1_etRcy4b.webp',
  'WhatsApp_Image_2025-10-18_at_4.webp',
  'WhatsApp_Image_2025-10-18_at_4_Aew0XzA.webp',
  'WhatsApp_Image_2025-10-18_at_4_QmM4GRs.webp',
  'WhatsApp_Image_2025-12-27_at_21_57lfOSx.webp',
  'WhatsApp_Image_2025-12-27_at_21_UzaS72n.webp',
  'WhatsApp_Image_2025-12-27_at_21_aPAtZ6t.webp',
  'location-machine-a-etincelles-lorient-caudan-removebg-preview.webp',
  'logo_electrosittytn.webp', 'mac-mah-par-led-12x12w__1_-removebg-preview.webp'
];

const mediaWall = document.querySelector('#mediaWall');
const mediaMore = document.querySelector('#mediaMore');
const lightbox = document.querySelector('#lightbox');
let visibleMedia = 12;
let activeMedia = 0;

function renderMedia() {
  mediaWall.innerHTML = electroMedia.slice(0, visibleMedia).map((file, index) => `
    <button class="media-tile" type="button" data-index="${index}" aria-label="Ouvrir le média ${index + 1}">
      <img src="assets/original-site/${file}" alt="Collection Electro Sitty — média ${index + 1}" loading="lazy">
      <span>${String(index + 1).padStart(2, '0')}</span>
    </button>
  `).join('');
  const remaining = electroMedia.length - visibleMedia;
  mediaMore.hidden = remaining <= 0;
  mediaMore.querySelector('b').textContent = remaining > 0 ? `+ ${remaining}` : '';
}

function showLightbox(index) {
  activeMedia = index;
  lightbox.querySelector('img').src = `assets/original-site/${electroMedia[index]}`;
  lightbox.querySelector('.lightbox-index').textContent = `${String(index + 1).padStart(2, '0')} / ${electroMedia.length}`;
  if (!lightbox.open) lightbox.showModal();
}

renderMedia();
mediaMore.addEventListener('click', () => {
  visibleMedia = electroMedia.length;
  renderMedia();
});
mediaWall.addEventListener('click', event => {
  const tile = event.target.closest('.media-tile');
  if (tile) showLightbox(Number(tile.dataset.index));
});
lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.querySelector('.lightbox-prev').addEventListener('click', () => showLightbox((activeMedia - 1 + electroMedia.length) % electroMedia.length));
lightbox.querySelector('.lightbox-next').addEventListener('click', () => showLightbox((activeMedia + 1) % electroMedia.length));
lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
document.addEventListener('keydown', event => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showLightbox((activeMedia - 1 + electroMedia.length) % electroMedia.length);
  if (event.key === 'ArrowRight') showLightbox((activeMedia + 1) % electroMedia.length);
});

const quoteForm = document.querySelector('#quoteForm');
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const selectedServices = data.getAll('service');
  const services = selectedServices.length ? selectedServices.join(', ') : 'À définir avec vous';
  const date = data.get('date') || 'À définir';
  const message = [
    'Bonjour Electro Sitty 👋',
    '',
    'Je souhaite demander un devis :',
    `• Événement : ${data.get('event')}`,
    `• Services : ${services}`,
    `• Date : ${date}`,
    `• Invités : ${data.get('guests')}`,
    '',
    'Pouvez-vous me conseiller ?'
  ].join('\n');
  window.open(`https://wa.me/21653308760?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 100 && window.innerWidth > 950) {
    header.style.position = 'fixed';
    header.style.background = 'rgba(8,9,9,.88)';
    header.style.backdropFilter = 'blur(18px)';
  } else if (!header.classList.contains('menu-open')) {
    header.style.position = 'absolute';
    header.style.background = 'transparent';
    header.style.backdropFilter = 'none';
  }
}, { passive: true });
