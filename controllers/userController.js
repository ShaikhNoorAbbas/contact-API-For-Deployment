import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// importing dotenv so that we can use environment variables
import dotenv from "dotenv";
//configuring
dotenv.config({ path: ".env" });

export let register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // console.log("Data from FrontEnd", req.body);

    // 1. Sanitize & Validate (Trim spaces)
    // We check if values exist AND if they are empty strings after trimming
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      // Return 400 (Bad Request) for validation errors
      return res.status(400).json({
        message: "All Fields are Required",
        success: false,
      });
    }

    // 2. Check for Existing User
    let foundUser = await User.findOne({ email });
    if (foundUser) {
      // Return 409 (Conflict) or 400 when resource already exists
      return res.status(409).json({
        message: `${email} Already Exists in Database`,
        success: false,
      });
    }

    // 3. Hash Password
    let hashPassword = await bcrypt.hash(password, 10);

    // 4. Create User
    const newUser = await User.create({
      name,
      email: email?.toLowerCase(),
      password: hashPassword,
    });
    console.log("newUser", newUser);
    // 5. Respond (Exclude sensitive data like password)
    // We explicitly define what we send back. Do not send the full 'newUser' object with the hash.
    return res.status(201).json({
      message: "User Registered Successfully",
      success: true,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log(error);
    // 6. Global Error Handling
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export async function login(req, res) {
  const { email, password } = req.body;
  if (email == "" || password == "") {
    return res.json({
      message: "All Fields are Required",
      success: false,
    });
  } else {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        message: `${email} Does Not Exists in Database`,
        success: false,
      });
    } else {
      const validPassword = await bcrypt.compare(password, userFound.password);
      if (!validPassword) {
        return res.json({
          message: "Invalid Password",
          success: false,
        });
      } else {
        // creating JWT Token
        const tokenCreate = jwt.sign(
          { userId: userFound._id },
          process.env.SECRET,
          {
            expiresIn: "1d",
          }
        );
        // Giving Back Response
        return res.json({
          message: `Welcome ${userFound.name}`,
          token: tokenCreate,
          success: true,
        });
      }
    }
  }
}

// Function to Get All users
export async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    // console.log(allUsers);
    res.json({
      message: "All Users",
      users: allUsers,
    });
  } catch (error) {
    console.log(error);
  }
}
