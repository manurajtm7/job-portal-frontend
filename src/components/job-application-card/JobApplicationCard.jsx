import { Check, Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function JobApplicationCard({ data, setChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [changeInStatus, setChangeInStatus] = useState(false);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  let handleChangeStatus = (e) => {
    setChangeInStatus(true);
    setStatus(e.target.value.toUpperCase());
  };

  const jobId = location.pathname.split(":")[1];
  const fetchJobAlerts = async () => {
    setLoading(true);
    setChange((prev) => !prev);
    const response = await fetch("http://localhost:4000/change-status", {
      method: "POST",
      body: JSON.stringify({ status, jobId }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      setLoading(false);
      setChangeInStatus(false);
    } else {
      setTimeout(() => setLoading(false), 3000);
      alert("Something went wrong . Please try again later");
    }
  };

  console.log("alert all info==>", data);

  return (
    <div className="w-4/5 h-[80%] bg-transparent  p-5 ">
      <h1 className="text-3xl font-bold mb-5 ">Job Application Details</h1>
      <div className="bg-transparent   grid grid-cols-2  ">
        <section>
          <h2 className="text-2xl font-semibold mb-2">Job Seeker Details</h2>
          <p>
            <strong className="font-semibold">Name: </strong>
            {data?.jobseeker_merge?.name}
          </p>
          <p>
            <strong className="font-semibold">Email: </strong>
            {data?.jobseeker_merge?.email}
          </p>
          <button
            onClick={() =>
              navigate(`/employe-view-profile/:${data.jobSeekerDetails}`)
            }
            className="text-white font-semibold bg-blue-500 p-1 px-4 my-5 rounded-md"
          >
            View Profile
          </button>
        </section>

        <section className=" mb-6">
          <h2 className="text-2xl font-semibold mb-2">Employer Details</h2>
          <p>
            <strong className="font-semibold">Company Name: </strong>
            {data?.companyDetails?.companyName}
          </p>
          <p>
            <strong className="font-semibold">Designation: </strong>
            {data?.companyDetails?.designation}
          </p>
        </section>

        <section className="w-[60%] h-max grid gap-2 ">
          <h2 className="text-2xl font-semibold mb-2">Job Details</h2>
          <p>
            <strong className="font-semibold">Job Title: </strong>
            {data?.jobDetail_merge.jobTitle}
          </p>
          <p className="w-4/5 h-28 overflow-auto">
            <strong className="font-semibold">Job Description: </strong>
            {data?.jobDetail_merge.jobDescription}
          </p>
          <p>
            <strong className="font-semibold">Salary: </strong> $
            {data?.jobDetail_merge.salary.toLocaleString()}
          </p>
          <p>
            <strong className="font-semibold">Location: </strong>
            {data?.jobDetail_merge.location}
          </p>
          <p>
            <strong className="font-semibold">Expected Date: </strong>
            {new Date(data?.jobDetail_merge.expectedDate).toLocaleDateString()}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">Application Status</h2>
          <div className="flex gap-5 py-4">
            <p>
              <strong className="font-semibold">Status: </strong> {data?.status}
            </p>
            <select
              name="status-selection"
              id="status-selection"
              className="text-white font-semibold bg-blue-500 p-1 px-2 rounded-md focus:outline-none"
              onChange={handleChangeStatus}
              value={changeInStatus ? status : data?.status.toUpperCase()}
            >
              <option value="PENDING">pending</option>
              <option value="ACCEPTED">accept</option>
              <option value="REJECTED">reject</option>
            </select>

            {changeInStatus && (
              <button
                onClick={fetchJobAlerts}
                className=" border border-zinc-800 p-1 px-3 rounded-md hover:bg-blue-50  transition-colors"
              >
                {!loading ? <Check /> : <Loader className="animate-spin" />}
              </button>
            )}
          </div>
          <p>
            <strong className="font-semibold">Applied Time: </strong>
            {new Date(data?.appliedTime).toLocaleString()}
          </p>
        </section>
      </div>
    </div>
  );
}

export default JobApplicationCard;
