import mongoose from 'mongoose';

const connectDB = async () => {
    // ----- Connect to the database
    await mongoose.connect(`${process.env.MONGODB_URI}/doctors_suite`);

    // ------ Listen for the 'connected' event
    mongoose.connection.on('connected', () => {
        console.log('Database is now connected.');
    });

    // ------ Throw Error: Handle connection errors
    mongoose.connection.on('error', (err) => {
        console.error(`Database connection error: ${err}`);
    });
}

export default connectDB;