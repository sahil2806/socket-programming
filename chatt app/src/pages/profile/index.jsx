/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { useRef, useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { colors, getColor } from "../../utils/constant.js";

const Profile = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Profile fields state
  const [firstName, setFirstName] = useState(userInfo?.firstName || "");
  const [lastName, setLastName] = useState(userInfo?.lastName || "");
  const [color, setColor] = useState(userInfo?.color || 0);
  const [image, setImage] = useState(userInfo?.image || "");

  // Function to upload image to Cloudinary with proper error handling
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    //formData.append("api_key", import.meta.env.VITE_CLOUDINARY_API_KEY);
    
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    try {
      const response = await axios.post(uploadUrl, formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          // You could add a loading state here if desired
          console.log(`Upload Progress: ${percentCompleted}%`);
        },
      });

      if (response.data && response.data.secure_url) {
        console.log('Upload successful:', response.data);
        return response.data.secure_url;
      } else {
        throw new Error('Upload response missing secure_url');
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      
      // More specific error messages based on the error type
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error("Unauthorized: Please check your Cloudinary credentials");
            break;
          case 413:
            toast.error("File too large: Please choose a smaller image");
            break;
          default:
            toast.error(`Upload failed: ${error.response.data.error?.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        toast.error("Network error: Please check your internet connection");
      } else {
        toast.error("Upload failed: " + error.message);
      }
      return null;
    }
  };

  // Update Profile Picture
  const updateProfilePicture = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, SVG, or WebP)");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    toast.info("Uploading image...");
    const imageUrl = await uploadImageToCloudinary(file);
    
    if (imageUrl) {
      setImage(imageUrl);
      setUserInfo({ ...userInfo, image: imageUrl });
      toast.success("Profile picture updated successfully");
    }
  };

  const deleteProfilePicture = async () => {
    try {
      setImage("");
      setUserInfo({ ...userInfo, image: "" });

      // update profile

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      toast.success("Profile picture removed");
    } catch (error) {
      console.error("Error removing profile picture:", error);
      toast.error("Failed to remove profile picture");
    }
  };

  const validateProfile = () => {
    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();

    if (!trimmedFirstName) {
      toast.error("First Name is required");
      return false;
    }
    if (!trimmedLastName) {
      toast.error("Last Name is required");
      return false;
    }
    if (color < 0) {
      toast.error("Please select a color");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    console.log(firstName)
    console.log(lastName)
    console.log(image)
    if (validateProfile()) {
      try {
        const response = await axios.post(
          "http://localhost:8747/api/update-profile",
          { firstName: firstName.trim(), lastName: lastName.trim(), color, image },
          { withCredentials: true }
        );

        if (response.data?.data?._id) {
          setUserInfo(response.data.data);
          navigate(response.data.data.defaultProfile === false ? '/profile' : '/chat');
          toast.success("Profile updated successfully");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(error.response?.data?.message || "Failed to update profile");
      }
    }
  };

  const handleBackButton = () => {
    if (!userInfo.defaultProfile) {
      toast.error("Please complete your profile setup");
    } else {
      navigate("/chat");
    }
  };

  if (!userInfo) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-gray-900 p-4 sm:p-6">
      <div className="flex w-full rounded-xl flex-col gap-6 sm:gap-8 lg:w-2/3 xl:w-1/2 bg-white shadow-lg p-6 sm:p-8">
        <div
          onClick={handleBackButton}
          className="flex items-center justify-center w-12 h-12 bg-indigo-500 hover:bg-indigo-600 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-md"
        >
          <IoArrowBackCircle className="text-white w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8" />
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 flex items-center justify-center mx-auto border-4 border-indigo-500 rounded-full bg-gray-200"
          >
            <Avatar className="w-full h-full rounded-full overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105">
              {image ? (
                <AvatarImage
                  className="object-cover h-full w-full"
                  src={image}
                  alt="Profile"
                />
              ) : (
                <div
                  className={`flex items-center justify-center h-full w-full rounded-full text-4xl font-bold border-4 ${getColor(
                    color
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0).toUpperCase()
                    : userInfo.email.charAt(0).toUpperCase()}
                </div>
              )}
            </Avatar>
            
            {hovered && (
              <div
                onClick={image ? deleteProfilePicture : () => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 cursor-pointer"
              >
                {image ? (
                  <FaTrash className="text-3xl text-white hover:text-indigo-300" />
                ) : (
                  <FaPlusCircle className="text-3xl text-white hover:text-indigo-300" />
                )}
              </div>
            )}
            
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={updateProfilePicture}
              accept=".png,.jpg,.jpeg,.svg,.webp"
            />
          </div>

          <div className="flex flex-col gap-4 sm:gap-5 items-center w-full">
            <Input
              type="email"
              value={userInfo.email}
              className="rounded-xl px-4 py-5 border border-gray-300 bg-gray-100"
              readOnly
            />
            
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded-xl px-4 py-5 border border-gray-300"
              placeholder="First Name"
            />
            
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded-xl px-4 py-5 border border-gray-300"
              placeholder="Last Name"
            />

            <div className="w-full flex justify-evenly gap-2 mt-4 lg:justify-between items-center">
              {colors.map((c, index) => (
                <div
                  key={index}
                  className={`rounded-full h-10 w-10 cursor-pointer transition-transform duration-300 transform hover:scale-110 ${c} ${
                    color === index ? "outline outline-indigo-500 outline-4 shadow-md" : ""
                  }`}
                  onClick={() => setColor(index)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={handleSubmit}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;