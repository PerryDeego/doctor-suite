import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import { doctorSchema } from "../validation/validation.js"; // Import shared validation schema

const addDoctor = async (req, res) => {

    try {

      // Validate the incoming request data
      const { error } = doctorSchema.validate(req.body);
  
      if (error) {
        console.error("Validation error details:", error.details); // Log detailed error information for debugging
        return res
          .status(400)
          .json({ message: "Input validation failed!", errors: error.details });
      }
  
      const {
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        address, 
        available,
        fees,
      } = req.body;
  
      const profileImage = req.file; // The uploaded file from the request
  
      // Hash and salt the password before saving
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Upload image using Cloudinary storage
      let imageURL = null;
  
      if (profileImage) {
        try {
          const imageUpload = await cloudinary.uploader.upload(
            profileImage.path,
            { resource_type: "image" }
          );
          imageURL = imageUpload.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          return res
            .status(500)
            .json({
              message: "Error uploading image",
              error: uploadError.message,
            });
        }
      }
  
      const doctorData = {
        name,
        email,
        password: hashedPassword,
        image: imageURL,
        speciality,
        degree,
        experience,
        about,
        address,
        available,
        fees,
        date: Date.now(), // Store the current date as a timestamp
        slots_booked: [], // Initialize as an empty array for storing booked slots
      };
  
      // Create a new doctor model instance and save it to the database
      const newDoctor = new doctorModel(doctorData);
      await newDoctor.save();
  
      // Send a success response back to the client
      res
        .status(201)
        .json({ message: "Doctor added successfully.", doctor: newDoctor });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res
        .status(500)
        .json({ message: "Error adding doctor", error: error.message });
    }
  };

// -------- API function to handle adminLogin
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // Check if provided credentials match the environment variables
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Sign a JWT token with a structured payload
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30m",
      });

      // Send success response with token
      return res
        .status(200)
        .json({ message: "Welcome, you are logged in.", token });
    } else {
      return res.status(401).json({ message: "Invalid credentials provided." });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

// --------- API to get doctor list
const doctorList = async ( req, res ) => {

  try {
    const doctors = await doctorModel.find( {} ).select( '-password' );
    res.json( { success: true, doctors } );
  } catch ( error ) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
}

// controllers/settingsController.js
import Setting from '../models/settingModel.js'; // Assuming you have a model for settings

// Get settings
const getSettings = async (req, res) => {
  try {
    const settings = await Setting.findOne({}); // Fetch the settings from the database
    res.json(settings); // Respond with the settings
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};

//------ Update settings function
const updateSettings = async (req, res) => {

  try {

    const updatedSettings = await Setting.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(updatedSettings); // Respond with 200 OK

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }

};


export { addDoctor, adminLogin,  getSettings, doctorList, updateSettings  };
