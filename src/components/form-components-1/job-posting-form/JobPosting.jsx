import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function JobForm() {
  const naviagte = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    salary: "",
    location: "",
    expectedDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/post-job", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      alert("successfully added job post");
      naviagte("/");
    } else {
      alert("something wrong with submission / try to log in first ");
    }
  };

  return (
    <div className=" w-full h-full flex items-center justify-center bg-gray-100   ">
      <div className="w-[90%] h-max bg-zinc-50  mt-10  rounded  p-5 px-8  ">
        <h2 className="text-2xl font-bold mb-6">Job Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="jobTitle">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              id="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter job title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="jobDescription"
            >
              Job Description
            </label>
            <textarea
              name="jobDescription"
              id="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter job description"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="salary">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              id="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter salary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              name="location"
              id="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter location"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="expectedDate">
              Expected Date
            </label>
            <input
              type="date"
              name="expectedDate"
              id="expectedDate"
              value={formData.expectedDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
