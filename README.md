# Kaarigar: Handmade Marketplace (Frontend)

Kaarigar is an Etsy-style marketplace for Pakistani artisans and home-based sellers. This is the **React frontend**. All data is saved in the browser (localStorage) until the backend is connected.

## Quick demo (no setup)

Open **`Kaarigar-Demo.html`** in Chrome or Edge. The whole app is in this one file.

## Run the project

You need Node.js 18+.

```bash
npm install
npm run dev          # start at http://localhost:5173
npm run build        # production build in /dist
npm run build:demo   # single-file demo in /demo/index.html
```

## Demo accounts (password: `123456`)

| Role   | Email               |
|--------|---------------------|
| Buyer  | buyer@kaarigar.pk   |
| Seller | seller@kaarigar.pk  |
| Admin  | admin@kaarigar.pk   |

Promo codes at checkout: `KAARIGAR10` (10% off), `EID20` (20% off).

## Pages

| Page | Route | What works |
|---|---|---|
| Home | `/` | Categories, trending, deals, shops, new arrivals |
| Shop / Search | `/shop` | Search, category, price, city, rating, free-delivery and sale filters, sorting, load more |
| Product details | `/product/:id` | Gallery, quantity, add to cart, buy now, favourites, reviews (add your own), related items |
| Seller shop | `/shop/:id` | Shop profile, sections, follow |
| Cart | `/cart` | Grouped by shop, change quantity, remove, save for later, free-delivery progress |
| Checkout | `/checkout` | Address form with validation, COD / JazzCash / Easypaisa, promo codes |
| Order success | `/order-success/:id` | Order summary and tracker |
| My orders | `/orders` | Filter by status, tracking timeline, cancel pending orders, buy again |
| Favourites | `/wishlist` | Saved items |
| Sign in / Sign up | `/login`, `/signup` | Buyer or seller accounts, validation |
| Account | `/account` | Edit profile, change password, reset demo data |
| Sell on Kaarigar | `/sell` | Seller landing page with an earnings calculator |
| Help | `/help` | FAQ and contact form |
| Seller dashboard | `/seller` | Sales chart, products (add / edit / delete / stock), orders (change status), shop settings |
| Add / edit product | `/seller/products/new` | Photo upload, preview, validation |
| Admin panel | `/admin` | Approve / reject / suspend sellers, manage products, orders, users and categories |

## Try this flow in class

1. Sign up as a new **seller**. Your shop shows "under review".
2. Sign in as **admin** → Sellers → **Approve** the new shop.
3. Sign in as the seller → **Add product**. It now appears in the marketplace.
4. Sign in as **buyer** → add it to the cart → checkout → **My orders**.
5. Sign in as the seller → Orders → change the status to **Shipped**. The buyer sees the update.

## Folder structure

```
src/
  data/seed.js            sample categories, shops, products, users, orders
  context/StoreContext.jsx  all app state + actions (cart, auth, orders...)
  components/             Header, Footer, ProductCard, Icon, shared UI
  pages/                  one file per page
  pages/seller/           seller dashboard + product form
  pages/admin/            admin panel
  utils.js                price format, delivery fee, validation
  index.css               all styles (responsive)
```

## Connecting the backend later

Every action (login, addProduct, placeOrder, ...) lives in `src/context/StoreContext.jsx`. Replace the localStorage logic in each function with an API call (`fetch('/api/...')`), and the pages will keep working without changes.
