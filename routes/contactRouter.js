import express from "express";
import {
  deleteContactById,
  getAllContact,
  getContactById,
  getContactByUserId,
  newContact,
  updateContactById,
} from "../controllers/contactController.js";
// import authantication middleware to check user is authenticated or not
import { isAuthenticated } from "../Middlewares/auth.js";

// assigning router to an router variable
const router = express.Router();

// Route to Create New Contact
/// Middleware: Verifies authentication. If valid, proceeds to newContact; otherwise, halts execution.
router.post("/new", isAuthenticated, newContact);

// Route to Get All Contact
router.get("/", getAllContact);

//Dynamic Route to Get Specific id Contact
router.get("/:id", getContactById);

//Dynamic Route to update a Specific Contact
router.put("/:id", isAuthenticated, updateContactById);

// Dynamic Route to Delete Contact by ID (Specific Contact)
router.delete("/:id", isAuthenticated, deleteContactById);

//Dynamic Route get contact by user specific id
router.get("/userid/:id", getContactByUserId);

export default router;
