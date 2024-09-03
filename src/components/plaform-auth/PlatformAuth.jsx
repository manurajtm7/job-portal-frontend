import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "../../assets/logos/google.png";

function PlatformAuth({ isLogIn }) {
  return (
    <footer>
      <div>
        <a
          href="http://localhost:4000/auth/google"
          className="rounded-lg  border-b-gray-300 bg-white px-4 py-2.5  text-zinc-700 ring-2 ring-gray-300 hover:bg-gray-200 active:translate-y-[0.125rem] active:border-b-gray-200
          flex gap-5 items-center justify-center
          "
        >
          <p className=" text-xs font-medium uppercase">Sign with google</p>
          <img src={GoogleIcon} alt="google icon" className="w-7 h-7" />
        </a>
      </div>

      <div className="mt-8 text-sm text-gray-400">
        {
            isLogIn ? " No account ?" : "Already have an account ? "
        }
        <Link
          to={
            isLogIn
              ? "/authentication/user-registration"
              : "/authentication/user-login"
          }
        >
          <span className="text-blue-500">
            {isLogIn ? " click  to sign up" : " click to sign in"}
          </span>
        </Link>
      </div>
    </footer>
  );
}

export default PlatformAuth;
