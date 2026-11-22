/* ETA'S CARS — inventory and shared helpers.
   Edit the CARS list to update every page. Prices are in crore (₹1 Cr = ₹1,00,00,000).
   All prices below are indicative placeholders: replace them with your real stock. */

const ETA = {
  phone: '+919500010046',
  phoneDisplay: '+91 95000 10046',
  whatsapp: '919500010046',

  // Approximate conversion rates for the currency switch. Update or replace with a live feed.
  rates: { USD: 88, AED: 24 },

  marques: ['Mercedes-Benz', 'BMW', 'Audi', 'Porsche', 'Bentley', 'Range Rover', 'Lamborghini'],

  cars: [
    { id: 's580', marque: 'Mercedes-Benz', year: 2025, model: 'S 580 4MATIC', hp: 496, accel: 4.4, drive: 'AWD', cr: 2.35, status: 'Available', img: 'assets/img/car-mercedes-s580.jpg', featured: true },
    { id: 'g63', marque: 'Mercedes-Benz', year: 2025, model: 'AMG G 63', hp: 577, accel: 4.3, drive: 'AWD', cr: 3.60, status: 'Reserved', img: 'assets/img/car-amg-g63.jpg', featured: true },
    { id: 'm8', marque: 'BMW', year: 2024, model: 'M8 Competition Coupé', hp: 617, accel: 3.2, drive: 'AWD', cr: 2.45, status: 'Available', img: 'assets/img/car-bmw-m8.jpg', featured: true },
    { id: 'i7', marque: 'BMW', year: 2025, model: 'i7 xDrive60', hp: 536, accel: 4.7, drive: 'AWD', cr: 2.05, status: 'Available', img: 'assets/img/car-bmw-i7.jpg' },
    { id: 'rsetrongt', marque: 'Audi', year: 2025, model: 'RS e-tron GT', hp: 637, accel: 3.3, drive: 'AWD', cr: 1.95, status: 'Arriving Soon', img: 'assets/img/car-audi-rs-etron-gt.jpg', featured: true },
    { id: 'rsq8', marque: 'Audi', year: 2024, model: 'RS Q8', hp: 591, accel: 3.6, drive: 'AWD', cr: 2.20, status: 'Available', img: 'assets/img/car-audi-rsq8.jpg' },
    { id: '911', marque: 'Porsche', year: 2025, model: '911 Turbo S', hp: 640, accel: 2.7, drive: 'AWD', cr: 3.35, status: 'Available', img: 'assets/img/car-porsche-911.jpg', featured: true },
    { id: 'gtspeed', marque: 'Bentley', year: 2025, model: 'Continental GT Speed', hp: 650, accel: 3.6, drive: 'AWD', cr: 5.20, status: 'Available', img: 'assets/img/car-bentley-gt-speed.jpg', featured: true }
  ],

  formatPrice(cr, currency = 'INR') {
    if (currency === 'USD') return '$' + Math.round(cr * 1e7 / this.rates.USD / 1000).toLocaleString('en-US') + 'K';
    if (currency === 'AED') return 'AED ' + (cr * 1e7 / this.rates.AED / 1e6).toFixed(2) + 'M';
    return '₹' + cr.toFixed(2) + ' Cr';
  },

  specLine(car) {
    return `${car.hp} HP · ${car.accel} S · ${car.drive}`;
  },

  escape(s) {
    return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  },

  // All cards link to car.html for now. When you add a page per car, change this to `car.html?id=${car.id}`.
  carUrl(car) {
    return 'car.html';
  },

  cardHTML(car, currency) {
    const e = this.escape;
    return `
      <a class="card" href="${this.carUrl(car)}">
        <div class="frame r-4-3">
          <img src="${car.img}" alt="${e(car.marque)} ${e(car.model)}" loading="lazy" width="1200" height="896">
          <div class="card-strip"><span>${this.specLine(car)}</span><span>View details →</span></div>
        </div>
        <div class="card-meta">
          <div>
            <div class="label">${e(car.marque)} · ${car.year}</div>
            <div class="card-model">${e(car.model)}</div>
          </div>
          <div>
            <div class="card-price">${this.formatPrice(car.cr, currency)}</div>
            <div class="status">${e(car.status)}</div>
          </div>
        </div>
      </a>`;
  }
};
