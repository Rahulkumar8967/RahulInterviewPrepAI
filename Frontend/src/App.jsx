import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/InterviewPrep/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";
import userProvider from "./context/userContext";

//  image upload problem in signup, load more question functionality in future
const App = () => {
  return (
    <userProvider>
    <div>
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<LandingPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/interview-prep/:sessionId"
            element={<InterviewPrep />}
          />
          
        </Routes>
      </Router>


      <Toaster
        toastOptions={
          {
            className: "",
            style: {
              fontSize:"13px"
            },
          }}   
      />
    </div>
    </userProvider>
  );
};

export default App;
