import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const DoctorList = () => {
  const {
    accessToken,
    changeDoctorAvailability,
    doctors,
    getDoctorList,
  } = useContext(AdminContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (accessToken) {
        try {
          setLoading(true);
          await getDoctorList();
        } catch (error) {
          toast.error("Failed to fetch doctor list");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctors();
  }, [accessToken, getDoctorList]);

  return (
    <div className="flex flex-col items-center justify-center m-5 max-h-[90vh] overflow-scroll">
      <h1 className="text-lg font-medium mb-4">Doctor List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full flex flex-wrap justify-center gap-4 pt-5">
          {doctors.length === 0 ? (
            <p>No doctors available.</p>
          ) : (
            doctors.map((item) => (
              <div
                className="border border-indigo-200 rounded-xl max-w-xs overflow-hidden cursor-pointer group transition-transform transform hover:scale-105"
                key={item._id}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-2">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500 truncate z-20 hover:text-primary">{item.speciality}</p>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={item.available}
                      onChange={() => changeDoctorAvailability(item._id)}
                      className="mr-2"
                    />
                    <label className={item.available ? "text-green-500" : "text-gray-700"}>
                      Available
                    </label>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorList;