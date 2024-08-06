const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderLust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    const listingsWithOwner = initData.data.map((obj) => ({
      ...obj,
      owner: "669e60ebe9803a82f142b0af",
    }));
    await Listing.insertMany(listingsWithOwner);
    console.log("data was initialized");
  } catch (err) {
    console.error("Error initializing data:", err);
  }
};

initDB();
