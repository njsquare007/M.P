# WanderLust

WanderLust is a full-stack hotel and accommodation booking web application inspired by Airbnb. It allows travelers to explore stays, search by location, view interactive maps, and leave reviews, while enabling property owners to list and manage their accommodations.

Developed by **Narayan Jee Jha**.

---

## Live Demo

- **Website:** [https://m-p-0zft.onrender.com](https://m-p-0zft.onrender.com)
- **Test Account:** Sign up with any email, or use a seeded account after running `localSeed.js` (password: `test1234`).

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap 5, EJS (Embedded JavaScript Templates) |
| **Backend** | Node.js, Express.js v4 |
| **Authentication** | Passport.js (Local Strategy, Session-based) |
| **Validation** | Joi (Server-side schema validation) |
| **Database** | MongoDB (local) / MongoDB Atlas (production), Mongoose ODM |
| **Media Storage** | Cloudinary |
| **Maps & Geolocation** | Leaflet.js, OpenStreetMap (Nominatim API) — free, no paid API key needed |
| **Deployment** | Render |

---

## Key Features

- **MVC Architecture:** Clean separation of concerns across models, views, and controllers.
- **Authentication & Authorization:** Secure user registration and login with session management. Route guards ensure only owners can edit or delete their own listings and reviews.
- **Open-Source Maps:** Leaflet.js + OpenStreetMap Nominatim for geocoding and location pins — no paid API required.
- **Image Uploads:** Direct image uploads to Cloudinary; secure URLs saved to MongoDB.
- **Dynamic Search & Filtering:** Filter by 12 categories (Trending, Beach, Arctic, etc.) and search by city or country.
- **Review & Rating System:** Star ratings and comments, linked to user accounts.
- **Database Seeding:** Two seed pipelines — `localSeed.js` (fast, no Cloudinary needed) and `init.js` (full Cloudinary upload).

---

## Project Structure

```text
WanderLust/
├── controllers/          # Request handlers and core logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/                 # Database seeding scripts and sample data
│   ├── advanceData/      # listings.js, reviews.js, users.js sample data
│   ├── localSeed.js      # Fast local seed (no Cloudinary needed)
│   ├── seedListingsAndReviews.js  # Full seed with Cloudinary image upload
│   ├── seedUsers.js
│   └── init.js           # Full seed entry point (uses Atlas + Cloudinary)
├── models/               # Mongoose schemas
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── public/               # Static assets
│   ├── css/              # style.css, index.css, show.css, home.css
│   └── js/               # script.js, index.js, show.js, home.js
├── routes/               # Express route definitions
│   ├── index.js          # Home, Privacy, Terms
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── utils/                # Utility helpers
│   ├── ExpressError.js   # Custom error class
│   ├── category.js       # Category → Font Awesome icon map
│   └── geoData.js        # Nominatim geocoding helper
├── views/                # EJS templates
│   ├── includes/         # navbar, flash, footer, icons
│   ├── layouts/          # boilerplate.ejs (ejs-mate layout)
│   ├── listings/         # index, show, new, edit
│   ├── pages/            # home, privacy, termsAndConditions
│   └── users/            # login, signup
├── app.js                # Application entry point
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Auth, ownership & validation middleware
├── schema.js             # Joi validation schemas
├── package.json
├── .env.example          # Environment variable template
└── .gitignore
```

---

## Getting Started (Local)

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally (`mongod`)
- A [Cloudinary](https://cloudinary.com/) account (only needed for image uploads)

### 1. Clone the repo

```bash
git clone https://github.com/njsquare007/M.P.git
cd M.P
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

### 4. Seed the database

```bash
# Fast local seed (no Cloudinary needed — uses Unsplash URLs)
node init/localSeed.js
```

This creates 49 users and 48 listings. All seeded users have password: `test1234`.

### 5. Run the app

```bash
npm run dev     # development with nodemon (auto-restart)
# or
npm start       # production-like
```

Visit `http://localhost:8080`

---

## Deploying on Render

1. Push your code to GitHub (`.env` is gitignored — safe).
2. Create a new **Web Service** on [render.com](https://render.com) and connect your repo.
3. Set the following **Environment Variables** in the Render dashboard:

| Variable | Value |
|---|---|
| `ATLASDB_URL` | Your MongoDB Atlas connection string |
| `SECRET` | A long random secret string |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `NODE_ENV` | `production` |

4. **Build command:** `npm install`
5. **Start command:** `npm start`

> **MongoDB Atlas tip:** In Atlas → Network Access, allow `0.0.0.0/0` so Render's dynamic IPs can connect.

---

## License

[ISC](LICENSE)