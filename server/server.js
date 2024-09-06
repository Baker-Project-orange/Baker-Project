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
const orderRoutes = require("./routes/orderRoutes");


const paymentRoutes = require("./routes/paypalconfig")
const orderRoutes = require('./routes/orderRoutes');

// Server variables
const port = process.env.PORT || 3000;
const app = express();
const corsConfig = {
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

app.use('/api', paymentRoutes);

// Use the chef routes
app.use('/api/chefs', chefRoutes);
app.use('/api/orders', orderRoutes);


// Server connection
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});


