import React from "react";
import illustration from "../../assets/illustrations/landing-image.png";
import "../../index.css";

const LandingPage = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-tl from-zinc-100 to-zinc-100">
      <nav className="w-full h-20 sm:h-24  bg-transparent flex items-center justify-around">
        <div>
          <h1 className=" text-violet-900 text-xl sm:text-3xl font-bold">
            Learnbudds
          </h1>
          <p className="text-sm opacity-40">commnunity</p>
        </div>
        <div className="flex gap-10 items-center justify-center">
          <ul className="  hidden md:flex gap-5">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
            <li>
              <a href="#">Services</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
          <a
            href="/authentication/user-registration"
            className="block text-white font-semibold bg-violet-900 p-2 px-5 rounded-full"
          >
            Get started
          </a>
        </div>
      </nav>

      <section className="w-full h-screen bg-gradient-to-tl from-zinc-200 to-zinc-50  overflow-auto">
        <section className="w-full h-full sm:h-4/5  flex gap-8 flex-col sm:flex-row items-center justify-center">
          <div className="w-[90%] xs:w-full   sm:w-1/3 pl-4 xs:pl-12">
            <h1 className="w-max text-xs xs:text-sm sm:text-lg bg-gradient-to-r from-zinc-300 to-zinc-100 font-semibold px-4 py-1 rounded-full ">
              <span className=" text-violet-900">Learnbudds</span> commnunity
              app
            </h1>
            <h1 className="text-3xl font-semibold  mt-2 xs:mt-8">Welcome</h1>
            <p className="w-full sm:w-full text-sm  xs:text-base  text-zinc-800 opacity-65 mt-2">
              Connect, share, and grow with like-minded individuals in our
              vibrant community. Whether you’re looking to make new friends,
              join interest groups, or stay updated with local events,
              Learnbudds is your go-to platform.
            </p>

            <a  href="#platform-selection" className="  w-[40%] sm:w-1/2 h-10 font-semibold border border-zinc-500 p-1 px-2 grid place-items-center rounded-full mt-5">
              get started
            </a>
          </div>
          <div className=" w-4/5 xs:w-[95%] sm:w-1/3">
            <img src={illustration} alt="bg" />
          </div>
        </section>

        <section
          className="w-full h-full bg-transparent grid place-items-center mt-10 py-5"
          id="platform-selection"
        >
          <div className="w-[90%] h-[90%] rounded-lg shadow-sm flex gap-10 flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Select your platform</h1>
            <ul className="w-full sm:w-1/2   grid gap-5 sm:grid-cols-3 ">
              <li className="w-full  text-zinc-800 font-semibold hover:bg-violet-400   border-2 border-zinc-300  text-center p-2  py-3 rounded-lg hover:-translate-y-2 transition-transform cursor-pointer">
                <a className="block w-full h-full" href="">
                  Matrimony
                </a>
              </li>
              <li className="w-full  text-zinc-800 font-semibold hover:bg-violet-400   border-2 border-zinc-300  text-center p-2  py-3 rounded-lg hover:-translate-y-2 transition-transform cursor-pointer">
                <a className="block w-full h-full" href="">
                  Dating
                </a>
              </li>
              <li className="w-full  text-zinc-800 font-semibold hover:bg-violet-400   border-2 border-zinc-300  text-center p-2  py-3 rounded-lg hover:-translate-y-2 transition-transform cursor-pointer">
                <a className="block w-full h-full" href="/job-portal">
                  Job portal
                </a>
              </li>
              <li className="w-full  text-zinc-800 font-semibold hover:bg-violet-400   border-2 border-zinc-300  text-center p-2  py-3 rounded-lg hover:-translate-y-2 transition-transform cursor-pointer">
                <a className="block w-full h-full" href="">
                  Education
                </a>
              </li>
              <li className="w-full  text-zinc-800 font-semibold hover:bg-violet-400   border-2 border-zinc-300  text-center p-2  py-3 rounded-lg hover:-translate-y-2 transition-transform cursor-pointer">
                <a  className="block w-full h-full" href="https://studyabroadlv.netlify.app/">
                  Abroad
                </a>
              </li>
              <li className="w-full  text-zinc-800 font-semibold hover:bg-violet-400   border-2 border-zinc-300  text-center p-2  py-3 rounded-lg hover:-translate-y-2 transition-transform cursor-pointer">
                <a className="block w-full h-full" href="">
                  Ecommerce
                </a>
              </li>
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
};

export default LandingPage;
