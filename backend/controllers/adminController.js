import bcrypt from 'bcrypt';
import cloudinary from 'cloudinary'; 
import jwt from 'jsonwebtoken'; 
import validator from 'validator';
import doctorModel from '../models/doctorModel.js'; 

const addDoctor = async (req, res) => {
    try {
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
            fees
        } = req.body;
        const profileImage = req.file;

        // Validation
        const errors = [];

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            errors.push('Name is required and must not be an empty field.');
        }

        if (!validator.isEmail(email)) {
            errors.push('Invalid email format - format: example@email.com.');
        }

        if (!password || password.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }

        if (!speciality || typeof speciality !== 'string' || speciality.trim().length === 0) {
            errors.push('Speciality is required and must not be an empty field.');
        }


        if (!degree || typeof  degree !== 'string' || degree.trim().length === 0) {
            errors.push('Degree is required and must not be an empty field.');
        }

        if (!experience || typeof experience !== 'string' || experience.trim().length === 0) {
            errors.push('Experience is required and must not be an empty field.');
        }

        if (!about || typeof about !== 'string' || about.trim().length === 0) {
            errors.push('About is required and must not be an empty field.');
        }

        // Address validation - assuming it should have specific fields
        if (!address || typeof address !== 'object') {
            errors.push('Address is required and must fill in relevant fields.');
        } else {
            const { line1, line2, city, state, zipcode } = address;
        
            if (!line1 || typeof line1 !== 'string' || line1.trim().length === 0) {
                errors.push('Address line 1 is required and must not be an empty field.');
            }
        
            if (!city || typeof city !== 'string' || city.trim().length === 0) {
                errors.push('City is required and must not be an empty field.');
            }
        
            if (!state || typeof state !== 'string' || state.trim().length === 0) {
                errors.push('State is required and must not be an empty field.');
            }
        
            if (!zipcode || typeof zipcode !== 'string' || zipcode.trim().length === 0) {
                errors.push('Zipcode is required and must not be an empty field.');
            }
        
            // line2 can be empty, so no validation needed for it
        }
        
        if (typeof available !== 'string' || available.trim().length === 0) {
            errors.push('Availability status is required and must not be an empty field.');
        }

        if (typeof fees !== 'number' || fees > 0) { 
            errors.push('Fees must be a positive number.');
        }

        // If there are validation errors, send a response with the error messages
        if (errors.length > 0) {
            return res.status(400).json({ message: 'Validation failed!', errors });
        }

        // Hash and salt the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image using Cloudinary storage
        let imageURL = null;
        
        if (profileImage) {
            try {
                const imageUpload = await cloudinary.uploader.upload(profileImage.path, { resource_type: 'image' });
                imageURL = imageUpload.secure_url;
            } catch (uploadError) {
                console.error('Cloudinary upload error:', uploadError);
                return res.status(500).json({ message: 'Error uploading image', error: uploadError.message });
            }
        }

        // Create doctor data object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageURL,
            speciality,
            degree,
            experience,
            about,
            address:  JSON.stringify(address), 
            available,
            fees,
            date: Date.now(), // Set current date
            slots_booked: {} // Default value as per your schema
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // Send a success response
        res.status(201).json({ message: 'Doctor added successfully.' });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding doctor', error: error.message });
    }
};

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if provided credentials match the environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Sign a JWT token with a structured payload
            const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

            // Send success response with token
            return res.status(200).json({ message: 'Login successfully.', token });
        } else {
            // Invalid credentials response
            return res.status(401).json({ message: 'Invalid credentials provided.' });
        }

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};

export { addDoctor, adminLogin };
