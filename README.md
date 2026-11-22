# ETA'S CARS: website

Premium pre-owned car website for ETA'S CARS, Nungambakkam, Chennai.
Plain HTML, CSS and JavaScript. No build step and nothing to install.

## Open it in VS Code

1. Unzip the folder and open it in VS Code (**File › Open Folder…**).
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

You can also double-click `index.html` to open it in a browser.

## Files

```
index.html            Homepage
collection.html       All cars, with filter, sort, currency and grid/gallery view
car.html              Car detail page (BMW M8 Competition)
assets/css/style.css  All styles, including the mobile layout (under 720px)
assets/js/data.js     Car inventory, prices, phone number: edit cars here
assets/js/main.js     Shared behaviour: brand strip, homepage cards, enquiry form
assets/js/collection.js  Collection page filters
assets/js/car.js      Detail page views, colour swatches, finance calculator
assets/img/           Logo, favicon and all photos
```

## Common edits

- **Add, remove or change a car:** edit the `cars` list in `assets/js/data.js`. The homepage and collection update automatically. Set `featured: true` to show a car on the homepage (the first 6 are shown).
- **Prices:** `cr` is the price in crore (2.45 = ₹2.45 Cr).
- **Currency rates:** `rates` in `data.js` (currently ₹88 per USD, ₹24 per AED, approximate).
- **Finance interest rate:** `data-rate="9"` in `car.html`.
- **Colours and fonts:** the variables at the top of `style.css`.

## Before going live

- [ ] Replace the AI-generated car photos with real photos of your actual stock.
- [ ] Replace the indicative prices with real prices.
- [ ] Add opening hours (footer of `index.html`).
- [ ] Add a real client testimonial, or remove that section.
- [ ] Fill in mileage, owners and warranty on `car.html`.
- [ ] Add your Instagram link in the footer.
- [ ] Connect the newsletter form to an email service (Mailchimp, Brevo, etc.).

## How the enquiry form works

The contact form opens WhatsApp with the customer's details already typed in,
addressed to +91 95000 10046. It needs no server. To receive enquiries by email
instead, use a form service such as Formspree or Netlify Forms.

## One page per car

Right now every car card links to `car.html` (the M8). To give each car its own page,
copy `car.html` (for example `car-911.html`), change the text and images, and update
`carUrl()` in `data.js` so each card links to its own page.

## Hosting

Upload the whole folder to any static host: Netlify, Vercel, GitHub Pages, Hostinger, or
your existing web host's `public_html` folder.
