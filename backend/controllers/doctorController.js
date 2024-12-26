
const doctorList = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const profileImage = req.file;

        console.log({ name, email, password, speciality, degree, experience, about, fees, address }, profileImage);

        // Send a success response
        res.status(201).json({ message: 'Doctor added successfully' });

    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Error adding doctor', error: error.message });
    }
};

export { doctorList };
