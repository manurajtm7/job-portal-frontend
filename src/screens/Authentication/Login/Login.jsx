import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import PlatformAuth from "../../../components/plaform-auth/PlatformAuth";

function Forms() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSbmitFormData = (e) => {
    const { email, password } = formData;

    if (!email || !password) {
      setError({
        text: `Please provide ${!email ? "email" : ""}${
          !password ? "password" : ""
        }. `,
        fieldName: "name",
      });
      return;
    }
    if (!email || !password) {
      alert("please enter details");
    } else {
      fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((res) => res.ok)
        .then((userHas) => {
          if (userHas) {
            toast.done("successfully logged in ");
            navigate("/");
          } else throw new Error("Authentication failed check credentials");
        })
        .catch((err) => {
          setError({
            text: "Authentication failed please check your email and password",
          });
          toast.error("something wrong with crednetial or network error");
        });
    }
  };

  return (
    <div className="w-full h-screen relative">
      <ToastContainer />
      <div className="absolute left-1/2 top-1/2 w-4/5 sm:w-1/4   mx-auto -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
        <div x-show="isLoginPage" className="space-y-4">
          <header className="mb-8 text-2xl font-bold">
            Sign in to your account
          </header>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="email"
              placeholder="Email"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              name="email"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="password"
              placeholder="Password"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              name="password"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
          <button
            onClick={onSbmitFormData}
            className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
          >
            SIGN IN
          </button>
        </div>

        {error ? (
          <div className="w-full">
            <span className="text-red-400">
              {error?.text ? error?.text : "Please add details"}
            </span>
          </div>
        ) : (
          ""
        )}

        <div className="flex items-center space-x-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>

        <PlatformAuth isLogIn={true} />
      </div>
    </div>
  );
}

export default Forms;
