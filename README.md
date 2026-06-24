# 🍳 RecipeHub

> A full-stack recipe sharing platform where users can discover, share, and purchase premium recipes — built with Next.js, Express.js, and MongoDB.

![RecipeHub Banner](./assets/readme/home.png)

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-brightgreen)](https://recipehub-client-mu.vercel.app/)
[![Client Repo](https://img.shields.io/badge/Client-GitHub-blue)](https://github.com/riadul061/recipehub-client)
[![Server Repo](https://img.shields.io/badge/Server-GitHub-orange)](https://github.com/riadul061/recipehub-server)

---

## 📌 Live Demo

🔗 **[https://recipehub-client-mu.vercel.app](https://recipehub-client-mu.vercel.app/)**

### Demo Credentials

| Role  | Email | Password |
|-------|-------|----------|
| User  | farhan11222@gmail.com | Farhan@11222 |
| Admin | *(contact author)* | *(contact author)* |

---

## 🧩 Problem It Solves

Home cooks and food enthusiasts have no centralized platform to share, discover, and monetize their recipes. RecipeHub solves this by providing a community-driven platform where users can publish recipes, interact with others, and access premium content through a seamless payment experience.

---

## 👥 Target Users

- Home cooks and food enthusiasts
- Recipe creators who want to monetize their content
- Food bloggers looking for a sharing platform
- Anyone who loves discovering new recipes

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, Tailwind CSS v4, Framer Motion |
| Backend | Express.js, Node.js |
| Database | MongoDB (Atlas) |
| Authentication | Better Auth (JWT, Google OAuth) |
| Payment | Stripe Checkout |
| Deployment | Vercel (Client + Server) |
| Tools | Lucide Icons, React Hot Toast, next-themes |

---

## ✨ Main Features

### 👤 User Features
- 🔐 Email/Password & Google OAuth login
- 🍽️ Browse & search recipes by category
- ❤️ Like and save recipes to favorites
- 💬 Report inappropriate recipes
- 📊 Personal dashboard with stats (recipes, likes, favorites)
- ✏️ Add, edit, and delete own recipes (free: max 2)
- 💳 Purchase individual recipes via Stripe
- 👑 Upgrade to Premium for unlimited recipe creation
- 🏷️ Premium badge on profile

### 🛡️ Admin Features
- 📋 Manage all users (block/unblock)
- 📝 Manage all recipes (feature/unfeature, delete)
- 🚨 Review and resolve recipe reports
- 💰 View all transactions
- 📊 Admin dashboard with platform stats

---

## 🖼️ Screenshots

### Home Page
![Home Page](./assets/readme/home.png)

### User Dashboard
![Dashboard](./assets/readme/dashboard.png)

### Demo
![Demo GIF](./assets/readme/demo.gif)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account
- Google OAuth credentials

### Client Setup

```bash
git clone https://github.com/riadul061/recipehub-client
cd recipehub-client
npm install
npm run dev
```

### Server Setup

```bash
git clone https://github.com/riadul061/recipehub-server
cd recipehub-server
npm install
nodemon index.js
```

---

## 🔐 Environment Variables

### Client (`.env.local`)

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret_here
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### Server (`.env`)

```env
MONGODB_URI=your_mongodb_uri
CLIENT_URL=http://localhost:3000
BETTER_AUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PORT=5000
```

---

## 📡 API Endpoints

### Recipes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/recipes` | ❌ | Get all recipes (filter, search, paginate) |
| GET | `/api/recipes/popular` | ❌ | Get popular recipes |
| GET | `/api/recipes/my-recipes` | ✅ | Get current user's recipes |
| GET | `/api/recipes/:id` | ✅ | Get single recipe |
| POST | `/api/recipes` | ✅ | Create recipe |
| PUT | `/api/recipes/:id` | ✅ | Update recipe |
| DELETE | `/api/recipes/:id` | ✅ | Delete recipe |
| POST | `/api/recipes/:id/like` | ✅ | Like/Unlike recipe |

### Favorites
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/favorites` | ✅ | Get user's favorites |
| POST | `/api/favorites` | ✅ | Add to favorites |
| DELETE | `/api/favorites/:recipeId` | ✅ | Remove from favorites |

### Payments
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/create-checkout-session` | ✅ | Create Stripe checkout |
| POST | `/api/webhooks/stripe` | ❌ | Stripe webhook handler |
| GET | `/api/user/purchases` | ✅ | Get user purchases |

### Admin
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/admin/dashboard` | 👑 | Admin stats |
| GET | `/api/admin/users` | 👑 | All users |
| PUT | `/api/admin/users/:id/toggle-block` | 👑 | Block/Unblock user |
| GET | `/api/admin/recipes` | 👑 | All recipes |
| PATCH | `/api/admin/recipes/:id/feature` | 👑 | Feature/Unfeature recipe |
| GET | `/api/admin/reports` | 👑 | All reports |
| PATCH | `/api/admin/reports/:id` | 👑 | Resolve report |
| GET | `/api/admin/transactions` | 👑 | All transactions |

---

## 🧪 Manual Test Cases

| # | Test Case | Expected Result |
|---|-----------|----------------|
| 1 | Register with email/password | Account created, redirected to home |
| 2 | Login with Google | Authenticated via Google OAuth |
| 3 | Add recipe as free user (3rd attempt) | Error: "Free limit: 2 recipes" |
| 4 | Like a recipe | Like count increases |
| 5 | Save recipe to favorites | Appears in favorites page |
| 6 | Purchase recipe with Stripe test card | Appears in purchased page |
| 7 | Upgrade to Premium | Premium badge shown, unlimited recipes |
| 8 | Admin blocks a user | User status changes to "Blocked" |
| 9 | Admin features a recipe | Recipe appears in featured section |
| 10 | Report a recipe | Report appears in admin panel |
| 11 | Admin dismisses report | Report removed from pending list |

**Stripe Test Card:**
```
Card Number: 4242 4242 4242 4242
Expiry: 12/34
CVC: 123
```

---

## ⚠️ Known Limitations

- Stripe webhook requires CLI for local development (`./stripe.exe listen`)
- After premium purchase, user must logout and login again to see badge
- Express backend deployed on Vercel (serverless — may have cold start delays)
- No real-time notifications for likes/comments
- Image upload limited to 2MB

---

## 🔮 Future Improvements

- [ ] Real-time notifications with WebSockets
- [ ] Recipe comments and ratings
- [ ] Advanced search with filters (cook time, difficulty, cuisine)
- [ ] Mobile app (React Native)
- [ ] Recipe video support
- [ ] Social sharing (Twitter, Facebook)
- [ ] Email notifications for reports and purchases
- [ ] Admin role assignment from dashboard

---

## 👨‍💻 Author

**Riadul Islam**

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blue)](https://my-portfolio-sigma-seven-79.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-riadul061-black)](https://github.com/riadul061)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
