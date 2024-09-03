// import React from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { Bell, Settings2Icon } from "lucide-react";
// import "../../App.css";
// import "./navbar.css";
// import Cookie from "js-cookie";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     Cookie.remove("token");
//     navigate("/");
//   };
//   return (
//     <nav className=" w-full bg-transparent backdrop-blur-xl border-b-2 border-b-zinc-300 p-2 fixed top-0 z-50">
//       <div className="container mx-auto flex justify-around items-center">
//         <Link to={"/"} className="text-blue-600 text-2xl text-center font-bold">
//           <h1>
//             Learn <span className="text-zinc-800">buds</span>
//           </h1>
//           <p className="text-sm font-normal text-zinc-600 text-start">
//             Job portal
//           </p>
//         </Link>
//         <ul className="flex gap-4 items-center">
//           <li>
//             <NavLink
//               to="/job-portal"
//               className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
//             >
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to="/jobs-list"
//               className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
//             >
//               Job Search
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/community"
//               className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
//             >
//               Community
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               title="profie"
//               to="/profile"
//               className="text-zinc-900 hover:scale-105 px-3 p-2 "
//             >
//               Profile
//             </NavLink>
//           </li>

//           <li>
//             <NavLink
//               to="/alerts"
//               className="text-zinc-900 hover:scale-105 px-3  rounded"
//             >
//               Alerts
//             </NavLink>
//           </li>

//           <li className="relative drop-down" title="setting and logout">
//             <Link>
//               <Settings2Icon />
//             </Link>
//             <ul className="w-32 h-max bg-zinc-100 p-3 py-5 rounded-md   flex-col gap-5 text-center shadow-xl  absolute z-50 top-full drop-down-list">
//               <li
//                 onClick={handleLogout}
//                 className="bg-zinc-50 hover:bg-red-500 hover:text-white px-2 p-1 rounded-full transition-colors  "
//               >
//                 <button>Log out</button>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Bell, Settings2Icon } from "lucide-react";
import "../../App.css";
import "./navbar.css";
import Cookie from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("token");
    navigate("/");
  };

  return (
    <nav className="w-full   bg-transparent backdrop-blur-xl border-b-2 border-b-zinc-300 p-2 sm:p-0  fixed top-0 z-50">
      <div className="sm:w-[60%]  mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-600 text-2xl font-bold px-3 sm:px-0">
          <h1>
            Learn <span className="text-zinc-800">buds</span>
          </h1>
          <p className="text-sm font-normal text-zinc-600">Job portal</p>
        </Link>
        <div className="flex gap-4 items-center ">
          <ul className="hidden md:flex gap-4 items-center ">
            <li>
              <NavLink
                to="/job-portal"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jobs-list"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Job Search
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Community
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alerts"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                <Bell />
              </NavLink>
            </li>
            <li className="relative drop-down" title="setting and logout">
              <Link>
                <Settings2Icon />
              </Link>
              <ul className="w-32 h-max bg-zinc-100 p-3 py-5 rounded-md flex-col gap-5 text-center shadow-xl absolute z-50 top-full drop-down-list">
                <li
                  onClick={handleLogout}
                  className="bg-zinc-50 hover:bg-red-500 hover:text-white px-2 p-1 rounded-full transition-colors"
                >
                  <button>Log out</button>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div className=" sm:hidden mr-5 flex gap-5 flex-row-reverse items-center justify-center">
          <li className="relative drop-down list-none sm:hidden" title="setting and logout">
            <Link>
              <Settings2Icon />
            </Link>
            <ul className="w-32 h-max bg-zinc-100 p-3 py-5 rounded-md flex-col gap-5 text-center shadow-xl absolute right-0 z-50 top-full drop-down-list">
              <li
                onClick={handleLogout}
                className="bg-zinc-50 hover:bg-red-500 hover:text-white px-2 p-1 rounded-full transition-colors"
              >
                <button>Log out</button>
              </li>
            </ul>
          </li>
          <button
            className="md:hidden text-zinc-900 hover:scale-105 px-3 py-2 rounded"
            onClick={() => {
              const menu = document.getElementById("mobile-menu");
              menu.classList.toggle("hidden");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu"
          className="hidden md:hidden absolute top-16 left-0 w-full bg-white shadow-lg"
        >
          <ul className="flex flex-col items-center gap-4 py-4">
            <li>
              <NavLink
                to="/job-portal"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/jobs-list"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Job Search
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/community"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Community
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/alerts"
                className="text-zinc-900 hover:scale-105 px-3 py-2 rounded"
              >
                Alerts
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
