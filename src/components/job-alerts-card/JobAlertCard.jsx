import React from "react";
import { useNavigate } from "react-router-dom";

function JobAlertCard(props) {


  const date = new Date(props?.appliedTime);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const navigate = useNavigate();

  const formattedDate = date.toLocaleDateString("en-us", options);
  return (
    <div className="w-[60%] h-1/3 bg-zinc-100 rounded-lg border p-5 flex shadow">
      <section className="w-full flex flex-col gap-5  ">
        <div className="flex flex-col">
          <span className="font-semibold capitalize">
            {props?.jobseeker_merge?.name}
          </span>
          <span className="text-sm opacity-75">
            {props?.jobseeker_merge?.email}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="w-full text-lg font-bold ">
            {props?.jobDetail_merge.jobTitle}
          </span>
          <span className="w-4/5 h-8  text-sm text-ellipsis opacity-75  overflow-auto">
            {props?.jobDetail_merge.jobDescription}
          </span>
        </div>
      </section>

      <div className="w-4/5  grid place-items-center">
        <section className="w-max flex gap-5 items-center justify-center ">
          <strong>Time</strong>
          <span className="text-xs">{formattedDate}</span>
        </section>

        <section className="w-full h-max flex flex-col items-start justify-center gap-5 ">
          <div className="flex gap-5 items-center justify-center">
            <span
              className={`${
                (props?.status === "PENDING" && "border-yellow-500") ||
                (props?.status === "ACCEPTED" && "border-green-500") ||
                (props?.status === "REJECTED" && "border-orange-500")
              } text-zinc-900 font-semibold border-2 p-1 px-3 rounded-md `}
            >
              {props?.status.toLowerCase()}
            </span>
            <button
              onClick={() => navigate(`/job-alert-info/:${props?._id}`)}
              className="text-white bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-transform font-semibold p-2 px-5 rounded-md"
            >
              Get all details
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default JobAlertCard;
