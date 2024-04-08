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
  console.log(
    "matrimonialProfiles >>",
    matrimonialProfiles,
    "profileId >>",
    profileId
  );

  for (const profile of matrimonialProfiles) {
    if (profile._id === profileId) {
      return true;
    }
    return false;
  }
};
