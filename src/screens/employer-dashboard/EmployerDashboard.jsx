import { useContext, useEffect, useState } from "react";
import { JobPosting } from "../../components/form-components-1";
import Navbar from "../../components/nav-bar/Navbar";
import EmployerProfiePage from "../../components/proflle-page/employer-profile-page/EmployerProfiePage";
import JobAlerts from "../../components/job-alerts/JobAlerts";
import { globalContext } from "../../contexts/employer-details-context/EmployerDetailsContext";
import SideNavbar from "../../components/side-nav-bar/SideNavbar";
import EmployerRequestPage from "../../components/employer-request/EmployerRequestPage";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const { profileDetails } = useContext(globalContext);

  useEffect(() => {
    setCurrentSelected(parseInt(localStorage.getItem("side-link")));
  }, []);

  return (
    <div className=" w-full h-screen bg-white flex relative">
      <Navbar />
      <SideNavbar
        currentSelected={currentSelected}
        setCurrentSelected={setCurrentSelected}
      />
      <div className=" w-full sm:w-4/5 h-full   flex items-center justify-center overflow-auto ">
        <div className=" w-full h-full flex items-center justify-center ">
          {currentSelected === 0 && <EmployerProfiePage />}
          {currentSelected === 1 &&
            (profileDetails?.EmployerDetails ? (
              profileDetails?.verified ? (
                <JobAlerts />
              ) : (
                <div className="text-center">
                  <h1 className="text-lg font-semibold">
                    Please verify your profile
                  </h1>
                  <p className="text-sm opacity-75">
                    you can post jobs by getting verified badge or verification
                  </p>
                  <Link
                    to={"/authentication/verification-form"}
                    className="block text-blue-600 mt-5"
                  >
                    click here to verify your profile
                  </Link>
                </div>
              )
            ) : (
              <div>
                <p>Employer details unavailabe</p>
                <p className="text-blue-500 text-xs text-center mt-1">
                  please add employer details
                </p>
              </div>
            ))}
          {currentSelected === 2 &&
            (profileDetails?.EmployerDetails ? (
              profileDetails?.verified ? (
                <JobPosting />
              ) : (
                <div className="text-center">
                  <h1 className="text-lg font-semibold">
                    Please verify your profile
                  </h1>
                  <p className="text-sm opacity-75">
                    you can post jobs by getting verified badge or verification
                  </p>
                  <Link
                    to={"/authentication/verification-form"}
                    className="block text-blue-600 mt-5"
                  >
                    click here to verify your profile
                  </Link>
                </div>
              )
            ) : (
              <div>
                <p>Employer details unavailabe</p>
                <p className="text-blue-500 text-xs text-center mt-1">
                  please add employer details
                </p>
              </div>
            ))}
          {currentSelected === 3 && <EmployerRequestPage />}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
