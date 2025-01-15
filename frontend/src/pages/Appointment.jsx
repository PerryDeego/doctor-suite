import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import DoctorsDivision from "../components/DoctorsDivision";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Timer from '../components/Timer'; // Import the Timer component
import { toast } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { accessToken, currencySymbol, doctors } = useContext(AppContext);

  const navigate = useNavigate();
  // State variables
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date()); // State for current time

  // Fetch doctor information based on docId
  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc.id === docId);
    if (foundDoc) {
      setDocInfo(foundDoc);
    } else {
      console.error("Doctor not found");
    }
  };

  // Generate available time slots for the next week (Mon-Sat: 9 AM - 6 PM)
  const getAvailableSlots = () => {
    const allSlots = [];
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const dayOfWeek = currentDate.getDay();

      // Only include slots for Monday (1) to Saturday (6)
      if (dayOfWeek >= 1 && dayOfWeek <= 6) {
        let startTime = new Date(currentDate);
        startTime.setHours(9, 0); // Start at 9 AM
        let endTime = new Date(currentDate);
        endTime.setHours(18, 0); // End at 6 PM

        let timeSlot = [];
        while (startTime < endTime) {
          let formattedTime = startTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          timeSlot.push({
            datetime: new Date(startTime),
            time: formattedTime,
          });

          startTime.setMinutes(startTime.getMinutes() + 30); // Increment by 30 minutes
        }

        allSlots.push(timeSlot);
      }
    }

    setDocSlots(allSlots);
  };

  const bookAppointment = async () => {
    if (!accessToken) {
      toast.warn('Login to book an appointment');
      return navigate('/login');
    }
  }

  // Fetch doctor info on component mount or when doctors list changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId] );

  // Get available slots when doctor info is retrieved
  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  // Update current time every second
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date()); // Update the current time state
    }, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);

  // Handle date selection from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const index = Math.floor((date - new Date()) / (1000 * 60 * 60 * 24));
    if (index >= 0 && index < docSlots.length) {
      setSlotIndex(index); // Set the corresponding slot index
    }
  };

  // Loading state if doctor info is not available
  if (!docInfo) {
    return <div>Loading or Doctor not found...</div>;
  }

  return (
    <div className="p-4">
      {/* Doctor information section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary-gradient w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={`Doctor ${docInfo.name}`}
          />
        </div>
        
        <div className="flex-1 border border-gray-400 rounded-lg p-4 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5 mb-2 sm:mb-0" src={assets.verified_icon} alt="Verified icon" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo.experience}
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="Info icon" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
          </div>
          <p>
            Appointment Fee:{" "}
            <span>
              {currencySymbol}{docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Additional details section */}
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-lg font-semibold">Additional Details</h3>
        <p className="text-sm text-gray-600 mt-2">
          Please ensure to arrive at least 10 minutes early for your appointment.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.
        </p>
      </div>

      {/* Calendar and Clock Section */}
      <div className="mt-14 flex justify-center items-center"> 
        {/* Flex container to center both calendar and clock */}
        
        {/* Calendar Component */}
        <div className="text-center mr-8"> {/* Margin right for spacing */}
          <h3 className="text-md font-semibold mb-2">Select Appointment Date</h3>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            minDate={new Date()} // Prevent past dates from being selected
          />
        </div>

        {/* Current Time Display */}
        <div className="text-center"> {/* Center the timer */}
          <h3 className="font-semibold mb-2">Current Time</h3> {/* Added margin bottom for spacing */}
          {/* Displaying the current time */}
          <Timer currentTime={currentTime} /> {/* Pass current time as prop if Timer requires it */}
        </div>
      </div>

      {/* Available Time Slots Section */}
      <div className="flex flex-col items-center gap-3 w-full overflow-x-auto mt-14">
        <h3 className="text-center text-md font-semibold mb-2">Available Appointment Times</h3>
        <div className="flex overflow-x-auto px-4">
          {docSlots.length > 0 && docSlots[slotIndex] && 
            docSlots[slotIndex].map((slot) => (
              <p
                key={slot.id}
                className={`
                  text-sm 
                  font-light 
                  flex-shrink-0 
                  px-4 
                  py-2 
                  rounded-full 
                  cursor-pointer 
                  hover:font-bold 
                  ${
                    slot.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"
                  }
                `}
                onClick={() => setSlotTime(slot.time)} // Set selected time slot
              >
                {slot.time}
              </p>
            ))}
        </div>
      </div>

      {/* Display selected time */}
      {slotTime && (
        <p className="mt-2 text-center text-lg font-medium">
          Selected Time: {slotTime} on {selectedDate.toLocaleDateString()}
        </p>
      )}

      {/* Book appointment button */}
      <button className="w-full sm:w-[40%] mt-14 bg-primary text-white py-2 px-4 rounded-full mx-auto block hover:bg-primary-gradient" onClick={bookAppointment}> 
        Book an Appointment
      </button>

      {/* Doctors division view component */}
      <DoctorsDivision docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;
