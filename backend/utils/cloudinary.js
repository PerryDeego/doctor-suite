import pkg from 'cloudinary';
const { v2 } = pkg; 

const connectCloudinary = async () => {
    v2.config({ // Use v2 for configuration
        cloud_name: process.env.CLOUDINARY_NAME, // Corrected key name
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    });
};

export default connectCloudinary;