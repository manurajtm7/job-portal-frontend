import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostedJobsListCard from "../../posted-jobs-list-card/PostedJobsListCard";

function JobForm() {
  const naviagte = useNavigate();
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    salary: "",
    location: "",
    expectedDate: "",
  });

  const [postedJobs, setPostedJobs] = useState([]);
  const [changes, setChanges] = useState(false);

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
      setChanges((prev) => !prev);
    } else {
      alert("something wrong with submission / try to log in first ");
    }
  };

  useEffect(() => {
    const handleFetchPostedJobs = async () => {
      const response = await fetch("http://localhost:4000/jobs/posts", {
        credentials: "include",
      });

      if (response.ok) {
        setPostedJobs((await response.json()).body);
      } else {
        alert("something wrong with submission / try to log in first ");
      }
    };

    handleFetchPostedJobs();
  }, [changes]);

  return (
    <div className=" w-full h-full flex flex-col md:flex-row  gap-5 items-center justify-start overflow-auto   ">
      <div className="w-full sm:w-[70%] h-max  border   mt-16 sm:ml-5 rounded-md  p-5 sm:px-8  ">
        <h2 className="text-2xl font-bold mb-6 mt-5">Job Form</h2>
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
              className="w-full px-3 py-2 border rounded outline-blue-300"
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
              className="w-full px-3 py-2 border rounded outline-blue-300"
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
              className="w-full px-3 py-2 border rounded outline-blue-300"
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
              className="w-full px-3 py-2 border rounded outline-blue-300"
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
              className="w-full px-3 py-2 border rounded outline-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-max bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="w-[90%] md:w-[40%] h-screen  grid md:place-items-center place-items-start overflow-auto ">
        <div className="w-full h-4/5 mt-5  rounded-md flex gap-4 flex-col items-center justify-start ">
          {postedJobs.map((data, index) => (
            <PostedJobsListCard {...data} setChanges={setChanges} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobForm;
