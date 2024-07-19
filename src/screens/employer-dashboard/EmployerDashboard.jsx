import { useContext, useEffect, useState } from "react";
import { JobPosting } from "../../components/form-components-1";
import Navbar from "../../components/nav-bar/Navbar";
import EmployerProfiePage from "../../components/proflle-page/employer-profile-page/EmployerProfiePage";
import JobAlerts from "../../components/job-alerts/JobAlerts";
import { globalContext } from "../../contexts/employer-details-context/EmployerDetailsContext";
import SideNavbar from "../../components/side-nav-bar/SideNavbar";

const EmployerDashboard = () => {
  const [currentSelected, setCurrentSelected] = useState(0);
  const { profileDetails } = useContext(globalContext);

  useEffect(() => {
    setCurrentSelected(parseInt(localStorage.getItem("side-link")));
  }, []);

  return (
    <div className=" w-full h-screen bg-gray-200 flex relative">
      <Navbar />
      <SideNavbar
        currentSelected={currentSelected}
        setCurrentSelected={setCurrentSelected}
      />
      <div className="w-4/5 h-full  border flex items-center justify-center ">
        <div className=" w-full h-full flex items-center justify-center ">
          {currentSelected === 0 && <EmployerProfiePage />}
          {currentSelected === 1 &&
            (profileDetails?.EmployerDetails ? (
              <JobAlerts />
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
              <JobPosting />
            ) : (
              <div>
                <p>Employer details unavailabe</p>
                <p className="text-blue-500 text-xs text-center mt-1">
                  please add employer details
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
