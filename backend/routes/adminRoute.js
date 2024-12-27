import express from 'express';
import { addDoctor, adminLogin, doctorList, getSettings, updateSettings } from  '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// ----- Route for adding a doctor with image upload
adminRouter.post( '/add-doctor', adminAuth, upload.single('image'), addDoctor );
adminRouter.post( '/change-availability', changeAvailability );
adminRouter.get( '/doctor-list', doctorList );
adminRouter.post( '/login', adminLogin );
adminRouter.get('/settings', adminAuth, getSettings); // GET /api/settings
adminRouter.put('/settings', adminAuth, updateSettings); // PUT /api/settings

export default adminRouter;
