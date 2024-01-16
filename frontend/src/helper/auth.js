const getCookie = (name) => {
  let cookies = document.cookie.split(";");
  
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());

    if (cookieName == "accessToken") {
      return cookieValue;
    }
  }
  return null;
};

export { getCookie };
