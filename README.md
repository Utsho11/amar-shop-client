<div align="center">

# 🛍️ Amar Shop — Next-Gen Multi-Vendor E-Commerce Platform

**A scalable, full-stack multi-vendor marketplace connecting discerning shoppers with verified merchant boutiques.**  
Featuring side-by-side product comparison, proximity-based recommendations, zero-trust server payment validation, and real-time 4-stage order fulfillment telemetry.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 18](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-593D88?style=for-the-badge&logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[🌐 Live Client](https://amar-shop-client.vercel.app) • [🔌 Live API](https://amar-shop-server-gules.vercel.app) • [📑 API Docs](#-api-endpoints--documentation)

</div>

---

## 📋 Table of Contents
- [✨ Core Features](#-core-features)
- [🛠️ Tech Stack & Architecture](#-tech-stack--architecture)
- [📸 Application Screenshots](#-application-screenshots)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Quickstart & Installation](#-quickstart--installation)
- [🔐 Environment Variables](#-environment-variables)
- [📁 Project Folder Structure](#-project-folder-structure)
- [📡 API Endpoints & Documentation](#-api-endpoints--documentation)
- [📜 Available Scripts](#-available-scripts)
- [🤝 Contributing Guidelines](#-contributing-guidelines)
- [📄 License](#-license)
- [👤 Author & Contact](#-author--contact)

---

## ✨ Core Features

### 🛒 Shopper Experience
* **⚖️ Side-by-Side Product Comparison:** Queue up to 3 products in a floating drawer and compare specifications, pricing, inventory, shop ratings, and discount rates across an 8-attribute dynamic matrix.
* **🧠 Smart Proximity Recommendations:** Content-based recommendation algorithm scoring and suggesting similar items based on category correlation and price proximity.
* **🚚 4-Stage Order Tracking Pipeline:** Visual order lifecycle tracker (`PLACED` → `PROCESSING` → `SHIPPED` → `DELIVERED`) with timestamp telemetry and delivery confirmation.
* **🔍 Multi-Faceted Catalog Search:** Instant debounced search with URL-synced category pills, dynamic price sliders, in-stock toggles, and sort options.
* **🛍️ Insightful Cart & Checkout:** Free shipping progress bar, promo coupon code engine (`WELCOME10`, `SAVE20`), itemized tax/shipping breakdowns, and single-vendor cart clarity.
* **⭐ Interactive Customer Reviews:** 5-star rating picker with verified purchase badges, character counters, and aggregated rating distribution bars.
* **❤️ Wishlist & Browsing History:** Save favorite items with persistent wishlist state and view recently browsed products across sessions.

### 🏪 Vendor & Merchant Hub
* **🏢 Storefront Management:** Customize store banner cover, avatar logo, bio, contact details, and copy live storefront URL (`/shop/:id`).
* **📦 Catalog & Inventory Control:** Real-time stock counters, multi-image uploads via Cloudinary, inline discount tagging, and product duplication.
* **🚚 Direct Order Fulfillment:** Filter incoming orders, review buyer shipping details, and transition order fulfillment milestones with role-restricted permissions.
* **📊 Merchant Telemetry Dashboard:** Net store earnings, catalog health, active follower counts, and monthly revenue performance charts via Recharts.

### 🛡️ Admin & Platform Governance
* **📈 Executive Platform Analytics:** Gross platform revenue ($), total user accounts, verified store counts, 12-month revenue trend area chart, and category density.
* **👥 Account & Shop Moderation:** Block/unblock users, promote roles (`CUSTOMER`, `VENDOR`, `ADMIN`), and verify or suspend merchant boutiques.
* **🎟️ Platform Coupon Manager:** Create global promotional discount coupons with percentage caps and validity date ranges.
* **💳 Financial Transaction Ledger:** Searchable transaction history with SSLCommerz transaction IDs, payment statuses, and date filters.

---

## 🛠️ Tech Stack & Architecture

### Frontend (Client)
| Layer | Technology |
|---|---|
| **Framework & UI** | React 18, Vite, TypeScript |
| **Styling & System** | Tailwind CSS, DaisyUI (Custom Terracotta & Warm Gold Theme Tokens) |
| **State & Caching** | Redux Toolkit, RTK Query |
| **Routing & Resilience**| React Router v6, Lazy Chunk Auto-Recovery (`lazyWithRetry`), Error Boundaries |
| **Data Visualization** | Recharts (Responsive Area & Bar Charts) |
| **Icons & Alerts** | Lucide React, React Icons, Sonner Toaster |

### Backend (Server)
| Layer | Technology |
|---|---|
| **Runtime & Framework** | Node.js, Express.js, TypeScript |
| **Database & ORM** | PostgreSQL (Neon DB), Prisma ORM |
| **Authentication & RBAC**| JWT (Access & Refresh Tokens with HTTP-Only Cookies), bcrypt |
| **Payment Gateway** | SSLCommerz (Decoupled Transaction Pipeline with Server Price Recalculation) |
| **Media Storage** | Cloudinary & Multer (Multi-File Image Uploads) |
| **Validation & Security**| Zod Schema Validation, CORS, Cookie-Parser, Rate Limiting |

---

## 📸 Application Screenshots

<div align="center">

| Homepage & Hero Banner | Product Comparison Matrix |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=600&q=80" width="400" alt="Homepage"/> | <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80" width="400" alt="Comparison"/> |

| 4-Stage Order Fulfillment | Analytics Dashboards |
|:---:|:---:|
| <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" width="400" alt="Order Tracking"/> | <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80" width="400" alt="Dashboard Charts"/> |

</div>

---

## ⚙️ Prerequisites

Before running the project locally, ensure you have:
* **Node.js**: `v18.0.0` or higher ([Download Node.js](https://nodejs.org/))
* **Package Manager**: `npm` (v9+) or `yarn` / `pnpm`
* **Database**: PostgreSQL instance (local or hosted on [Neon](https://neon.tech) / [Supabase](https://supabase.com))
* **Cloudinary Account**: For cloud image storage ([Cloudinary](https://cloudinary.com))
* **SSLCommerz Sandbox**: (Optional) For sandbox payment gateway testing

---

## 🚀 Quickstart & Installation

### 1. Clone the Repositories
```bash
# Clone the client repository
git clone https://github.com/Utsho11/amar-shop-client.git

# Clone the server repository
git clone https://github.com/Utsho11/amar-shop-server.git
```

### 2. Setup & Run the Server
```bash
cd amar-shop-server

# Install dependencies
npm install

# Setup Prisma and migrate database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```
> Server will be running at `http://localhost:5000`

### 3. Setup & Run the Client
```bash
cd ../amar-shop-client

# Install dependencies
npm install

# Start development server
npm run dev
```
> Client will be running at `http://localhost:5173`

---

## 🔐 Environment Variables

### Server (`amar-shop-server/.env`)
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://username:password@localhost:5432/amar_shop_db?schema=public"

# JWT Secrets
ACCESS_SECRET="your_access_token_secret_key"
REFRESH_SECRET="your_refresh_token_secret_key"
ACCESS_SECRET_EXPIRE=1d
REFRESH_SECRET_EXPIRE=7d

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_cloudinary_api_key"
CLOUDINARY_API_SECRET="your_cloudinary_api_secret"

# SSLCommerz Payment Gateway
STORE_ID="your_sslcommerz_store_id"
STORE_PASS="your_sslcommerz_store_password"
IS_LIVE=false
SUCCESS_URL="http://localhost:5000/api/payment/success"
FAIL_URL="http://localhost:5000/api/payment/fail"
CANCEL_URL="http://localhost:5000/api/payment/cancel"
```

### Client (`amar-shop-client/.env`)
```env
VITE_API_URL="http://localhost:5000/api"
```

---

## 📁 Project Folder Structure

### Client Structure (`amar-shop-client`)
```
amar-shop-client/
├── public/                  # Static assets & SVG favicon
├── src/
│   ├── assets/              # Illustrations & brand graphics
│   ├── components/
│   │   ├── admin/           # Admin data tables & charts
│   │   ├── customer/        # OrderTimeline & tracking components
│   │   ├── home/            # LiveMarketMetrics, MarketplaceFeatures, Reviews
│   │   ├── modals/          # CreateCategory, EditProduct, ShopModals
│   │   ├── product/         # ProductCard, RecommendationSection
│   │   ├── shared/          # Navbar, Footer, EmptyState, Skeletons, ErrorPage
│   │   └── vendor/          # VendorRevenueChart, OverviewCards
│   ├── context/             # ThemeContext (Light & Dark theme state)
│   ├── hooks/               # Custom hooks (useRecentlyViewed, useAppSelector)
│   ├── layouts/Dashboard/   # Admin, Vendor, and Customer Dashboard Layouts
│   ├── pages/               # Homepage, ProductPage, ShopPage, AboutPage, CartPage...
│   ├── redux/
│   │   ├── features/        # authSlice, cartSlice, comparisonSlice
│   │   └── services/        # authApi, productApi, orderApi, userApi, vendorApi
│   ├── routes/              # router.tsx, ProtectedRoute, role routes
│   └── types/               # TypeScript interfaces and shared models
├── tailwind.config.js       # Brand color palette & DaisyUI themes
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite build configuration
```

### Server Structure (`amar-shop-server`)
```
amar-shop-server/
├── prisma/
│   └── schema.prisma        # Prisma data models & relations
├── src/
│   ├── app/
│   │   ├── middlewares/     # auth, validateRequest, globalErrorHandler
│   │   ├── modules/
│   │   │   ├── Admin/       # Admin controllers, services, routes
│   │   │   ├── Auth/        # Login, registration, token refresh, password reset
│   │   │   ├── Customer/    # Order checkout, reviews, dashboard stats
│   │   │   ├── Payment/     # SSLCommerz validation & webhook callbacks
│   │   │   ├── User/        # User profile, role management
│   │   │   └── Vendor/      # Product CRUD, shop profiles, vendor telemetry
│   │   └── routes/          # Unified Express route index
│   ├── config/              # Cloudinary, Multer, and environment config
│   ├── shared/              # Prisma client instance, catchAsync, sendResponse
│   ├── utils/               # SSLCommerz payment utility, database seeding
│   ├── app.ts               # Express application initialization & middleware
│   └── server.ts            # HTTP server entry point
└── vercel.json              # Vercel deployment configuration
```

---

## 📡 API Endpoints & Documentation

### 🔑 Authentication (`/api/auth`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register customer or vendor | Public |
| `POST` | `/api/auth/login` | Sign in & receive JWT cookie | Public |
| `POST` | `/api/auth/refresh-token` | Renew access token via refresh token | Public |
| `POST` | `/api/auth/change-password` | Update current user password | Authenticated |
| `POST` | `/api/auth/forgot-password` | Request password reset token | Public |
| `POST` | `/api/auth/reset-password` | Reset password using email token | Public |

### 🛍️ Products & Catalog (`/api/product`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/product` | Get all products with search, pagination & filters | Public |
| `GET` | `/api/product/:id` | Get single product specifications | Public |
| `GET` | `/api/product/recommendations/:id` | Proximity & category recommendations | Public |
| `POST` | `/api/product/create-product` | Add new product with image uploads | Vendor |
| `PATCH`| `/api/product/:id` | Update product details or stock | Vendor / Admin |
| `DELETE`|`/api/product/:id` | Delete product from catalog | Vendor / Admin |

### 💳 Orders & Checkout (`/api/customer`)
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/customer/checkout` | Create order & initiate SSLCommerz payment | Customer |
| `GET` | `/api/customer/myOrderHistory` | Get buyer's orders with fulfillment status | Customer |
| `POST` | `/api/customer/add-review` | Submit product review & rating | Customer |
| `GET` | `/api/customer/dashboard-stats` | Customer spend analytics & live delivery stats | Customer |

### 📊 Vendor & Admin Telemetry
| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/vendor/dashboard-stats` | Vendor revenue, stock health, monthly sales | Vendor |
| `PATCH`| `/api/vendor/update-order-status/:id` | Transition order status (`SHIPPED`, `DELIVERED`)| Vendor |
| `GET` | `/api/admin/dashboard-stats` | Gross platform revenue, users, store count | Admin |
| `GET` | `/api/admin/viewTransaction` | Platform-wide financial transaction ledger | Admin |

---

## 📜 Available Scripts

### Client (`amar-shop-client`)
* `npm run dev` — Starts the Vite development server on port `5173`.
* `npm run build` — Runs TypeScript check (`tsc -b`) and produces production bundles.
* `npm run preview` — Locally previews the minified production build.
* `npm run lint` — Runs ESLint across all TypeScript and React files.

### Server (`amar-shop-server`)
* `npm run dev` — Starts the development server with live reload via `ts-node-dev`.
* `npm run build` — Compiles TypeScript files into the `dist/` directory.
* `npm start` — Executes the compiled `dist/server.js` in production.
* `npm run seed` — Seeds default admin, categories, and sample vendor products.

---

## 🤝 Contributing Guidelines

Contributions, issues, and feature requests are welcome!

1. **Fork the Repository**
2. **Create a Feature Branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your Changes** (`git commit -m "feat: add AmazingFeature"`)
4. **Push to the Branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👤 Author & Contact

**Utsho**  
* **GitHub:** [@Utsho11](https://github.com/Utsho11)  
* **Email:** utsho.dev@gmail.com  
* **Project Link:** [https://github.com/Utsho11/amar-shop-client](https://github.com/Utsho11/amar-shop-client)

<div align="center">
⭐ If you found this project helpful or insightful, please give it a star on GitHub!
</div>
