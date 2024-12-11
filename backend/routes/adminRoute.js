import express from 'express';
import { addDoctor } from  '../controllers/adminController.js';
import upload from '../middleware/multer.js'

const adminRouter = express.Router();

// ----- Route for adding a doctor with image upload
adminRouter.post( '/add-doctor', upload.single('image'), addDoctor );

export default adminRouter;
