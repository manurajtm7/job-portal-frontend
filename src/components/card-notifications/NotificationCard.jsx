import React from "react";
import "../../styles/main-scroll.css";
import { Clock } from "lucide-react";

function NotificationCard({ data }) {
  return (
    <ul className="w-full sm:w-[60%] text-white  bg-gradient-to-tr from-blue-600 to-teal-500 hover:from-teal-400 hover:to-blue-600 hover:translate-x-2 rounded-md shadow p-5 transition-all ">
      <li className=" text-white text-xl font-bold flex">
        {data.title} <span className="text-sm ml-5 " title="instant notification">{data?.instant && <Clock /> }</span>
      </li>
      <li className="opacity-60">{data.description}</li>
      <li className="w-max text-black font-semibold text-sm bg-yellow-400 mt-3 py-1 px-3 rounded-full ">
        {new Date(data.createdDate).toDateString()}
      </li>
    </ul>
  );
}

export default NotificationCard;
