import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { UserCircle } from "lucide-react";

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      {user.profileImageUrl ? (
        <img
          src={user.profileImageUrl}
          alt={`${user.name || "User"}'s profile`}
          className="w-11 h-11 rounded-full object-cover border-2 border-blue-500 hover:border-blue-600 transition-colors cursor-pointer"
        />
      ) : (
        <UserCircle
          size={44} // Matches the 11 Tailwind units (44px)
          className="text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
        />
      )}

      <div>
        <div className="text-[15px] text-black font-bold leading-3">
          {user.name || "User"}
        </div>
        <button
          className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
