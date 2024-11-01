/* eslint-disable no-unused-vars */
import React from "react";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/utils/constant";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Create an instance of axios with default config
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:8747',
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers if needed
          // 'Authorization': `Bearer ${token}`,
        }
      });

      const response = await axiosInstance.get('/api/logout');
      
      if (response.status === 200) {
        // Clear any stored tokens or session data
        localStorage.removeItem('token'); // If you're using token-based auth
        sessionStorage.clear();
        
        // Clear user info from the store
        setUserInfo(null);
        
        // Redirect to auth page
        navigate("/auth", { replace: true });
      } else {
        console.error("Logout failed:", response.status);
        // Optionally show an error message to the user
        alert("Logout failed. Please try again.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      
      // Handle specific error cases
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", err.response.data);
        console.error("Error status:", err.response.status);
      } else if (err.request) {
        // The request was made but no response was received
        console.error("No response received:", err.request);
        alert("Server not responding. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", err.message);
        alert("An error occurred during logout. Please try again.");
      }
      
      // Optionally force logout on frontend even if backend fails
      setUserInfo(null);
      navigate("/auth", { replace: true });
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between pl-5 pr-4 w-full bg-gray-800 z-50">
      <div className="flex gap-3 items-center justify-center">
        <div className="relative w-12 h-12">
          <Avatar className="w-full h-full rounded-full overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105">
            {userInfo?.image ? (
              <AvatarImage
                className="object-cover h-full w-full rounded-full"
                src={userInfo.image}
                alt="Profile Image"
              />
            ) : (
              <div
                className={`uppercase flex items-center justify-center h-full w-full rounded-full text-lg font-bold border-4 ${getColor(
                  userInfo?.color
                )}`}
              >
                {userInfo?.firstName
                  ? userInfo.firstName.charAt(0)
                  : userInfo?.email?.charAt(0)}
              </div>
            )}
          </Avatar>
        </div>
        <div className="text-white">
          {userInfo?.firstName && userInfo?.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-500 text-lg font-medium cursor-pointer hover:text-purple-400 transition-colors"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 border-none text-white">
              Edit Profile
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FontAwesomeIcon
                className="text-red-500 text-lg font-medium cursor-pointer hover:text-red-400 transition-colors"
                icon={faSignOutAlt}
                onClick={handleLogout}
              />
            </TooltipTrigger>
            <TooltipContent className="bg-gray-800 border-none text-white">
              Logout
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ProfileInfo;