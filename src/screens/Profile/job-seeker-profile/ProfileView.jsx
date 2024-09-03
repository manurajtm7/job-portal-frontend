import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../../components/loading-status/loading-animation/LoadingAnimation";
import profileImage from "../../../assets/character-images/user.png";
import Navbar from "../../../components/nav-bar/Navbar";

import {
  Check,
  Cross,
  Delete,
  DeleteIcon,
  Edit,
  LucideDelete,
  Trash,
  Trash2,
  X,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileViewer from "../../../components/profile-viewer/ProfileViewer";
import { Link } from "react-router-dom";

function EmployerViewProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputSkill, setInputSKll] = useState("");
  const [isActiveSKillInput, setIsActiveSKillInput] = useState(false);
  const [changes, setChange] = useState(false);
  const [imageClose, setImageClose] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchHandler = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:4000/profile-view", {
        method: "GET",
        signal: signal,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.body);
        setLoading(false);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };
    fetchHandler();

    () => controller.abort();
  }, [changes]);

  const handleAddSkills = async () => {
    setChange(true);
    const response = await fetch("http://localhost:4000/profile-view", {
      method: "POST",
      body: JSON.stringify({ skills: inputSkill }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast.success("skill added successfully");
      setIsActiveSKillInput(false);
      setChange(false);
    } else {
      toast.error("something wrong, check connection");
      setChange(false);
    }
  };

  const handleDeleteSkill = async (skill) => {
    const permission = confirm("Do you want to deleted skill ?");
    if (!permission) return;

    setChange(true);
    const response = await fetch("http://localhost:4000/profile-view", {
      method: "DELETE",
      body: JSON.stringify({ skill }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      toast.success("skill deleted successfully");
      setChange(false);
    } else {
      toast.error("something wrong, check connection");
      setChange(false);
    }
  };

  return (
    <div className="w-full h-max relative flex flex-col items-center justify-center body">
      <ToastContainer />
      {imageClose && (
        <ProfileViewer
          imageUrl={profile?.personalDetails?.profilePicture}
          setClose={setImageClose}
        />
      )}
      {!loading ? (
        <div className="w-full h-full  flex gap-10 flex-col sm:flex-row items-center justify-start ">
          <Navbar />
          <div className="w-full sm:w-1/4 min-h-[60vh] sm:h-screen bg-blue-50  bg-opacity-50 border   rounded-lg  flex flex-col gap-4 items-center justify-center">
            <div className="w-4/5  flex sm:gap-10 flex-col items-center justify-center  ">
              <div className="w-32 h-32 grid place-items-center overflow-hidden ">
                <img
                  src={profile?.personalDetails?.profilePicture || profileImage}
                  alt="profile image"
                  className="w-full h-full object-cover border-2 border-white rounded-full"
                  onClick={() => setImageClose((prev) => !prev)}
                />
              </div>
              <div className="text-center">
                <div className="grid gap-2">
                  <p className="text-xl font-medium capitalize">
                    {profile?.name}
                  </p>
                  <p>{profile?.email}</p>
                  <p className="text-xs">
                    {new Date(profile?.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-800">
                    <Link
                      to={"/authentication/update-profile"}
                      className="flex gap-3 items-center justify-center"
                    >
                      Edit profile <Edit size={17} />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[85%] p-5 grid place-items-start overflow-auto">
            <div>
              <h1 className="text-xl font-semibold p-2 border-b-2 border-zinc-300 mb-5">
                Skills
              </h1>
              <ul className="h-18 py-1 sm:grid gap-3 sm:grid-cols-3 flex flex-wrap  overflow-auto ">
                {profile?.Skills?.map((data, index) => (
                  <li
                    key={index}
                    className="min-w-max text-zinc-950 font-semibold bg-transparent border border-zinc-500   rounded-full text-center p-1 px-4   relative group"
                  >
                    <div
                      onClick={() => handleDeleteSkill(data)}
                      className="w-full h-full text-white bg-red-500 bg-opacity-70   rounded-full absolute right-0 bottom-0 opacity-0 grid place-items-center group-hover:opacity-100 transition-all cursor-pointer"
                    >
                      <Trash2 />
                    </div>
                    {data}
                  </li>
                ))}
              </ul>
              <div className="flex gap-5 mt-5 items-center ">
                {!profile.Skills && (
                  <h1 className="text-blue-700">you didn't added any skills</h1>
                )}
                <button
                  className=" text-blue-600 font-thin "
                  onClick={() => setIsActiveSKillInput((prev) => !prev)}
                >
                  {!isActiveSKillInput ? (
                    "add skills"
                  ) : (
                    <X className="text-red-600" />
                  )}
                </button>
                {isActiveSKillInput && (
                  <div className="flex gap-3 items-center justify-center">
                    <input
                      type="text"
                      placeholder="type any skill you have..."
                      onChange={(e) => setInputSKll(e.target.value)}
                      className="text-zinc-700 bg-zinc-100 p-2 px-3 rounded-sm
                      outline-blue-200 placeholder:text-zinc-700"
                    />
                    <Check onClick={handleAddSkills} />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex gap-4 flex-col py-5  ">
              <h2 className="text-xl font-semibold text-gray-700">
                Personal Details
              </h2>
              <p>
                <strong>Age:</strong> {profile?.personalDetails?.age}
              </p>
              <p>
                <strong>Date of Birth:</strong> {profile?.personalDetails?.dob}
              </p>
              <p>
                <strong>Hobbies:</strong> {profile?.personalDetails?.hobbies}
              </p>
              <p>
                <strong>Interests:</strong>{" "}
                {profile?.personalDetails?.interests}
              </p>
              <p>
                <strong>Habits:</strong> {profile?.personalDetails?.habits}
              </p>
              <p>
                <strong>Qualification:</strong>
                {profile?.personalDetails?.qualification}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-screen relative">
          <LoadingAnimation />
        </div>
      )}
    </div>
  );
}

export default EmployerViewProfile;
