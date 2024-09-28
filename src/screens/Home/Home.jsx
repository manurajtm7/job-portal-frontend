// import React from "react";
// import Navbar from "../../components/nav-bar/Navbar";
// import CardRoleSelection from "../../components/card-role-selection/CardRoleSelection";
// import Cookie from "js-cookie";
// import { Link } from "react-router-dom";
// import bg from "../../assets/illustrations/home-1.png";
// import Employee from "../../assets/role image/employee.jpg";
// import Jobseeker from "../../assets/role image/jobseekers.jpg";
// import SearchBar from "../../components/search-bar/SearchBar";

// function Home() {
//   const token = Cookie.get("token");

//   return (
//     <div className="w-full h-screen grid place-items-center  ">
//       <div className="w-full h-20 ">
//         <Navbar />
//       </div>
//       <div className="w-full sm:w-[90%]  h-max  sm:h-4/5  flex flex-col items-center justify-center ">
//         <div className="w-full sm:h-4/5  flex flex-col sm:flex-row  items-start justify-center">
//           <div className=" w-full h-full   pl-5 sm:pl-0 flex flex-col items-start sm:items-center justify-center ">
//             <h1 className=" w-1/2 text-start  text-transparent  bg-gradient-to-tr from-zinc-500 to-zinc-900 bg-clip-text text-3xl sm:text-5xl font-bold py-2">
//               Land on your dream job with{" "}
//               <span className="text-4xl sm:text-5xl font-bold text-blue-600 ">
//                 Learnbuds
//               </span>
//             </h1>
//             <span className=" w-4/5 sm:w-1/2 text-sm opacity-60 mt-3">
//               Unlock your potential with the right opportunity. Connect with top
//               employers and take the next step in your career journey
//             </span>

//             {/* mobile view only */}
//             <div>
//               <Link
//                 to={"/jobs-list"}
//                 className="w-max h-9 text-white font-semibold bg-blue-600 rounded-lg px-5 mt-5 text-sm sm:hidden  grid place-items-center "
//               >
//                 Get started
//               </Link>
//             </div>

//             <div className=" w-full h-max  mt-8 hidden sm:flex  flex-col sm:flex-row items-start sm:items-center justify-center relative">
//               <SearchBar text={"search job..."} setSearchInput={() => {}} />
//               <Link
//                 to={token ? "/jobs-list" : "#sign-up"}
//                 className="w-max h-12 text-white font-semibold bg-blue-600 rounded-lg px-7 text-sm grid place-items-center sm:absolute right-24  "
//               >
//                 Find job
//               </Link>
//             </div>
//           </div>
//           <div className="w-full sm:w-1/2 h-full    ">
//             <img src={bg} alt="selection" className="h-full" />
//           </div>
//         </div>

//         <div className="w-full h-max sm:h-max  flex flex-col   gap-8 items-center justify-center ">
//           <div className="w-full text-center">
//             <h1 className="text-xl font-semibold">Choose your role</h1>
//           </div>
//           {token ? (
//             <div className="w-full pb-5 sm:pb-0 flex gap-6 flex-col sm:flex-row  items-center justify-center">
//               <CardRoleSelection role={"Employee"} image={Employee} />
//               <CardRoleSelection role={"Job seeker"} image={Jobseeker} />
//             </div>
//           ) : (
//             <div
//               className="w-full h-[30vh]   text-center flex gap-5 flex-col items-center justify-center"
//               id="sign-up"
//             >
//               <h1 className="text-lg    ">Sign in required</h1>
//               <div className="flex gap-5 ">
//                 <Link
//                   to={"/authentication/user-registration"}
//                   className="block text-black  text-center font-semibold px-5 py-1 border border-zinc-600  rounded-full shadow "
//                 >
//                   Sign up
//                 </Link>
//                 <Link
//                   to={"/authentication/user-login"}
//                   className="block text-black  text-center font-semibold px-5 py-1 border border-zinc-600  rounded-full shadow "
//                 >
//                   Sign in
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

import React, { useEffect } from "react";
import Navbar from "../../components/nav-bar/Navbar";
import CardRoleSelection from "../../components/card-role-selection/CardRoleSelection";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import bg from "../../assets/illustrations/home-1.png";
import Employee from "../../assets/role image/employee.jpg";
import Jobseeker from "../../assets/role image/jobseekers.jpg";
import SearchBar from "../../components/search-bar/SearchBar";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Home() {
  const token = Cookie.get("token");

  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.3, // Animation triggers when 20% of the component is in view
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full h-screen grid place-items-center  ">
      <div className="w-full h-20 ">
        <Navbar />
      </div>
      <div className="w-full sm:w-[90%] h-max sm:h-4/5 flex flex-col items-center justify-center ">
        <div className="w-full sm:h-4/5 flex flex-col sm:flex-row items-start justify-center">
          <div className="w-full h-full pl-5 sm:pl-0 flex flex-col items-start sm:items-center justify-center ">
            <h1 className="w-1/2 text-start text-transparent bg-gradient-to-tr from-zinc-500 to-zinc-900 bg-clip-text text-3xl sm:text-5xl font-bold py-2">
              Land on your dream job with{" "}
              <span className="text-4xl sm:text-5xl font-bold text-blue-600">
                Learnbuds
              </span>
            </h1>
            <span className="w-4/5 sm:w-1/2 text-sm opacity-60 mt-3">
              Unlock your potential with the right opportunity. Connect with top
              employers and take the next step in your career journey
            </span>

            {/* mobile view only */}
            <div>
              <Link
                to={"/jobs-list"}
                className="w-max h-9 text-white font-semibold bg-blue-600 rounded-lg px-5 mt-5 text-sm sm:hidden grid place-items-center"
              >
                Get started
              </Link>
            </div>

            <div className="w-full h-max mt-8 hidden sm:flex flex-col sm:flex-row items-start sm:items-center justify-center relative">
              <div className="w-1/2">
                <SearchBar text={"search job..."} setSearchInput={() => { }} />
              </div>
              <Link
                to={token ? "/jobs-list" : "#sign-up"}
                className="w-max h-12 text-white font-semibold bg-blue-600 rounded-lg px-7 text-sm grid place-items-center sm:absolute right-24"
              >
                Find job
              </Link>
            </div>
          </div>
          <div className="w-full sm:w-1/2 h-full">
            <img src={bg} alt="selection" className="h-full" />
          </div>
        </div>

        <div
          className="w-full h-max sm:h-max flex flex-col gap-8 items-center justify-center"
          ref={ref}
        >
          <div className="w-full text-center">
            <h1 className="text-xl font-semibold">Choose your role</h1>
          </div>
          {token ? (
            <motion.div
              className="w-full pb-5 sm:pb-0 flex gap-6 flex-col sm:flex-row items-center justify-center"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
            >
              <CardRoleSelection role={"Employee"} image={Employee} />
              <CardRoleSelection role={"Job seeker"} image={Jobseeker} />
            </motion.div>
          ) : (
            <motion.div
              className="w-full h-[30vh] text-center flex gap-5 flex-col items-center justify-center"
              id="sign-up"
              variants={cardVariants}
              initial="hidden"
              animate={controls}
            >
              <h1 className="text-lg">Sign in required</h1>
              <div className="flex gap-5">
                <Link
                  to={"/authentication/user-registration"}
                  className="block text-black text-center font-semibold px-5 py-1 border border-zinc-600 rounded-full shadow"
                >
                  Sign up
                </Link>
                <Link
                  to={"/authentication/user-login"}
                  className="block text-black text-center font-semibold px-5 py-1 border border-zinc-600 rounded-full shadow"
                >
                  Sign in
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
