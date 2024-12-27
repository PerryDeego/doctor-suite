import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const { accessToken, assets, backendURL, endpoint } =
    useContext(AdminContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zipcode: "",
    },
    available: "",
    fees: "",
    doctorImg: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.doctorImg ||
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.speciality ||
      !formData.degree ||
      !formData.experience ||
      !formData.about ||
      !formData.address ||
      !formData.available ||
      !formData.fees
    ) {
      return toast.error("All fields are required.");
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return toast.error("Email format is invalid - [example@email.com].");
    }

    const dataToSend = new FormData();
    dataToSend.append("image", formData.doctorImg);

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "doctorImg") {
        if (key === "address") {
          // Append each field of the address object individually
          Object.entries(value).forEach(([addressKey, addressValue]) => {
            dataToSend.append(`address[${addressKey}]`, addressValue);
          });
        } else {
          dataToSend.append(key, value);
        }
      }
    });

    try {
      const response = await axios.post(
        `${backendURL}${endpoint}/add-doctor`,
        dataToSend,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const { success, message } = response.data;

      if (success) {
        toast.success(message);
        resetForm(); // Clear form data
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while adding the doctor. Please try again.";
      toast.error(errorMessage);
    }
  };

  // Reset function
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      speciality: "",
      degree: "",
      experience: "",
      about: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zipcode: "",
      },
      available: "",
      fees: "",
      doctorImg: null,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        doctorImg: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-bold mb-6">Add Doctor</h1>

      {/* Image Upload */}
      <div className="mb-4">
        <label htmlFor="doc-img" className="cursor-pointer">
          {formData.doctorImg ? (
            <img
              src={URL.createObjectURL(formData.doctorImg)}
              alt="Doctor"
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          ) : (
            <img
              src={assets.upload_area}
              alt="Upload Area"
              className="w-32 h-32 object-cover mb-2 rounded"
            />
          )}
        </label>
        <input type="file" id="doc-img" hidden onChange={handleImageUpload} />
        <p className="text-center">Upload doctor picture</p>
      </div>

      <div>
        {/* Doctor Name */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">
            Doctor Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Doctor Email */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="email">
            Doctor Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Speciality */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="speciality">
            Speciality
          </label>
          <select
            id="speciality"
            name="speciality"
            value={formData.speciality}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Speciality</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="General physician">General physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
          </select>
        </div>

        {/* Degree */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="degree">
            Degree
          </label>
          <input
            type="text"
            id="degree"
            name="degree"
            placeholder="Degree"
            value={formData.degree}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="experience">
            Experience
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Experience</option>
            <option value="1 year">1 Year</option>
            <option value="2 years">2 Years</option>
            <option value="3 years">3 Years</option>
            <option value="4 years">4 Years</option>
            <option value="5+ years">5+ Years</option>
          </select>
        </div>

        {/* About */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="about">
            About
          </label>
          <textarea
            id="about"
            name="about"
            placeholder="About the doctor"
            value={formData.about}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>

        {/* Address Fields */}
        <h2 className="text-lg font-semibold mb-2">Address</h2>

        {/* Address Line 1 & Line 2 in a row */}
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-2" htmlFor="line1">
              Address 1
            </label>
            <input
              type="text"
              id="line1"
              name="line1"
              placeholder="Address Line 1"
              value={formData.address.line1}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-2" htmlFor="line2">
              Address 2
            </label>
            <input
              type="text"
              id="line2"
              name="line2"
              placeholder="Address Line 2"
              value={formData.address.line2}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* City & State in a row */}
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block mb-2" htmlFor="city">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-2" htmlFor="state">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Zipcode */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="zipcode">
            Zipcode
          </label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            placeholder="Zipcode"
            value={formData.address.zipcode}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Availability */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="available">
            Availability
          </label>
          <input
            type="text"
            id="available"
            name="available"
            placeholder="Available Days/Hours"
            value={formData.available}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Fees */}
        <div className="mb-4">
          <label className="block mb-2" htmlFor="fees">
            Consultation Fees
          </label>
          <input
            type="number"
            id="fees"
            name="fees"
            placeholder="Fees"
            value={formData.fees}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Doctor
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddDoctor;
