import './App.css';
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Emailverification from "./pages/Emailverification";
import OtpVerification from "./pages/Otpverification";
import SetPassword from "./pages/Setpassword";
import Dashboard from "./pages/Dasboard";
import Playgame from "./pages/Playgame";
import Winner from "./pages/Winner";
import Wallet from "./pages/Wallet";
import Paypalsuccess from "./pages/Paypalsuccess";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Entryconfirm from "./pages/Entryconfirm";
import Waiting from "./pages/Waiting";
import Gamestarted from "./pages/Gamestarted";
import Restartgame from "./pages/Restartgame";
import Pickball from "./pages/Pickball";
import UpdatePassword from "./pages/Updatepassword";
import Termsandconditions from "./pages/Termsandconditions";
import Editprofile from "./pages/Editprofile";
import Editpassword from "./pages/Editpassword";
import Deleteaccount from "./pages/Deleteaccount";
import Contactus from "./pages/Contactus";
import History from "./pages/History";
import endpoint from './Endpointurl';
import Paypalcancel from "./pages/Paypalcancel";

function App() {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);

  //   const token = urlParams.get('token');

  //   console.log("main main", token);

  //   if (token) {
  //     navigate(`${endpoint}wallet`);
  //   }
  // }, []);

  return (
    <>
      <Routes>
        <Route path={`${endpoint}`} element={<Login />} />
        <Route path={`${endpoint}signup`} element={<Signup />} />
        <Route path={`${endpoint}emailverification`} element={<Emailverification />} />
        <Route path={`${endpoint}otpverification`} element={<OtpVerification />} />
        <Route path={`${endpoint}setpassword`} element={<SetPassword />} />
        <Route path={`${endpoint}dashboard`} element={<Dashboard />} />
        <Route path={`${endpoint}playgame`} element={<Playgame />} />
        <Route path={`${endpoint}winner`} element={<Winner />} />
        <Route path={`${endpoint}wallet`} element={<Wallet />} />
        <Route path={`${endpoint}success`} element={<Paypalsuccess />} />
        <Route path={`${endpoint}privacypolicy`} element={<PrivacyPolicy />} />
        <Route path={`${endpoint}termsconditions`} element={<TermsConditions />} />
        <Route path={`${endpoint}updatepassword`} element={<UpdatePassword />} />
        <Route path={`${endpoint}termsandconditions`} element={<Termsandconditions />} />
        <Route path={`${endpoint}history`} element={<History />} />
        <Route path={`${endpoint}entryconfirm`} element={<Entryconfirm />} />
        <Route path={`${endpoint}waiting`} element={<Waiting />} />
        <Route path={`${endpoint}gamestarted`} element={<Gamestarted />} />
        <Route path={`${endpoint}restart`} element={<Restartgame />} />
        <Route path={`${endpoint}pickball`} element={<Pickball />} />
        <Route path={`${endpoint}editprofile`} element={<Editprofile />} />
        <Route path={`${endpoint}changepassword`} element={<Editpassword />} />
        <Route path={`${endpoint}deleteaccount`} element={<Deleteaccount />} />
        <Route path={`${endpoint}contactus`} element={<Contactus />} />
        <Route path={`${endpoint}cancel`} element={<Paypalcancel />} />  
      </Routes>
    </>
  );
}

export default App;
