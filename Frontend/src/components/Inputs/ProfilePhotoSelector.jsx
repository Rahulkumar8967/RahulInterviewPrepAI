import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // Cleanup object URL to prevent memory leaks
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(url);
      }
      setPreviewUrl(url);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex flex-col items-center mb-5">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!image ? (
        <div className="w-24 h-24 rounded-full border border-gray-300 flex items-center justify-center bg-gray-100 mb-2">
          <LuUser className="text-gray-400 text-4xl" />
        </div>
      ) : (
        <div className="relative w-24 h-24 mb-2">
          <img
            src={preview || previewUrl}
            alt="profile"
            className="w-full h-full object-cover rounded-full border"
          />
          <button
            type="button"
            className="absolute -top-2 -right-2 bg-white border rounded-full p-1 shadow-md"
            onClick={handleRemoveImage}
            title="Remove"
          >
            <LuTrash className="text-red-500" />
          </button>
        </div>
      )}

      <button
        type="button"
        className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:underline cursor-pointer"
        onClick={onChooseFile}
      >
        <LuUpload size={18} className="cursor-pointer" />
        {image ? "Change Photo" : "Upload Photo"}
      </button>
    </div>
  );
};

export default ProfilePhotoSelector;
