import React from "react";
import fnf from "../../assets/illustrations/404.png";
import { X } from "lucide-react";

function ProfileViewer({ imageUrl, setClose }) {
  return (
    <div className="w-4/5 sm:w-[70%] h-4/5 sm:h-[70%] bg-white rounded-xl  border-2 fixed left-1/2 top-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 shadow-xl transition-opacity">
      <X
        className="absolute right-5 top-5 cursor-pointer"
        onClick={() => setClose(false)}
      />
      <div className="w-full h-full p-2 object-contain   overflow-hidden ">
        <img
          src={imageUrl || fnf}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}

export default ProfileViewer;
