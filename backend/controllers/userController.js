import bcrypt from "bcrypt";
import cloudinary from "cloudinary";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// ------ API to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format - Format: email@support.com" });
    }

    // Validate password (e.g., minimum length)
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User  with this email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    }); // Set expiration time as needed

    // Respond with success message
    return res
      .status(201)
      .json({ message: "User  registered successfully", token });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ------ API to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format - Format: email@support.com" });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Respond with success message and token
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ------ API to login user profile info
const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID
    const user = await userModel.findById(userId).select("-password"); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: "User  not found" });
    }

    // Respond with user profile information
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ------ API to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Get userId from req.user

    const { name, email, phone, address, dob, gender } = req.body;
    const profileImage = req.file;

    // Validate name
    if (name && name.trim().length === 0) {
      return res.status(400).json({ message: "Name cannot be empty" });
    }

    // Validate email format if provided
    if (email && !validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Invalid email format - Format: email@support.com" });
    }

    // Validate phone number format if provided
    if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number format" });
    }

    // Validate address if provided
    if (address && address.trim().length === 0) {
      return res.status(400).json({ message: "Address cannot be empty" });
    }

    // Validate date of birth if provided
    if (dob) {
      const dobDate = new Date(dob);
      if (isNaN(dobDate.getTime())) {
        return res.status(400).json({ message: "Invalid date of birth" });
      }
      // Check if the user is at least 18 years old
      const today = new Date();
      const age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        age--;
      }
      if (age < 18) {
        return res
          .status(400)
          .json({ message: "You must be at least 18 years old" });
      }
    }

    // Validate gender if provided
    const validGenders = ["male", "female"];
    if (gender && !validGenders.includes(gender.toLowerCase())) {
      return res
        .status(400)
        .json({ message: "Gender must be 'male', or 'female'" });
    }

    // Prepare the update object
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (dob) updateData.dob = dob;
    if (gender) updateData.gender = gender;

    // Update the user in the database
    const updatedUser = await userModel
      .findByIdAndUpdate(userId, updateData, { new: true, runValidators: true })
      .select("-password");

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User  not found" });
    }

    // Upload image using Cloudinary storage if provided
    let imageURL = null;
    if (profileImage) {
      try {
        const imageUpload = await cloudinary.uploader.upload(
          profileImage.path,
          { resource_type: "image" }
        );
        imageURL = imageUpload.secure_url;
        updatedUser.image = imageURL; // Update the image URL in the user object
        await updatedUser.save(); // Save the updated user object
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        return res.status(500).json({ message: "Error uploading image" });
      }
    }

    // Respond with the updated user information
    return res
      .status(200)
      .json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
