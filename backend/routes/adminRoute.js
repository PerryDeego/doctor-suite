import express from 'express';
import { addDoctor, adminLogin } from  '../controllers/adminController.js';
import upload from '../middleware/multer.js'

const adminRouter = express.Router();

// ----- Route for adding a doctor with image upload
adminRouter.post( '/add-doctor', upload.single('image'), addDoctor );
adminRouter.post( '/login', adminLogin );

export default adminRouter;
