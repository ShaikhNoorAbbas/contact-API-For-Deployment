import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {
      type: String,
      required: true,
      minLength: [10, "Phone number must be at least 10 characters"],
      maxLength: [10, "Phone number must not exceed 10 characters"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
