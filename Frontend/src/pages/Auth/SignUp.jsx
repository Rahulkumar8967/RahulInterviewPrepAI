import React, { useState, useContext } from "react";
import Input from "../../components/Inputs/Input";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/userContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Handle Sign Up Function
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password) {
      return setError("All fields are required");
    }

    let profileImageUrl = "";

    try {
      setLoading(true);
      setError("");

      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageurl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("SignUp failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg p-7 mx-auto flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black mb-1 flex items-center gap-1">
        Create an Account 🚀
      </h3>
      <p className="text-sm text-slate-600 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Rahul Saini"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
          />

          <Input
            label="Email Address"
            placeholder="rahul@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <div className="relative">
            <Input
              label="Password"
              placeholder="Min 8 Characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
            />
            <div
              className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition cursor-pointer flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <SpinnerLoader size={20} color="#fff" /> : "SIGN UP"}
          </button>

          <p className="text-center text-10px mt-0 text-slate-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentPage("login")}
              className="text-blue-600 font-medium underline cursor-pointer"
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;