import { Route, Routes } from "react-router-dom";
import Register from "./screens/Authentication/Registration/Register";
import JobsLists from "./screens/job-search-list/JobsLists";
import JobAllData from "./screens/job-all-info/JobAllData";
import { JobListContext } from "./contexts/job-list-context/JobListContext";
import {
  Forms,
  ProfileForm,
  CompanyForm,
  JobForm,
  VerificationForm,
  UpdateProfileDetails,
} from "./components/form-components-1";
import { ApplicationContext } from "./contexts/application-list-context/ApplicationListContext";
import { EmployerDetilsContext } from "./contexts/employer-details-context/EmployerDetailsContext";

import Home from "./screens/Home/Home";
import EmployerDashboard from "./screens/employer-dashboard/EmployerDashboard";
import Login from "./screens/Authentication/Login/Login";
import JobAlertAlllInfo from "./screens/job-alert-all-info/JobAlertAlllInfo";
import EmployerViewProfile from "./screens/Profile/employer-view-profile/EmployerViewProfile";
import ProfileView from "./screens/Profile/job-seeker-profile/ProfileView";
import LandingPage from "./screens/landing-page/LandingPage";
import Community from "./screens/community/Community";
import UserProfileView from "./screens/Profile/profile-view/UserProfileView";
import { ChatProvider } from "./contexts/chat-context/ChatContext";
import AlertScreen from "./screens/alerts-screen/AlertScreen";
import { AlertProvider } from "./contexts/alerts-context/AlertContext";

function App() {
  return (
    <main className="w-full h-screen text-zinc-900  bg-white">
      <JobListContext>
        <ApplicationContext>
          <EmployerDetilsContext>
            <ChatProvider>
              <AlertProvider>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/job-portal" element={<Home />} />
                  <Route path="/jobs-list" element={<JobsLists />} />
                  <Route path="/authentication" element={<Register />} />
                  <Route
                    path="/authentication/user-login"
                    element={<Login />}
                  />
                  <Route
                    path="/employer-dashboard"
                    element={<EmployerDashboard />}
                  />
                  <Route
                    path="/authentication/job-form"
                    element={<JobForm />}
                  />
                  <Route
                    path="/authentication/user-registration"
                    element={<Forms />}
                  />
                  <Route
                    path="/authentication/verification-form"
                    element={<VerificationForm />}
                  />
                  <Route path="/:id" element={<JobAllData />} />

                  <Route
                    path="/authentication/user-profile"
                    element={<ProfileForm />}
                  />
                  <Route
                    path="/authentication/update-profile"
                    element={<UpdateProfileDetails />}
                  />
                  <Route
                    path="/authentication/company-form"
                    element={<CompanyForm />}
                  />
                  <Route
                    path="/job-alert-info/:id"
                    element={<JobAlertAlllInfo />}
                  />
                  <Route
                    path="/employe-view-profile/:id"
                    element={<EmployerViewProfile />}
                  />
                  <Route
                    path="/view-profile/:id"
                    element={<UserProfileView />}
                  />
                  <Route path="/profile" element={<ProfileView />} />

                  <Route path="/community" element={<Community />} />
                  <Route path="/alerts" element={<AlertScreen />} />
                </Routes>
              </AlertProvider>
            </ChatProvider>
          </EmployerDetilsContext>
        </ApplicationContext>
      </JobListContext>
    </main>
  );
}

export default App;
