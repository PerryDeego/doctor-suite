// backend/routes/doctorRoute.js
import express from 'express';
import { doctorsList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

// ----- Route for adding a doctor with image upload
doctorRouter.get( '/doctors-list', doctorsList );

export default doctorRouter;
