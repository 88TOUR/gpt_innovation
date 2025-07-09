// Scroll to top on navigation (optional enhancement)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const section = document.querySelector(targetId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
