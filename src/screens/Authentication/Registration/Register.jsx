import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import {
  Forms,
  CompanyForm,
  JobForm,
  ProfileForm,
} from "../../../components/form-components-1";
import { globalContext } from "../../../contexts/job-list-context/JobListContext";

function Register() {
  const { currentForm } = useContext(globalContext);
  const token = Cookies.get("token");
  return <main></main>;
}

export default Register;
