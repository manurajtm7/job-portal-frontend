import React from "react";
import { useNavigate } from "react-router-dom";

function JobPostCard({ jobTitle, jobDescription, location, _id }) {
  const navigate = useNavigate();

  const hanldeApplySubmit = () => {
    navigate(`/:${_id}`);
  };
  return (
    <div className="relative flex  flex-col jus items-center justify-center overflow-hidden  p-4">
      <div className="bg-white  shadow-xl shadow-gray-100 w-4/5 max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md">
        <div className="w-[70%] flex gap-3 flex-col ">
          <span className="text-blue-800 font-semibold">{jobTitle}</span>
          <h3 className=" w-[70%] h-14 font-normal text-xs mt-px py-2   overflow-y-auto ">
            {jobDescription}
          </h3>
          <div className="flex items-center gap-3 mt-2">
            <span className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm">
              Full-time
            </span>
            <span className="text-slate-600 text-sm flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>{" "}
              {location}
            </span>
          </div>
        </div>
        <div>
          <button
            onClick={hanldeApplySubmit}
            className="w-full max-h-10 bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-md flex gap-1 items-center"
          >
            Apply Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobPostCard;
