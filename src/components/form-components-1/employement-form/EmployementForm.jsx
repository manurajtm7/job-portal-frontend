import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    designation: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch(
      "http://localhost:4000/employer-details-form",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );

    if (response.ok) {
      const employeeDetails = await response.json();
      alert("successfully added employee details");
      navigate("/");
    } else {
      alert("something wrong with submission / try to log in first ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Company Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="designation"
              placeholder="Designation"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full p-3 border rounded-lg"
              onChange={handleChange}
            />
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

export default CompanyForm;
