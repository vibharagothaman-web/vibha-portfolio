const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const reveals = document.querySelectorAll('.reveal');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('.case-button.is-placeholder').forEach(link => {
  link.addEventListener('click', event => event.preventDefault());
});

document.querySelectorAll('.concept-details-button').forEach(button => {
  const dialog = document.getElementById(button.dataset.dialog);
  if (!dialog) return;
  const openDialog = () => {
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };
  const closeDialog = () => {
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };
  button.addEventListener('click', openDialog);
  dialog.querySelector('.dialog-close')?.addEventListener('click', closeDialog);
  dialog.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
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
reveals.forEach(el => observer.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', event => {
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});
