import { Contact } from "../models/contactModel.js";

// -> function to update contact by id
export const updateContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone, type } = req.body;

    const updatedDataContact = await Contact.findByIdAndUpdate(
      id,
      {
        name,
        email: email?.toLowerCase(),
        phone,
        type,
      },
      { new: true }
    );

    if (!updatedDataContact) {
      return res.json({
        message: "Contact Does not Exists",
        success: false,
      });
    } else {
      return res.json({
        message: "Updated Contact Successfully",
        success: true,
        data: updatedDataContact,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//-> function to Delete Contact By ID
export const deleteContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const foundContact = await Contact.findById(id);
    if (!foundContact) {
      return res.json({
        message: "Looks Like Data has already Deleted",
        success: false,
      });
    } else {
      let deleteContactStatus = await Contact.findByIdAndDelete(id);
      console.log("Delete Contact Status: ", deleteContactStatus);
      if (!deleteContactStatus) {
        return res.json({
          message: "Failed to Delete contact",
          success: false,
        });
      } else {
        return res.json({
          message: "Contact Deleted Successfully",
          deletedData: deleteContactStatus,
          success: true,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.json({
      message: error,
      success: false,
    });
  }
};

//-> function get contact by id
export const getContactById = async (req, res) => {
  try {
    const id = req.params.id;
    const foundUser = await Contact.findById(id);
    if (!foundUser) {
      res.json({
        message: "No Contact Found",
        success: false,
      });
    } else {
      res.json({
        message: "Showing Specific ID",
        data: foundUser,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//-> function get All Contacts
export const getAllContact = async (req, res) => {
  try {
    const contactsData = await Contact.find();
    if (!contactsData || contactsData.length == 0) {
      res.json({
        message: "No Data Found in Contact",
        success: false,
      });
    } else {
      res.json({
        message: "All Contacts",
        data: contactsData,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//-> function Create New Contact
export const newContact = async (req, res) => {
  const { name, email, phone, type } = req.body;
  try {
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !type?.trim()) {
      return res.json({
        message: "All Fields are Required",
        success: false,
      });
    } else {
      // foundUser is a code Where we need to check if email exists or not
      let inEmailFormat = email?.toLowerCase();
      console.log("inEmailFormat", inEmailFormat);
      let foundUser = await Contact.findOne({ email: inEmailFormat });
      console.log("foundUser", foundUser);
      if (foundUser) {
        return res.json({
          message: `${name} with Email: ${inEmailFormat} Contact Already Exists into Databases`,
          success: false,
        });
      } else {
        // Code To Save New contact into MongoDB
        let saveContact = await Contact.create({
          name,
          email: email?.toLowerCase(),
          phone,
          type,
          user: req.user,
        });
        return res.json({
          message: "Contact Saved Successfully",
          success: true,
          saveContact,
        });
      }
    }
  } catch (error) {
    return res.json({
      message: error?.errors?.phone?.message,
      success: false,
    });
  }
};

// function to get contact by user specific id
export async function getContactByUserId(req, res) {
  try {
    const id = req.params.id;
    const foundContactByUser = await Contact.find({ user: id });
    if (!foundContactByUser) {
      return res.json({
        message: "No Contact Find",
        success: false,
      });
    } else {
      return res.json({
        message: "Contact Fetched",
        foundContactByUser,
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
}
