import { Check, Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { globalContext } from "../../contexts/employer-details-context/EmployerDetailsContext";

function JobApplicationCard({ data, setChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { profileDetails, fetchHandle } = useContext(globalContext);

  const [changeInStatus, setChangeInStatus] = useState(false);
  const [status, setStatus] = useState("PENDING");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHandle();
  }, []);

  let handleChangeStatus = (e) => {
    setChangeInStatus(true);
    setStatus(e.target.value.toUpperCase());
  };

  const handleSendNotification = async (
    senderId,
    receiverId,
    title,
    description
  ) => {
    const response = await fetch(
      "http://localhost:5000/notifications/private-post",
      {
        method: "POST",
        body: JSON.stringify({ senderId, receiverId, title, description }),
        headers: { "Content-Type": "application/json" },
      }
    );
    return response;
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

    handleSendNotification(
      profileDetails._id,
      data.jobseeker_merge._id,
      `Application status on ${data?.jobDetail_merge?.jobTitle}`,
      `Your application status changed to ${status}`
    );

    if (response.ok) {
      setLoading(false);
      setChangeInStatus(false);
    } else {
      setTimeout(() => setLoading(false), 3000);
      alert("Something went wrong . Please try again later");
    }
  };

  return (
    <div className="w-[90%] sm:w-4/5  h-screen sm:h-[80%]   sm:p-5 ">
      <h1 className="text-xl sm:text-3xl font-bold mb-5 ">
        Job Application Details
      </h1>
      <div className="   grid sm:grid-cols-2  ">
        <section>
          <h2 className="sm:text-2xl font-bold sm:font-semibold  mb-2">
            Job Seeker Details
          </h2>
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
          <h2 className="sm:text-2xl font-bold sm:font-semibold mb-2">
            Employer Details
          </h2>
          <p>
            <strong className="font-semibold">Company Name: </strong>
            {data?.companyDetails?.companyName}
          </p>
          <p>
            <strong className="font-semibold">Designation: </strong>
            {data?.companyDetails?.designation}
          </p>
        </section>

        <section className="w-full sm:w-[60%] h-max grid gap-5 sm:gap-2 ">
          <h2 className="sm:text-2xl font-bold sm:font-semibold mb-2">
            Job Details
          </h2>
          <p>
            <strong className="font-semibold">Job Title: </strong>
            {data?.jobDetail_merge.jobTitle}
          </p>
          <p className="w-full  sm:w-full max-h-28 text-xs sm:text-sm  overflow-auto">
            <strong className="font-semibold ">Job Description: </strong>
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

        <section className=" py-5  ">
          <h2 className="sm:text-2xl font-semibold mb-2">Application Status</h2>
          <div className="flex gap-5 py-4">
            <p className="flex sm:gap-5 flex-col sm:flex-row">
              <strong className="font-semibold flex flex-col sm:flex-row">Status: </strong>{" "}
              <span className={`${data?.status == "ACCEPTED" ? "font-semibold text-green-700" : "text-red-500"} block`}>{data?.status}</span>
            </p>
            <select
              name="status-selection"
              id="status-selection"
              className="text-white font-semibold bg-blue-500 sm:p-1 px-2  rounded-md focus:outline-none"
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
