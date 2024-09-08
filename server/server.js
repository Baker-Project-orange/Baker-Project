// Imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const dishRoutes = require("./routes/dishRoutes");
const mongoose = require("./config/dbConfig");
const chefRoutes = require("./routes/chefRoutes");
const contactRoutes = require("./routes/contactRoutes");
const reportRoutes = require("./routes/reportRoutes");
const recipiesRoutes = require("./routes/recipieRoutes");
const adminRoutes = require("./routes/adminRoutes"); 
const paymentRoutes = require("./routes/paypalconfig");
const checkout = require("./routes/cartrouter");
const orderRoutes = require('./routes/orderRoutes');

const Order = require("./Models/Orders");
const Dish = require("./Models/Dish");


// Server variables
const port = process.env.PORT || 3000;
const app = express();
const corsConfig = {
  origin: "http://localhost:5173",
  credentials: true,
};

// Server middlewares
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(cookieParser());

//API Routes
//Users Routes
app.use("/api/users", userRoutes);
app.use("/api/chefs", chefRoutes);
//Other Routes
app.use("/api/dishes", dishRoutes);
app.use("/api/messages", contactRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/recipes", recipiesRoutes);
//admin routes
app.use("/api/admins",adminRoutes);
//payment routes
app.use("/api", paymentRoutes);
app.use("/api", checkout);
//Order Routes
app.use('/api/orders', orderRoutes);

const dishes = [
  {
    recipieID: "66dc403e7d5cdc82afbd0878",
    dishDescription: "A flavorful and spicy chicken curry with a blend of aromatic spices.",
    price: 15.99,
    authorID: "66d775724924397e1179e5eb",
    dishRating: [{ ratingNumber: 5 }],
    dishRatingAvg: 5.0,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc4b79bd741bc796ef3da5",
    dishDescription: "Classic Italian pasta with a rich tomato and basil sauce.",
    price: 12.99,
    authorID: "66d910e45fd65e00b2c2af65",
    dishRating: [{ ratingNumber: 4 }, { ratingNumber: 4 }, { ratingNumber: 5 }],
    dishRatingAvg: 4.33,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc5b36d8cd2e45693fb29c",
    dishDescription: "Freshly grilled salmon fillet with a side of roasted vegetables.",
    price: 18.50,
    authorID: "66db2e7d2e11c658c6ff43a1",
    dishRating: [{ ratingNumber: 3 }],
    dishRatingAvg: 3.0,
    isApproved: false,
    isDeleted: false
  },
  {
    recipieID: "66dcde20778aec25de4bc0e5",
    dishDescription: "A hearty beef stew with tender chunks of meat and root vegetables.",
    price: 14.99,
    authorID: "66d775724924397e1179e5eb",
    dishRating: [{ ratingNumber: 4 }, { ratingNumber: 5 }],
    dishRatingAvg: 4.5,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc403e7d5cdc82afbd0878",
    dishDescription: "Vegetarian stir-fry with tofu and a mix of colorful vegetables.",
    price: 11.50,
    authorID: "66d910e45fd65e00b2c2af65",
    dishRating: [{ ratingNumber: 4 }, { ratingNumber: 4 }, { ratingNumber: 4 }],
    dishRatingAvg: 4.0,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc4b79bd741bc796ef3da5",
    dishDescription: "Decadent chocolate lava cake served with vanilla ice cream.",
    price: 7.99,
    authorID: "66db2e7d2e11c658c6ff43a1",
    dishRating: [{ ratingNumber: 5 }, { ratingNumber: 5 }],
    dishRatingAvg: 5.0,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc5b36d8cd2e45693fb29c",
    dishDescription: "Crispy chicken tenders with a honey mustard dipping sauce.",
    price: 9.99,
    authorID: "66d775724924397e1179e5eb",
    dishRating: [{ ratingNumber: 4 }],
    dishRatingAvg: 4.0,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dcde20778aec25de4bc0e5",
    dishDescription: "Spicy Thai noodles with shrimp and a tangy peanut sauce.",
    price: 13.50,
    authorID: "66d910e45fd65e00b2c2af65",
    dishRating: [{ ratingNumber: 3 }, { ratingNumber: 4 }],
    dishRatingAvg: 3.5,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc403e7d5cdc82afbd0878",
    dishDescription: "Classic Caesar salad with crisp romaine and homemade croutons.",
    price: 8.99,
    authorID: "66db2e7d2e11c658c6ff43a1",
    dishRating: [{ ratingNumber: 5 }],
    dishRatingAvg: 5.0,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc4b79bd741bc796ef3da5",
    dishDescription: "Creamy mushroom risotto with Parmesan cheese.",
    price: 16.00,
    authorID: "66d775724924397e1179e5eb",
    dishRating: [{ ratingNumber: 5 }, { ratingNumber: 4 }],
    dishRatingAvg: 4.5,
    isApproved: true,
    isDeleted: false
  },
  {
    recipieID: "66dc5b36d8cd2e45693fb29c",
    dishDescription: "Delicious beef tacos with fresh salsa and guacamole.",
    price: 10.50,
    authorID: "66d910e45fd65e00b2c2af65",
    dishRating: [{ ratingNumber: 3 }],
    dishRatingAvg: 3.0,
    isApproved: true,
    isDeleted: false
  }
];

// Function to connect to MongoDB and insert data
async function connectAndInsertData() {
  try {

    // Insert data
    await Dish.insertMany(dishes);
    console.log('Dishes inserted successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB or inserting data', err);
  } 
}

// Call the function
// connectAndInsertData();

// Server connection
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});








