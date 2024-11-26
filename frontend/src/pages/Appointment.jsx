import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const foundDoc = doctors.find((doc) => doc.id === Number(docId)); // Ensure type consistency
    if (foundDoc) {
      setDocInfo(foundDoc);
    } else {
      // Handle case where doctor is not found
      console.error("Doctor not found");
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // Get current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // Logic for start date
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Logic for end date
      let endDate = new Date();
      endDate.setDate(today.getDate() + 1);
      endDate.setHours(21, 0, 0, 0);

      // Logic for setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlot = [];

      while (currentDate < endDate) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Append appointment time to array
        timeSlot.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots(prev => [...prev, timeSlot]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        {/* -------------- Doctor Information --------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt={`Doctor ${docInfo.name}`} />
          </div>
                  {/* Other doctor details can go here */}
                  <div className="flex-1 border-gray-400 rounded-lg p-8 py-7 bg-white mx-2">
            <p className="flex items-center gap-3 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified icon" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
            </div>
            {/* ----------------- Doctor's Profile ---------------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="Info icon" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">{docInfo.about}</p>
            </div>
            <p>Appointment Fee: <span>{docInfo.fees}</span></p>
          </div>
        </div>

        {/* -------------- Available Time Slots -------------- */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold">Available Time Slots</h2>
          {docSlots.length > 0 ? (
            <ul className="mt-4">
              {docSlots.map((slots, index) => (
                <li key={index} className="mb-4">
                  <h3 className="font-medium">{daysOfWeek[index]}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {slots.map((slot, slotIndex) => (
                      <button
                        key={slotIndex}
                        className={`border rounded-md px-3 py-1 text-sm ${
                          slotIndex === slotIndex ? 'bg-blue-500 text-white' : 'text-gray-700'
                        }`}
                        onClick={() => {
                          setSlotIndex(slotIndex);
                          setSlotTime(slot.time);
                        }}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No available slots for this doctor.</p>
          )}
        </div>
      </div>
    )
  );
};

export default Appointment;