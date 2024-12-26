import express from 'express';
import { doctorList } from '../controllers/doctorController.js';

const doctorRouter = express.Router();

// ----- Route for adding a doctor with image upload
doctorRouter.post( '/list', doctorList );

export default doctorRouter;
