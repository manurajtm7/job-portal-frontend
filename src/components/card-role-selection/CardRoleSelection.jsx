import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./card-style.css"

function CardRoleSelection({ role, description, image }) {
  const navigate = useNavigate();
  const empoloyer_token = Cookies.get("EMPLOYER_TOKEN");
  const token = Cookies.get("token");

  const naviateHandler = () => {
    if (role === "Employee") {
      if (empoloyer_token || token) {
        navigate("/employer-dashboard");
      } else navigate("/authentication/company-form");
    } else {
      navigate("/jobs-list");
    }
  };
  return (
    <div
      onClick={naviateHandler}
      className=" w-[90%] sm:w-1/4  h-28  rounded-lg grid grid-cols-2 place-items-center relative  hover:scale-105   overflow-hidden transition-all cursor-pointer card-backdrop"
    >
      <div className="w-full h-full absolute left-0 top-0 z-[5]  ">
        <img src={image} alt="Role image" className="  object-fit" />
      </div>
      <div className="flex flex-col gap-2 relative z-20">
        <h1 className="text-white font-semibold text-lg  ">{role}</h1>
        <button className="font-semibold bg-zinc-50 px-6  rounded-full">
          {description || "Join"}
        </button>
      </div>
    </div>
  );
}

export default CardRoleSelection;
