import React, { useEffect, useState } from "react";
import LoadingAnimation from "../../../components/loading-status/loading-animation/LoadingAnimation";
import profileImage from "../../../assets/character-images/user.png";
import Navbar from "../../../components/nav-bar/Navbar";

import { Check, Cross, Delete } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployerViewProfile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputSkill, setInputSKll] = useState("");
  const [isActiveSKillInput, setIsActiveSKillInput] = useState(false);
  const [changes, setChange] = useState(false);

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

      console.log(response);
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

  console.log(profile);

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

  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center body">
      <ToastContainer />

      {!loading ? (
        <div className="w-full h-full  flex gap-10 items-center justify-start ">
          <Navbar />
          <div className="w-1/4 h-full bg-blue-50  bg-opacity-50 border   rounded-lg  flex flex-col gap-4 items-center justify-center">
            <div className="w-4/5 flex gap-10 flex-col items-center  ">
              <div className="w-32 h-32 ">
                <img
                  src={profileImage}
                  alt="profile image"
                  className="border-2 border-white rounded-full"
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
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[85%] p-5 grid place-items-start overflow-auto">
            <div>
              <h1 className="text-xl font-semibold p-2 border-b-2 border-zinc-300 mb-5">
                Skills
              </h1>
              <ul className="h-18 py-1 grid gap-3 grid-cols-3  overflow-auto ">
                {profile?.Skills?.map((data, index) => (
                  <li
                    key={index}
                    className="text-white font-semibold bg-blue-600 border   rounded-full text-center p-1 px-4   "
                  >
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
                  {!isActiveSKillInput ? "add skills" : <Delete />}
                </button>
                {isActiveSKillInput && (
                  <div className="flex gap-3 items-center justify-center">
                    <input
                      type="text"
                      placeholder="type any skill you have..."
                      onChange={(e) => setInputSKll(e.target.value)}
                      className="text-white bg-blue-500 p-2 px-3 rounded-sm
                      outline-blue-800 placeholder:text-white"
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
        <LoadingAnimation />
      )}
    </div>
  );
}

export default EmployerViewProfile;
