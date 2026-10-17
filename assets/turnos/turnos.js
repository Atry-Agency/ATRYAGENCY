/* Product interactions. No network requests, cookies, booking forms or third-party analytics. */
(() => {
  'use strict';
  const config = window.ATRY_CONFIG?.atryTurnos;
  const safeAppUrl = value => {
    try { const url = new URL(value); return url.protocol === 'https:' && url.origin === 'https://atry-agency.github.io' && url.pathname === '/ATRY-Turnos/' ? url.href : null; } catch { return null; }
  };
  document.querySelectorAll('[data-turnos-link]').forEach(link => {
    const url = safeAppUrl(config?.[link.dataset.turnosLink]);
    if (url) link.href = url;
  });
  // HTML is also a complete, crawlable fallback. Keep displayed prices in sync with the central catalog.
  config?.plans?.forEach(plan => {
    const node = document.querySelector(`[data-plan-price="${plan.code}"]`);
    if (node && Number.isFinite(plan.price) && plan.price >= 0) node.textContent = '$' + new Intl.NumberFormat('es-UY').format(plan.price);
  });
  function track(event, extra = {}) {
    window.dispatchEvent(new CustomEvent('atry:track', { detail: { event, path: location.pathname, ...extra } }));
  }
  if (document.body.classList.contains('turnos-page')) track('turnos_landing_view');
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { track(entry.target.dataset.turnosView); observer.unobserve(entry.target); } });
  }, { threshold: .15 }) : null;
  document.querySelectorAll('[data-turnos-view]').forEach(el => { if (observer) observer.observe(el); else track(el.dataset.turnosView); });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('tp-enter'); reveal.unobserve(entry.target); }
    }), { threshold: .12 });
    document.querySelectorAll('.tp-section-heading,.tp-editorial,.tp-steps article,.tp-feature-image,.tp-identity,.tp-plan').forEach(el => reveal.observe(el));
  }
  const screens = {
    reservas: { src: 'assets/turnos/reservas.webp', alt: 'Página real de reservas: servicios, profesional y selección de fecha', caption: '01 / Tu cliente elige un servicio y continúa con el profesional, la fecha y la hora.' },
    agenda: { src: 'assets/turnos/agenda.webp', alt: 'Calendario semanal real con nueve reservas de demostración distribuidas por día y profesional', caption: '02 / Las reservas aparecen en tu agenda. Podés consultar por día, semana, mes y profesional.' },
    dashboard: { src: 'assets/turnos/dashboard.webp', alt: 'Resumen real del negocio con próximos turnos, profesionales y actividad', caption: '03 / Desde Inicio consultás tus próximos turnos y el resumen de actividad de tu negocio.' }
  };
  const image = document.getElementById('demo-image');
  document.querySelectorAll('[data-demo]').forEach(button => button.addEventListener('click', () => {
    const screen = screens[button.dataset.demo];
    if (!image || !screen) return;
    document.querySelectorAll('[data-demo]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    image.classList.remove('is-changing');
    image.src = screen.src; image.alt = screen.alt;
    document.getElementById('demo-enlarge').href = screen.src;
    document.getElementById('demo-enlarge').setAttribute('aria-label', 'Abrir captura en tamaño completo: ' + button.textContent.trim());
    document.getElementById('demo-caption').textContent = screen.caption + ' Entorno de demostración. Tocá la imagen para verla en detalle.';
    requestAnimationFrame(() => image.classList.add('is-changing'));
    // Clicks are recorded exactly once by conversion.js through data-track.
  }));
  document.querySelectorAll('[data-turnos-faq]').forEach(details => details.addEventListener('toggle', () => {
    if (details.open) track('turnos_faq_open', { question: details.dataset.turnosFaq });
  }));
})();
