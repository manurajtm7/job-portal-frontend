// src/ProfileForm.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    dob: "",
    hobbies: "",
    interests: "",
    habits: "",
    qualification: "",
    profilePicture: null,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = e.target.files;
    if (name === "profilePicture") {
      setFormData({ ...formData, profilePicture: files[0] });
    } else if (name === "images") {
      setFormData({ ...formData, images: [...files] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { age, dob, hobbies, interests, habits, qualification } = formData;

    if ((age, dob, hobbies, interests, habits, qualification)) {
      const response = await fetch(
        "http://localhost:4000/personal-profile-form",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      if (response.ok) {
        alert("personal details updated");
        navigate("/");
      } else alert("something wrong with authentication");
    } else {
      alert("please add all the details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3 ">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create your profile
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="date"
              name="dob"
              placeholder="Date of Birth"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="hobbies"
              placeholder="Hobbies"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="interests"
              placeholder="Interests"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="habits"
              placeholder="Any Habits"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="qualification"
              placeholder="Qualification"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-600">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              className="w-full p-3 border rounded-lg"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-600">
              Multiple Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              className="w-full p-3 border rounded-lg"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
