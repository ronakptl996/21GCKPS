import { toast } from "react-toastify";

export const dobFormat = (date) => {
  const birthdate = new Date(date);

  const currentDate = new Date();
  const age = currentDate.getUTCFullYear() - birthdate.getUTCFullYear();
  if (
    currentDate.getUTCMonth() < birthdate.getUTCMonth() ||
    (currentDate.getUTCMonth() === birthdate.getUTCMonth() &&
      currentDate.getUTCDate() < birthdate.getUTCDate())
  ) {
    return age - 1;
  } else {
    return age;
  }
};

export const indiaTimeFormat = (time) => {
  const utcDate = new Date(time);
  const istDateString = utcDate.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  return istDateString.split(",")[0];
};

export const isMatrimonialProfile = (matrimonialProfiles, profileId) => {
  console.log("isMatrimonialProfile >>>", matrimonialProfiles);
  console.log("isMatrimonialProfile >>>", profileId);
  for (const profile of matrimonialProfiles) {
    if (profile._id === profileId) {
      return true;
    }
  }
  return false;
};

// Validate Image type
export const validateImageType = (file) => {
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  return allowedImageTypes.includes(file.type);
};

// image validation
export const handleImageFileValidation = (event, setAvatarFunction) => {
  const file = event.target.files[0];
  if (!file) {
    toast.error("No file selected");
    return;
  }

  // Validate image type
  if (!validateImageType(file)) {
    toast.error(
      "Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed."
    );
    return;
  }
  setAvatarFunction(file);
};

let timeout;
export const debounce = (func, wait) => {
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
