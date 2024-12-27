import doctorModel from "../models/doctorModel.js";

const changeAvailability = async (req, res) => {
    try {
        const { doctorId } = req.body;

        const doctorData = await doctorModel.findById( doctorId );
        await doctorModel.findByIdAndUpdate( doctorId, { available: !doctorData.available} );

        // Send a success response
        res.status(201).json({ message: 'Availability has changed.' });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding doctor', error: error.message });
    }
};


const doctorList = async () => {
    try {

        const doctors = await doctorModel.find( {}).select([ '-password', '-email' ])

        // Send a success response
        res.status(201).json({ message: 'List of Doctors.', doctors });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding doctor', error: error.message });
    }
};

export { changeAvailability, doctorList };
