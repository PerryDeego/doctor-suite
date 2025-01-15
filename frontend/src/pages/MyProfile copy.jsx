/* ------ frontend/src/pages/MyProfile.jsx ------ */
import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null); // Changed to null for better handling
  const { accessToken, backendURL, fetchUserProfile, userEndpoint, userInfo, setUserInfo } = useContext(AppContext);

  const handleEditToggle = async () => {
    if (isEdit) {
      // Save changes
      try {
        const formData = new FormData();
        formData.append('name', userInfo.name);
        formData.append('email', userInfo.email);
        formData.append('phone', userInfo.phone);
        formData.append('address', JSON.stringify(userInfo.address)); // Convert address object to string
        formData.append('dob', userInfo.dob);
        formData.append('gender', userInfo.gender);
        if (image) {
          formData.append('image', image); // Append image if it exists
        }

        const { data } = await axios.post(`${backendURL}${userEndpoint}/update-profile`, formData, {
          headers: {
            accessToken,
          },
        });

        if (data.success) {
          toast.success(data.message);
          await fetchUserProfile(); // Refresh user profile
          setIsEdit(false); // Exit edit mode
          setImage(null); // Reset image state
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error.message);
        toast.error('An unexpected error occurred. Please try again later.');
      }
    } else {
      // Toggle edit mode
      setIsEdit(true);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]); // Set the selected image
    }
  };

  // Prepare the image preview URL
  const imagePreviewUrl = image ? URL.createObjectURL(image) : userInfo.image;

  return userInfo && (
    <div className='text-center py-10'>
      <h2 className="text-4xl sm:text-5xl leading-normal font-extrabold tracking-tight text-gray-900">
        User <span className="text-primary">Profile</span>
      </h2>

      <div className="max-w-md mx-auto mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img
              src={imagePreviewUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer mb-4">
              <span className="text-blue-600">Change Profile Picture</span>
            </label>

            {/* Editable Name */}
            <div className="flex items-center mb-4 w-full">
              <FaUser className="mr-2 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700 w-1/3">Name</label>
              {isEdit ? (
                <input
                  type="text"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  className="border p-2 w-2/3 rounded-md"
                />
              ) : (
                <h2 className="text-xl font-semibold w-2/3">{userInfo.name}</h2>
              )}
            </div>

            {/* Divider */}
            <hr className="w-full my-4 border-gray-300" />

            {/* Email */}
            <div className="flex items-center mb-4 w-full">
              <FaEnvelope className="mr-2 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700 w-1/3">Email</label>
              <p className="text-gray-600 w-2/3">{userInfo.email}</p>
            </div>

            {/* Phone */}
            <div className="flex items-center mb-4 w-full">
              <FaPhone className="mr-2 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700 w-1/3">Phone</label>
              {isEdit ? (
                <input
                  type="text"
                  value={userInfo.phone}
                  onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  className="border p-2 w-2/3 rounded-md"
                />
              ) : (
                <p className="text-gray-600 w-2/3">{userInfo.phone}</p>
              )}
            </div>

            {/* Address */}
            <div className="flex items-center mb-4 w-full">
              <FaMapMarkerAlt className="mr-2 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700 w-1/3">Address</label>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    value={userInfo.address.line1}
                    onChange={(e) => setUserInfo({ ...userInfo, address: { ...userInfo.address, line1: e.target.value } })}
                    className="border p-2 mb-1 w-full rounded-md"
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    value={userInfo.address.line2}
                    onChange={(e) => setUserInfo({ ...userInfo, address: { ...userInfo.address, line2: e.target.value } })}
                    className="border p-2 w-full rounded-md"
                    placeholder="Address Line 2"
                  />
                </>
              ) : (
                <p className="text-gray-600 w-2/3">{`${userInfo.address.line1}, ${userInfo.address.line2}`}</p>
              )}
            </div>

            {/* Divider */}
            <hr className="w-full my-4 border-gray-300" />

            {/* Gender */}
            <div className="flex items-center mb-4 w-full">
              <label className="block text-sm font-medium text-gray-700 w-1/3">Gender</label>
              {isEdit ? (
                <select
                  value={userInfo.gender}
                  onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
                  className="border p-2 w-full rounded-md"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <p className="text-gray-600 w-2/3">{userInfo.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="flex items-center mb-4 w-full">
              <FaCalendarAlt className="mr-2 text-gray-600" />
              <label className="block text-sm font-medium text-gray-700 w-1/3">Date of Birth</label>
              {isEdit ? (
                <input
                  type="date"
                  value={userInfo.dob}
                  onChange={(e) => setUserInfo({ ...userInfo, dob: e.target.value })}
                  className="border p-2 w-full rounded-md"
                />
              ) : (
                <p className="text-gray-600 w-2/3">{new Date(userInfo.dob).toLocaleDateString()}</p>
              )}
            </div>
          </div>

          {/* Divider */}
          <hr className="w-full my-4 border-gray-300" />

          {/* Edit/Save Button */}
          <button
            onClick={handleEditToggle}
            className={`mt-4 px-6 py-2 border ${isEdit ? 'border-green-600 text-green-600' : 'border-blue-600 text-blue-600'} rounded-lg hover:bg-${isEdit ? 'green' : 'blue'}600 hover:text-indigo-600 transition duration=300 w-full`}
          >
            {isEdit ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
