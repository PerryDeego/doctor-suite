/* ------ backend/server.js ------ */
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './utils/mongodb.js';
import connectCloudinary from './utils/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRouter.js';

const app = express();
// Define the server port, using environment variable or default to 8000
const PORT = process.env.PORT || 8000;
connectDB();
connectCloudinary();

// ----- Create an instance of an Express application and Cross-origin resource sharing
app.use(express.json());
app.use(cors());

// ----- API endpoints ------ Call to localhost:8000/api/admin/add-doctor
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
    res.send('Test APIs');
});

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
