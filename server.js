import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouters.js";
import contactRouter from "./routes/contactRouter.js";
// importing cors so that we can use our API across frontEnd Applications
import cors from "cors";
// importing dotenv so that we can use environment variables
import dotenv from "dotenv";
// assigning express in app
let app = express();
// using dotenv config
dotenv.config({ path: ".env" });

// assigning cors so that we can use this API in frontEnd Applications
app.use(cors());
// making data Recievable in JSON Format
app.use(express.json());

// establishing connection with mongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: "learning",
  })
  .then(() => console.log(`Connected to MongoDB`))
  .catch((error) => console.log(`Error: ${error}`));

// All Routes for user
app.use("/api/user", userRouter);

// All Routes for Contact
app.use("/api/contact", contactRouter);

let port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Port is Running on ${port} -> port is http://localhost:${port}`)
);
