/**
 * localSeed.js — Fast local seed (no Cloudinary needed)
 * Uses imageUrl directly from listings data as the image.url
 * Run: node init/localSeed.js
 */

require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
const User = require("../models/user");

const listingsData = require("./advanceData/listings");
const reviewsData = require("./advanceData/reviews");
const usersData = require("./advanceData/users");

const MONGO_URL = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(arr) {
    return arr
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

async function seed() {
    await mongoose.connect(MONGO_URL);
    console.log("🔌 Connected to DB:", MONGO_URL);

    // --- Clear existing data ---
    await Listing.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});
    console.log("🧹 Cleared old data");

    // --- Seed Users ---
    const createdUsers = [];
    for (let userData of usersData) {
        const newUser = new User({ username: userData.username, email: userData.email });
        const registered = await User.register(newUser, "test1234");
        createdUsers.push(registered);
    }
    console.log(`✅ ${createdUsers.length} users created (password: test1234)`);

    // --- Seed Listings + Reviews ---
    let listingCount = 0;
    for (let data of listingsData) {
        const owner = getRandom(createdUsers);

        const listing = new Listing({
            title: data.title,
            description: data.description,
            price: data.price,
            category: data.category,
            location: data.location,
            country: data.country,
            geometry: data.geometry,
            owner: owner._id,
            image: {
                url: data.imageUrl,
                filename: "seed-image",
            },
        });

        // Add reviews
        const eligibleUsers = createdUsers.filter(u => u._id.toString() !== owner._id.toString());
        const shuffled = shuffleArray(eligibleUsers);
        const reviewers = shuffled.slice(0, Math.min(getRandomInt(3, 6), shuffled.length));
        const listingReviews = [];

        for (let reviewer of reviewers) {
            const reviewData = getRandom(reviewsData);
            const review = new Review({
                comment: reviewData.comment,
                rating: reviewData.rating,
                author: reviewer._id,
            });
            await review.save();
            listingReviews.push(review._id);
        }

        listing.reviews = listingReviews;
        await listing.save();
        listingCount++;
    }

    console.log(`🎉 ${listingCount} listings created with reviews`);
    console.log("\n🔑 Test login credentials:");
    createdUsers.slice(0, 3).forEach(u => {
        console.log(`   username: ${u.username}  |  password: test1234`);
    });

    await mongoose.connection.close();
    console.log("🔒 DB connection closed");
}

seed().catch(err => {
    console.error("❌ Seed failed:", err);
    mongoose.connection.close();
    process.exit(1);
});
