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
const paymentRoutes = require("./routes/paypalconfig")
const orderRoutes = require('./routes/orderRoutes');

const Order = require("./Models/Orders");


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
app.use('/api', paymentRoutes);
//Order Routes
app.use('/api/orders', orderRoutes);

const seedOrders = async () => {
  const chefIds = [
    new mongoose.Types.ObjectId("66d775724924397e1179e5eb"), // Chef 1
    new mongoose.Types.ObjectId("66d910e45fd65e00b2c2af65"), // Chef 2
    new mongoose.Types.ObjectId("66d775724924397e1179e5ed"), // Chef 3
  ];
  
  const orders = [
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e1"),
      orderMakerName: "John Doe",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e2"),
          dishName: "Margherita Pizza",
          quantity: 2,
          price: 12.99,
          chefAmount: 7.00,
          adminAmount: 5.99
        },
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e3"),
          dishName: "Caesar Salad",
          quantity: 1,
          price: 8.99,
          chefAmount: 5.00,
          adminAmount: 3.99
        }
      ],
      chefId: chefIds[0],
      totalPrice: 34.97,
      totalChefAmount: 12.00,
      totalAdminAmount: 14.98,
      orderDetails: "Please deliver extra cheese on the pizza.",
      status: "Pending",
      createdAt: new Date("2024-09-08T12:34:56.789Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e5"),
      orderMakerName: "Jane Smith",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e6"),
          dishName: "Spaghetti Carbonara",
          quantity: 1,
          price: 14.99,
          chefAmount: 8.00,
          adminAmount: 6.99
        }
      ],
      chefId: chefIds[1],
      totalPrice: 14.99,
      totalChefAmount: 8.00,
      totalAdminAmount: 6.99,
      orderDetails: "Make it extra creamy.",
      status: "Completed",
      createdAt: new Date("2024-09-08T13:45:23.456Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e8"),
      orderMakerName: "Alice Johnson",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3e9"),
          dishName: "BBQ Chicken Wings",
          quantity: 3,
          price: 10.99,
          chefAmount: 6.00,
          adminAmount: 4.99
        }
      ],
      chefId: chefIds[2],
      totalPrice: 32.97,
      totalChefAmount: 18.00,
      totalAdminAmount: 14.97,
      orderDetails: "Spicy, please!",
      status: "Pending",
      createdAt: new Date("2024-09-08T14:56:34.567Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3eb"),
      orderMakerName: "Bob Lee",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3ec"),
          dishName: "Greek Salad",
          quantity: 2,
          price: 7.99,
          chefAmount: 4.00,
          adminAmount: 3.99
        }
      ],
      chefId: chefIds[0],
      totalPrice: 15.98,
      totalChefAmount: 8.00,
      totalAdminAmount: 7.98,
      orderDetails: "No olives, please.",
      status: "Completed",
      createdAt: new Date("2024-09-08T15:34:56.789Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3ee"),
      orderMakerName: "Eve Carter",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3ef"),
          dishName: "Chicken Alfredo",
          quantity: 2,
          price: 13.49,
          chefAmount: 7.00,
          adminAmount: 6.49
        },
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f0"),
          dishName: "Garlic Bread",
          quantity: 1,
          price: 4.99,
          chefAmount: 2.00,
          adminAmount: 2.99
        }
      ],
      chefId: chefIds[1],
      totalPrice: 31.97,
      totalChefAmount: 9.00,
      totalAdminAmount: 9.48,
      orderDetails: "Add extra garlic.",
      status: "Completed",
      createdAt: new Date("2024-09-08T16:23:45.678Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f2"),
      orderMakerName: "Michael Brown",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f3"),
          dishName: "Margherita Pizza",
          quantity: 1,
          price: 12.99,
          chefAmount: 7.00,
          adminAmount: 5.99
        }
      ],
      chefId: chefIds[2],
      totalPrice: 12.99,
      totalChefAmount: 7.00,
      totalAdminAmount: 5.99,
      orderDetails: "Thin crust.",
      status: "Pending",
      createdAt: new Date("2024-09-08T17:45:23.456Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f4"),
      orderMakerName: "Sarah Davis",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f4"),
          dishName: "Vegetable Soup",
          quantity: 3,
          price: 6.99,
          chefAmount: 3.50,
          adminAmount: 3.49
        }
      ],
      chefId: chefIds[1],
      totalPrice: 20.97,
      totalChefAmount: 10.50,
      totalAdminAmount: 10.47,
      orderDetails: "No salt.",
      status: "Completed",
      createdAt: new Date("2024-09-08T18:34:56.789Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f5"),
      orderMakerName: "Emily Johnson",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f5"),
          dishName: "Chicken Caesar Wrap",
          quantity: 2,
          price: 9.99,
          chefAmount: 5.00,
          adminAmount: 4.99
        }
      ],
      chefId: chefIds[2],
      totalPrice: 19.98,
      totalChefAmount: 10.00,
      totalAdminAmount: 9.98,
      orderDetails: "Extra chicken.",
      status: "Pending",
      createdAt: new Date("2024-09-08T19:12:34.567Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f6"),
      orderMakerName: "David Wilson",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f6"),
          dishName: "Beef Stroganoff",
          quantity: 1,
          price: 15.49,
          chefAmount: 8.00,
          adminAmount: 7.49
        }
      ],
      chefId: chefIds[0],
      totalPrice: 15.49,
      totalChefAmount: 8.00,
      totalAdminAmount: 7.49,
      orderDetails: "Medium rare beef.",
      status: "Completed",
      createdAt: new Date("2024-09-08T20:23:45.678Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f7"),
      orderMakerName: "Laura Martinez",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f7"),
          dishName: "Grilled Salmon",
          quantity: 1,
          price: 18.99,
          chefAmount: 9.00,
          adminAmount: 9.99
        }
      ],
      chefId: chefIds[1],
      totalPrice: 18.99,
      totalChefAmount: 9.00,
      totalAdminAmount: 9.99,
      orderDetails: "Well done.",
      status: "Pending",
      createdAt: new Date("2024-09-08T21:34:56.789Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f8"),
      orderMakerName: "Christopher Lee",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f8"),
          dishName: "Pork Schnitzel",
          quantity: 2,
          price: 11.49,
          chefAmount: 6.00,
          adminAmount: 5.49
        }
      ],
      chefId: chefIds[2],
      totalPrice: 22.98,
      totalChefAmount: 12.00,
      totalAdminAmount: 10.98,
      orderDetails: "Extra crispy.",
      status: "Completed",
      createdAt: new Date("2024-09-08T22:12:34.567Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f9"),
      orderMakerName: "Nancy Thompson",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3f9"),
          dishName: "Vegetarian Lasagna",
          quantity: 2,
          price: 13.49,
          chefAmount: 7.00,
          adminAmount: 6.49
        }
      ],
      chefId: chefIds[1],
      totalPrice: 26.98,
      totalChefAmount: 14.00,
      totalAdminAmount: 12.98,
      orderDetails: "Add extra cheese.",
      status: "Pending",
      createdAt: new Date("2024-09-08T23:34:56.789Z")
    },
    {
      orderMaker: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3fa"),
      orderMakerName: "Rachel Green",
      orderItems: [
        {
          dish: new mongoose.Types.ObjectId("60d5f8f1f8a2b3c4b8a3d3fa"),
          dishName: "Shrimp Tacos",
          quantity: 3,
          price: 9.99,
          chefAmount: 5.00,
          adminAmount: 4.99
        }
      ],
      chefId: chefIds[0],
      totalPrice: 29.97,
      totalChefAmount: 15.00,
      totalAdminAmount: 14.97,
      orderDetails: "Extra spicy.",
      status: "Completed",
      createdAt: new Date("2024-09-09T00:12:34.567Z")
    }
  ];

  try {
    await Order.insertMany(orders);
    console.log('Orders inserted successfully');
  } catch (err) {
    console.error('Error inserting orders:', err);
  }
};


// seedOrders();

// Server connection
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});








