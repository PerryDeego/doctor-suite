import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import DoctorsDivision from "../components/DoctorsDivision";

const Appointment = () => {
  const { docId } = useParams(); // Get the doctor ID from URL parameters
  const { currencySymbol, daysOfWeek, doctors } = useContext(AppContext); // Access context values

  const [docInfo, setDocInfo] = useState(null); 
  const [docSlots, setDocSlots] = useState([]); 
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  // Fetch doctor information based on the docId
  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc.id === docId);
    if (foundDoc) {
      setDocInfo(foundDoc);
    } else {
      console.error("Doctor not found");
    }
  };

  // Generate available time slots for the next week
  const getAvailableSlots = () => {
    const allSlots = [];
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight

    // Generate slots for the next week
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Only consider Tuesday (2) through Monday (1)
      if (currentDate.getDay() >= 2 || currentDate.getDay() === 1) {
        let startTime = new Date(currentDate);
        startTime.setHours(11, 0); // Start at 11 AM
        let endTime = new Date(currentDate);
        endTime.setHours(20, 0); // End at 8 PM

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

  useEffect(() => {
    fetchDocInfo(); // Fetch doctor info when component mounts or when doctors change
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots(); // Get available slots when doctor info is fetched
    }
  }, [docInfo]);

  // Conditional rendering for loading state or error
  if (!docInfo) {
    return <div>Loading or Doctor not found...</div>;
  }

  return (
    <div className="p-4"> {/* Added padding for mobile view */}
      {/* Doctor Information */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary-gradient w-full sm:max-w-72 rounded-lg"
            src={docInfo.image}
            alt={`Doctor ${docInfo.name}`}
          />
        </div>
        
        {/* Doctor details container with space added only in mobile view */}
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
              {currencySymbol}
              {docInfo.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Additional Details Section */}
      <div className="mt-4 p-4 border border-gray-300 rounded-lg bg-white">
        <h3 className="text-lg font-semibold">Additional Details</h3>
        <p className="text-sm text-gray-600 mt-2">
          Please ensure to arrive at least 10 minutes early for your appointment.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.
        </p>
      </div>

      {/* Available Time Slots */}
      <div className="flex flex-col items-center gap-3 w-full overflow-x-auto mt-4">
        <h3 className="text-center text-md font-semibold mb-2">
          Available Appointment Dates
        </h3>
        <div className="flex gap-3 items-center overflow-x-auto">
          {docSlots.length > 0 &&
            docSlots.map((slot, index) => (
              <div
                key={index}
                className={`text-center py-4 min-w-[80px] rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
                onClick={() => setSlotIndex(index)}
              >
                <p>{slot[0] ? daysOfWeek[slot[0].datetime.getDay()] : ''}</p>
                <p>{slot[0] ? slot[0].datetime.getDate() : ''}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="flex flex-col items-center gap-3 w-full overflow-x-auto mt-4">
        <h3 className="text-center text-md font-semibold">
          Select From Available Appointment Time Slots
        </h3>
        <div className="flex overflow-x-auto px-4">
          {docSlots.length > 0 && docSlots[slotIndex] && 
            docSlots[slotIndex].map((slot, index) => (
              <p
                key={index}
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
                    slot.time === slotTime
                      ? "bg-primary text-white"
                      : "text-gray-400 border border-gray-300"
                  }
                `}
                onClick={() => setSlotTime(slot.time)}
              >
                {slot.time} {/* Displaying formatted time directly */}
              </p>
            ))}
        </div>
      </div>

      {/* Selected Time Display */}
      {slotTime && (
        <p className="mt-2 text-center text-lg font-medium">
          Selected Time: {slotTime}
        </p>
      )}

      {/* Adjusted Button Size */}
      <button className="w-full sm:w-[40%] mt-4 bg-primary text-white py-2 px-4 rounded-full mx-auto block"> 
        Book an Appointment
      </button>

      {/* Doctors Division View Component */}
      <DoctorsDivision docId={docId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;