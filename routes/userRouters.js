import express from "express";
import { register, login, getAllUsers } from "../controllers/userController.js";

const routers = express.Router();

// user Route Register
// @api dsc -> register
//@api method -> POST
//@api endpoint -> /api/user/register

routers.post("/register", register);

// user Route Login
// @api dsc -> login
//@api method -> POST
//@api endpoint -> /api/user/login

routers.post("/login", login);

// user Route Get Test
// @api dsc -> getTest
// @api method -> GET
//@api endpoint -> /api/user/getTest

routers.get("/getTest", (req, res) => {
  res.json({
    message: "This is a Sample Test for Get Request",
  });
});

routers.get("/allusers", getAllUsers);

export default routers;
