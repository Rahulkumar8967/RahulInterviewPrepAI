import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import HERO_IMG from "./img1.png";
import { App_FEATURES } from "../../utils/data";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import Model from "../../components/Model";
import { UserContext } from "../../context/userContext";
import ProfileInfoCard from "../../components/Cards/ProfileInfoCard";

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModel, setOpenAuthModel] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModel(true);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <>
      {/* Background and Hero Section */}
      <div className="w-full bg-[#FFFCEF] relative">
        <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0 z-0" />

        <div className="container mx-auto px-4 pt-6 pb-12 relative z-10">
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-black font-bold">
              Interview Prep AI
            </div>

            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer"
                onClick={() => setOpenAuthModel(true)}
              >
                Login / Sign Up
              </button>
            )}
          </header>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center md:gap-16">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles /> AI Powered
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-medium mb-8 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery – your ultimate interview toolkit is
                here.
              </p>

              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <section className="flex items-center justify-center py-8 bg-[#FFFCEF]">
        <img
          src={HERO_IMG}
          alt="Hero"
          className="w-full max-w-7xl md:w-[80vw] mx-auto rounded-lg"
        />
      </section>

      {/* Features Section */}
      <div className="w-full bg-[#FFFCEF]">
        <div className="container mx-auto px-4 pt-10 pb-8">
          <h2 className="text-2xl font-medium text-center mb-12 *:text-amber-800 hover:text-amber-600 transition-colors">
            <span className="text-amber-600">Features</span> That Make You Shine
          </h2>

          <div className="flex flex-col items-center gap-8">
            {/* First 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {App_FEATURES.slice(0, 3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                >
                  <h3 className="text-base font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Last 3 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {App_FEATURES.slice(3).map((feature) => (
                <div
                  key={feature.id}
                  className="bg-[#FFFEF8] p-6 rounded-xl shadow-sm hover:shadow-lg shadow-amber-100 transition border border-amber-100"
                >
                  <h3 className="text-base font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm text-pink-600 text-center py-4 mt-8 bg-blend-darken bg-gradient-to-r from-pink-100 to-pink-200">
        &copy; {new Date().getFullYear()} InterviewPrepAI. All rights reserved.
      </div>

      {/* Auth Modal */}
      {openAuthModel && (
        <Model isOpen={true} onClose={() => setOpenAuthModel(false)}>
          {currentPage === "login" ? (
            <Login setCurrentPage={setCurrentPage} />
          ) : (
            <SignUp setCurrentPage={setCurrentPage} />
          )}
        </Model>
      )}
    </>
  );
};

export default LandingPage;
