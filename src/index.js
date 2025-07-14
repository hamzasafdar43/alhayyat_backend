// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const route = require("./routes/userRoutes.js");
// const connectDB = require("./config/db");
// const router = require("./routes/carWash/carwashRoutes.js");
// const oilShopRoute = require("./routes/oilShop/oliShopRoute.js");
// const accessoriesRoute = require("./routes/accessories/accessoriesRoute.js");
// const generateBillRoute = require("./routes/generateBillRoute/generateBillRoute.js")
// const serverless = require("serverless-http");





// dotenv.config(); // Load environment variables
// connectDB(); // Connect to database
// console.log("✅ Server starting...");
// console.log("✅ MONGO_URI:", process.env.MONGO_URI || "❌ Not Found");

// const app = express();

// // Middleware
// app.use(express.json()); // Parse JSON requests
// app.use(cors());

// app.get("/" , (req , res) =>{
//     res.send("hello world")
// })


// app.use("/" , route)
// app.use("/" , router)
// app.use("/" , oilShopRoute)
// app.use("/" , accessoriesRoute)
// app.use("/" , generateBillRoute)


// app.use('/uploads', express.static('uploads'));



// module.exports = serverless(app);

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes/userRoutes.js");
const connectDB = require("./config/db");
const router = require("./routes/carWash/carwashRoutes.js");
const oilShopRoute = require("./routes/oilShop/oliShopRoute.js");
const accessoriesRoute = require("./routes/accessories/accessoriesRoute.js");
const generateBillRoute = require("./routes/generateBillRoute/generateBillRoute.js");
const serverless = require("serverless-http");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Connect DB middleware on every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/", route);
app.use("/", router);
app.use("/", oilShopRoute);
app.use("/", accessoriesRoute);
app.use("/", generateBillRoute);

app.use('/uploads', express.static('uploads'));

module.exports = serverless(app);
