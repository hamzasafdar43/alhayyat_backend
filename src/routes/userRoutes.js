
const express = require("express");
const { registered , login , updateUser ,deleteUser , getSingleUser , getAllUsers } = require("../controller/userController");
const UserAuthenication = require("../middleware/UserAuthenication");


const route = express.Router(); // ✅ Correct way to initialize a router

route.post("/register", registered);
route.post("/login", login );
route.get("/getallUser", UserAuthenication ,  getAllUsers );
route.get("/getSingleUser/:id",UserAuthenication ,  getSingleUser);
route.put("/updateUser/:id", UserAuthenication , updateUser);
route.delete("/deleteUser/:id", UserAuthenication ,   deleteUser);


module.exports = route;
