# WanderLust

WanderLust is a full-stack hotel and accommodation booking web application inspired by Airbnb. It allows travelers to explore stays, search by location, view interactive maps, and leave reviews, while enabling property owners to list and manage their accommodations.

Developed by **Narayan Jee Jha**.

---

## Live Demo

- **Website:** 
- **Test Account:** You can sign up with any dummy email address to test authenticated features like creating listings or leaving reviews.

---

## Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5, EJS (Embedded JavaScript Templates)
- **Backend:** Node.js, Express.js
- **Authentication:** Passport.js (Local Strategy, Session-based)
- **Validation:** Joi (Server-side schema validation)
- **Database:** MongoDB Atlas, Mongoose ODM
- **Media Storage:** Cloudinary
- **Maps & Geolocation:** Leaflet.js, OpenStreetMap (Nominatim API)
- **Deployment:** Render

---

## Key Features

- **Model-View-Controller (MVC) Architecture:** Clean separation of concerns across models, views, and controllers for maintainability.
- **Authentication & Authorization:** Secure user registration and login with session management. Route guards ensure only owners can edit or delete listings and reviews.
- **Open-Source Maps:** Integrated Leaflet.js and OpenStreetMap Nominatim for geocoding and property location pins without paid API dependencies.
- **Image Management:** Direct image uploads to Cloudinary with secure remote URLs saved to MongoDB.
- **Dynamic Search & Filtering:** Filter accommodations by categories (e.g., Pools, Farms, Arctic) and search by city or country.
- **Review & Rating System:** In-app reviews and star ratings linked directly to user accounts.
- **Database Seeding Pipeline:** Automated scripts to wipe and populate the database with sample users, listings, and reviews for local testing.

---

## Project Structure

```text
WanderLust/
├── controllers/          # Request handlers and core logic
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
├── init/                 # Database initialization and seed data
│   ├── advanceData/
│   ├── init.js
│   ├── seedListingsAndReviews.js
│   └── seedUsers.js
├── models/               # Mongoose schemas (Listing, Review, User)
├── public/               # Static assets (CSS, client-side JS, images)
├── routes/               # Express route definitions
├── utils/                # Utility functions and custom error handlers
├── views/                # EJS templates and partials
├── app.js                # Application entry point
├── cloudConfig.js        # Cloudinary configuration
├── middleware.js         # Authentication and validation middleware
├── package.json
└── schema.js             # Joi validation schemas