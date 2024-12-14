import express from 'express';
import { addDoctor, adminLogin } from  '../controllers/adminController.js';
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// ----- Route for adding a doctor with image upload
adminRouter.post( '/add-doctor', adminAuth, upload.single('image'), addDoctor );
adminRouter.post( '/login', adminLogin );

export default adminRouter;
