/* ETA'S CARS — shared page behaviour */

document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // Brand marquee (homepage)
  const track = document.querySelector('[data-marquee]');
  if (track) {
    const names = ETA.marques.concat(ETA.marques);
    track.innerHTML = names.map(n => `<span>${ETA.escape(n)}</span>`).join('');
  }

  // Featured car grid (homepage)
  const featured = document.querySelector('[data-featured-cars]');
  if (featured) {
    featured.innerHTML = ETA.cars.filter(c => c.featured).slice(0, 6).map(c => ETA.cardHTML(c, 'INR')).join('');
  }

  // Enquiry form: opens WhatsApp with the details filled in (no server needed).
  const form = document.querySelector('[data-enquiry]');
  if (form) {
    form.addEventListener('submit', ev => {
      ev.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const contact = (data.get('contact') || '').toString().trim();
      const note = form.querySelector('.form-note');
      if (!name || !contact) {
        note.textContent = 'Please add your name and a phone number or email.';
        return;
      }
      const msg = `Hello ETA'S CARS, I'm ${name}. I'd like to ${data.get('intent')}. Car of interest: ${data.get('car')}. Contact: ${contact}`;
      window.open(`https://wa.me/${ETA.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
      note.textContent = 'Opening WhatsApp. If nothing happens, call us on ' + ETA.phoneDisplay + '.';
    });
  }

  // Newsletter: placeholder until connected to an email service.
  const news = document.querySelector('[data-newsletter]');
  if (news) {
    news.addEventListener('submit', ev => {
      ev.preventDefault();
      const input = news.querySelector('input');
      input.value = '';
      input.placeholder = 'Thank you. You are on the list.';
    });
  }
});
