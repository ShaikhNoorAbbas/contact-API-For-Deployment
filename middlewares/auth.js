import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
export const isAuthenticated = async (req, res, next) => {
  // getting Token for Authentication
  const token = req.header("auth");
  //consoleing to check token
  console.log("Token: ", token);
  if (!token) {
    return res.json({
      message: "Login First",
      success: false,
    });
  } else {
    const decode = jwt.verify(token, "SampleKey");
    const id = decode.userId;
    // finding that user
    const foundUser = await User.findById(id);
    console.log("foundUser", foundUser);
    if (!foundUser) {
      return res.json({
        message: "user not found",
        success: false,
      });
    } else {
      // globalizing user data for authentication
      req.user = foundUser;
      // for next step
      next();
    }
  }
};
