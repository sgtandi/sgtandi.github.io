// Live clocks: any <time data-clock="Area/City">
const clocks = [...document.querySelectorAll('[data-clock]')].map((el) => ({
  el,
  fmt: new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: el.dataset.clock }),
}));
const tick = () => clocks.forEach(({ el, fmt }) => { el.textContent = fmt.format(new Date()); });
tick();
setInterval(tick, 15000);

// Case-study images sit in square frames; click one to see it full size.
document.querySelectorAll('main.case figure img').forEach((img) => {
  img.addEventListener('click', () => window.open(img.currentSrc || img.src, '_blank', 'noopener'));
});
