import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { globalContext } from "../../../contexts/job-list-context/JobListContext";

function Forms() {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const { setCurrentForm } = useContext(globalContext);

  const handleChangeInput = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const onSbmitFormData = (e) => {
    const { name, email, password } = formData;
    if (!name || !email || !password) {
      alert("please enter details");
    } else {
      fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then(() => {
          alert("successfully registered");
          setCurrentForm((prev) => prev + 1);
          navigate("/authentication/user-profile");
        })
        .catch((err) => alert("something went wrong"));
    }
  };

  return (
    <div className="w-full h-screen relative">
      <div className="absolute left-1/2 top-1/2 mx-auto w-1/4 -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
        <div x-show="isLoginPage" className="space-y-4">
          <header className="mb-3 text-2xl font-bold">
            Create your profile
          </header>
          <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
            <input
              type="text"
              placeholder="Name"
              className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
              name="name"
              onChange={(e) => handleChangeInput(e)}
            />
          </div>
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
            CREATE ACCOUNT
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <hr className="w-full border border-gray-300" />
          <div className="font-semibold text-gray-400">OR</div>
          <hr className="w-full border border-gray-300" />
        </div>

        <footer>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="#"
              className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2.5 font-bold text-blue-700 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200"
            >
              FACEBOOK
            </a>
            <a
              href="#"
              className="rounded-2xl border-b-2 border-b-gray-300 bg-white px-4 py-2.5 font-bold text-blue-500 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200"
            >
              GOOGLE
            </a>
          </div>

          <div className="mt-8 text-sm text-gray-400">
            Already have an account ?
            <Link to={"/authentication/user-login"}>
              <span className="text-blue-500">click to sign in</span>
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Forms;
