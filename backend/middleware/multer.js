import multer from 'multer';

const storage = multer.diskStorage({
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

// Specify the field name that Multer should accept
const upload = multer({ 
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Optional: limit file size to 20MB
});

export default upload;

