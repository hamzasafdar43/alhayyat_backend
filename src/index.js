const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const serverless = require("serverless-http");

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const carWashRoutes = require("./routes/carWash/carwashRoutes");
const oilShopRoutes = require("./routes/oilShop/oliShopRoute");
const accessoriesRoutes = require("./routes/accessories/accessoriesRoute");
const generateBillRoutes = require("./routes/generateBillRoute/generateBillRoute");
const detailingStudioRutes = require("./routes/detailingStudio/detailingStudioRoute")
const employeesRutes = require("./routes/empolyees/empolyeeRoutes")


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.get("/", (req, res) => res.send("Hello World"));
app.use("/", userRoutes);
app.use("/", carWashRoutes);
app.use("/", oilShopRoutes);
app.use("/", accessoriesRoutes);
app.use("/", generateBillRoutes);
app.use("/", detailingStudioRutes);
app.use("/", employeesRutes);

// Start server (for local development)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// For serverless deployment (comment out above `app.listen()` if using serverless)
// module.exports = serverless(app);
