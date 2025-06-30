
const express = require("express");
const { registered , login , updateUser ,deleteUser , getSingleUser , getAllUsers } = require("../controller/userController");


const route = express.Router(); // ✅ Correct way to initialize a router

route.post("/register", registered);
route.post("/login", login );
route.get("/getallUser",  getAllUsers);
route.get("/getSingleUser/:id", getSingleUser);
route.put("/updateUser/:id", updateUser);
route.delete("/deleteUser/:id",   deleteUser);


module.exports = route;
