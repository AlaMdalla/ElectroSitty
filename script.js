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
