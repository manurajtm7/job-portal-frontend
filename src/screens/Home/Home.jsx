import React from "react";
import Navbar from "../../components/nav-bar/Navbar";
import CardRoleSelection from "../../components/card-role-selection/CardRoleSelection";
import Employee from "../../assets/role image/employee.jpg";
import Jobseeker from "../../assets/role image/jobseekers.jpg";
import Cookie from "js-cookie";
import { Link } from "react-router-dom";
import bg from "../../assets/illustrations/seeker.png";

function Home() {
  const token = Cookie.get("token");

  return (
    <div className="w-full h-screen grid place-items-center ">
      <Navbar />
      <div className="w-4/5 h-4/5">
        <div className="w-full h-1/2   flex  items-start justify-center">
          <div className=" w-full h-full  flex items-center justify-center ">
            <h1
              className=" text-transparent bg-gradient-to-tr from-zinc-500 to-zinc-900 bg-clip-text text-5xl font-bold py-2"
            >
              Land on your dream job
            </h1>
            {/* <p className="w-4/5 text-white opacity-60 text-center ">
              we connect job seekers with top employers to create opportunities
              for career growth and success. Whether you're looking for your
              first job, a career change, or your next big opportunity, our
              platform is designed to help you find the perfect match.
            </p> */}
          </div>
          {/* <div className="w-1/2 h-full    ">
            <img src={bg} alt="selection" className="h-full" />
          </div> */}
        </div>
        <div className="w-full text-center">
          <h1 className="text-xl font-semibold">Choose your role</h1>
        </div>
        <div className="w-full h-1/3  flex flex-col sm:flex-row  gap-8 items-center justify-center ">
          {token ? (
            <>
              <CardRoleSelection role={"Employee"} image={Employee} />
              <CardRoleSelection role={"Job seeker"} image={Jobseeker} />
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-lg  font-semibold">Sign in required</h1>
              <Link
                to={"/authentication/user-registration"}
                className="text-xs text-blue-700 text-center"
              >
                Click here to sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
