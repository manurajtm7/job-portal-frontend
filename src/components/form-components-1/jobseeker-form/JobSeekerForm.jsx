// src/JobForm.js

import React, { useState } from "react";

const JobForm = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    expertiseLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Job Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="jobTitle"
              placeholder="Job Title"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <select
              name="expertiseLevel"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            >
              <option value="">Select Expertise Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
