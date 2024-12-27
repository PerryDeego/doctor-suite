import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../context/AdminContext";
import { toast } from "react-toastify";

const DoctorList = () => {
  const { accessToken, changeDoctorAvailability, doctors, getDoctorList } = useContext(AdminContext);
  
  // Error handling for undefined context
  if (!accessToken) {
    return <div className="m-5">No Access Token Available. Please log in.</div>;
  }

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        await getDoctorList();
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [accessToken, getDoctorList]);

  if (loading) {
    return <div className="m-5">Loading doctors...</div>;
  }

  if (error) {
    return <div className="m-5 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="m-5 max-h-[90vh] overflow-scroll">
      <h1>Doctor List</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          doctors.map((item) => (
            <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={item._id}>
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-2">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeDoctorAvailability(item._id)}
                />
                <label className="ml-2">Available</label>
                <p className="font-semibold">{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DoctorList;