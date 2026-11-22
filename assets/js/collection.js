/* ETA'S CARS — collection page: filter, sort, currency and view */

document.addEventListener('DOMContentLoaded', () => {
  const state = { marque: 'All', sort: 'Newest', currency: 'INR', view: 'grid' };
  const out = document.querySelector('[data-results]');
  const count = document.querySelector('[data-count]');
  if (count) count.textContent = ETA.cars.length;

  function pills(container, values, key) {
    container.innerHTML = values.map(v =>
      `<button type="button" class="pill" data-key="${key}" data-value="${ETA.escape(v)}">${ETA.escape(v)}</button>`
    ).join('');
  }

  pills(document.querySelector('[data-filter-marque]'), ['All'].concat(ETA.marques), 'marque');
  pills(document.querySelector('[data-filter-sort]'), ['Newest', 'Price', 'Performance'], 'sort');
  pills(document.querySelector('[data-filter-currency]'), ['INR', 'USD', 'AED'], 'currency');

  document.querySelector('.filterbar').addEventListener('click', ev => {
    const btn = ev.target.closest('.pill');
    if (!btn) return;
    state[btn.dataset.key] = btn.dataset.value;
    render();
  });

  function list() {
    const cars = ETA.cars.filter(c => state.marque === 'All' || c.marque === state.marque);
    if (state.sort === 'Price') cars.sort((a, b) => b.cr - a.cr);
    else if (state.sort === 'Performance') cars.sort((a, b) => b.hp - a.hp);
    else cars.sort((a, b) => b.year - a.year);
    return cars;
  }

  function galleryHTML(car, i) {
    const e = ETA.escape;
    return `
      <a class="card" href="${ETA.carUrl(car)}">
        <div class="frame r-21-10"><img src="${car.img}" alt="${e(car.marque)} ${e(car.model)}" loading="lazy"></div>
        <div class="gallery-copy">
          <div class="gallery-num">${String(i + 1).padStart(2, '0')}</div>
          <div class="label" style="margin-top:20px">${e(car.marque)} · ${car.year}</div>
          <div class="gallery-model">${e(car.model)}</div>
          <div class="label" style="margin-top:24px;color:var(--text-2)">${ETA.specLine(car)}</div>
          <div class="gallery-foot"><span style="font-size:20px">${ETA.formatPrice(car.cr, state.currency)}</span><span class="label" style="color:var(--text)">View →</span></div>
        </div>
      </a>`;
  }

  function render() {
    document.querySelectorAll('.filterbar .pill').forEach(p => {
      p.classList.toggle('is-active', state[p.dataset.key] === p.dataset.value);
      p.setAttribute('aria-pressed', state[p.dataset.key] === p.dataset.value);
    });
    const cars = list();
    if (!cars.length) {
      out.innerHTML = `<p class="empty">Nothing from this marque is in the showroom right now. Call ${ETA.phoneDisplay} to ask what's arriving.</p>`;
      return;
    }
    out.innerHTML = state.view === 'grid'
      ? `<div class="card-grid animate-in">${cars.map(c => ETA.cardHTML(c, state.currency)).join('')}</div>`
      : `<div class="gallery animate-in">${cars.map(galleryHTML).join('')}</div>`;
  }

  render();
});
