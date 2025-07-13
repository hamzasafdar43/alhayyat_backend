const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const route = require("./routes/userRoutes.js");
const connectDB = require("./config/db");
const router = require("./routes/carWash/carwashRoutes.js");
const oilShopRoute = require("./routes/oilShop/oliShopRoute.js");
const accessoriesRoute = require("./routes/accessories/accessoriesRoute.js");
const generateBillRoute = require("./routes/generateBillRoute/generateBillRoute.js")
const detailingStudioBillRoute = require("./routes/detailingStudio/detailingStudioRoute.js")





dotenv.config(); // Load environment variables
connectDB(); // Connect to database

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors());

app.get("/" , (req , res) =>{
    res.send("hello world")
})


app.use("/" , route)
app.use("/" , router)
app.use("/" , oilShopRoute)
app.use("/" , accessoriesRoute)
app.use("/" , generateBillRoute)
app.use("/" , detailingStudioBillRoute)



app.use('/uploads', express.static('uploads'));



const PORT = process.env.PORT 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
