// backend/routes/adminRoute.js
import express from 'express';
import { addDoctor, adminLogin, doctorList, getSettings, updateSettings } from  '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';
import upload from '../middleware/multer.js'
import adminAuth from '../middleware/adminAuth.js';

const adminRouter = express.Router();

// ----- Route for admin dashboard
adminRouter.post( '/add-doctor', adminAuth, upload.single('image'), addDoctor );
adminRouter.post( '/change-availability', adminAuth, changeAvailability );
adminRouter.get( '/doctor-list', adminAuth, doctorList );
adminRouter.post( '/login', adminLogin );
adminRouter.get('/settings', adminAuth, getSettings); // GET /api/settings
adminRouter.put('/update-settings', adminAuth, updateSettings); // PUT /api/settings

export default adminRouter;
