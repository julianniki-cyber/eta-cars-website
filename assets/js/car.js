/* ETA'S CARS — car detail page: views, swatches, finance calculator */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Viewing angles
  document.querySelectorAll('[data-view]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(b => { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
      const current = document.querySelector('[data-viewer] img');
      const next = current.cloneNode();   // a fresh node replays the fade-in
      next.src = btn.dataset.src;
      next.alt = btn.dataset.alt;
      current.replaceWith(next);
    });
  });

  // ----- Swatches (exterior + interior)
  document.querySelectorAll('[data-swatches]').forEach(group => {
    const label = document.querySelector(group.dataset.swatches);
    group.addEventListener('click', ev => {
      const sw = ev.target.closest('.swatch');
      if (!sw) return;
      group.querySelectorAll('.swatch').forEach(s => { s.classList.remove('is-active'); s.setAttribute('aria-pressed', 'false'); });
      sw.classList.add('is-active');
      sw.setAttribute('aria-pressed', 'true');
      if (label) label.textContent = sw.getAttribute('aria-label');
    });
  });

  // ----- Finance calculator
  const calc = document.querySelector('[data-finance]');
  if (calc) {
    const price = Number(calc.dataset.price);
    const rate = Number(calc.dataset.rate) / 100 / 12;
    const down = calc.querySelector('[name=down]');
    const months = calc.querySelector('[name=months]');
    const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
    const update = () => {
      const d = Number(down.value), n = Number(months.value);
      const principal = price * (1 - d / 100);
      const emi = principal * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1);
      calc.querySelector('[data-out=down]').textContent = `${d}% · ${inr(price * d / 100)}`;
      calc.querySelector('[data-out=months]').textContent = `${n} months`;
      calc.querySelector('[data-out=emi]').textContent = inr(emi);
    };
    down.addEventListener('input', update);
    months.addEventListener('input', update);
    update();
  }

  // ----- Related cars
  const related = document.querySelector('[data-related]');
  if (related) {
    const ids = related.dataset.related.split(',');
    related.innerHTML = ETA.cars.filter(c => ids.includes(c.id)).map(c => ETA.cardHTML(c, 'INR')).join('');
  }
});
