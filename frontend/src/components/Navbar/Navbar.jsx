import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLoggedIn, setShowNavbar } from "../../features/auth/authSlice";
import { useDropdownContext } from "../../context/DropdownContext";
import CloseIcon from "@mui/icons-material/Close";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdownContext();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth, loggedInUserDetails, showNavbar } = useSelector(
    (store) => store.auth
  );

  const handleShowNavbar = () => {
    dispatch(setShowNavbar(!showNavbar));
  };

  const Hamburger = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="24"
      viewBox="0 0 52 24"
    >
      <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
        <rect
          id="Rectangle_3"
          data-name="Rectangle 3"
          width="42"
          height="4"
          rx="2"
          transform="translate(304 47)"
          fill="#000"
        />
        <rect
          id="Rectangle_5"
          data-name="Rectangle 5"
          width="42"
          height="4"
          rx="2"
          transform="translate(304 67)"
          fill="#000"
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width="52"
          height="4"
          rx="2"
          transform="translate(294 57)"
          fill="#000"
        />
      </g>
    </svg>
  );

  const handleLogout = async () => {
    console.log("logout");
    try {
      let response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(response.message);
        dispatch(setIsLoggedIn(false));
      }
    } catch (error) {
      console.log("Error while logout ", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setShowNavbar(false));
    };
    window.addEventListener("scroll", handleScroll);

    // Close Drop Down
    closeDropdown();

    // Close Navbar
    dispatch(setShowNavbar(false));

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navigate, location]);

  return (
    <nav>
      <div className="container">
        <NavLink to="/">
          <div className="logo">
            <img className="logo-img" src={Logo} alt="Logo" />
          </div>
        </NavLink>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          {showNavbar && (
            <h1 className="close-Nav" onClick={handleShowNavbar}>
              <CloseIcon />
            </h1>
          )}
          <div className="navbar-item-wrapper">
            <ul>
              {isAuth && (
                <li className="navbar-item">
                  <NavLink to="/home">Home</NavLink>
                </li>
              )}
              <li className="navbar-item">
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/contact">Contact Us</NavLink>
              </li>
              {isAuth && (
                <>
                  <li
                    className="navbar-item dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {showNavbar ? (
                      <li
                        className="openNav-li-dropdown"
                        onClick={() => {
                          showNavbar && toggleDropdown();
                        }}
                      >
                        Management Loby
                      </li>
                    ) : (
                      <a>Management Loby</a>
                    )}
                    {isOpen && (
                      <div className="dropdown-content">
                        <ul>
                          <li className="navbar-item">
                            <NavLink to="/account-committee">
                              Account Committee
                            </NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/education-committee">
                              Education Committee
                            </NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/it-committee">IT Committee</NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/festival-committee">
                              Festival Committee
                            </NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/mahila-committee">
                              Mahila Committee
                            </NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/yuvak-committee">
                              Yuvak Committee
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/matrimonial">Matrimonial</NavLink>
                  </li>
                  <li
                    className="navbar-item dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    {showNavbar ? (
                      <li
                        className="openNav-li-dropdown"
                        onClick={() => {
                          showNavbar && toggleDropdown();
                        }}
                      >
                        Business
                      </li>
                    ) : (
                      <a>Business</a>
                    )}
                    {isOpen && (
                      <div className="dropdown-content">
                        <ul>
                          <li className="navbar-item">
                            <NavLink to="/business-package">
                              Add Business
                            </NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/business">Businesses</NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/job-posting">Job</NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/festivals" end>
                      Festivals
                    </NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/donation" end>
                      Donation List
                    </NavLink>
                  </li>
                  {loggedInUserDetails && (
                    <>
                      <li
                        className="navbar-item dropdown"
                        onMouseEnter={toggleDropdown}
                        onMouseLeave={closeDropdown}
                      >
                        {showNavbar ? (
                          <li
                            className="openNav-li-dropdown"
                            onClick={() => {
                              showNavbar && toggleDropdown();
                            }}
                          >
                            Profiles
                          </li>
                        ) : (
                          <a>Profiles</a>
                        )}
                        {isOpen && (
                          <div className="dropdown-content">
                            <ul>
                              <li className="navbar-item">
                                <NavLink
                                  to={`/profile/${loggedInUserDetails.decoded._id}`}
                                >
                                  My Profile
                                </NavLink>
                              </li>
                              {loggedInUserDetails?.myBusiness > 0 && (
                                <>
                                  <li className="navbar-item">
                                    <NavLink to={`my-business`}>
                                      My Business
                                    </NavLink>
                                  </li>
                                </>
                              )}
                              {loggedInUserDetails?.decoded?.isAdmin ==
                                "true" && (
                                <li className="navbar-item">
                                  <NavLink to={`/admin`}>Admin</NavLink>
                                </li>
                              )}
                              {loggedInUserDetails?.matrimonialProfiles
                                ?.length > 0 && (
                                <>
                                  <li className="matrimonialProfile-navbar">
                                    <p>Matrimonial Profile</p>
                                  </li>
                                  {loggedInUserDetails?.matrimonialProfiles.map(
                                    (matrimonialProfileUser) => (
                                      <li
                                        className="navbar-item"
                                        key={matrimonialProfileUser._id}
                                      >
                                        <NavLink
                                          to={`matrimonial-profile/${matrimonialProfileUser._id}`}
                                        >
                                          {matrimonialProfileUser.fullName}
                                        </NavLink>
                                      </li>
                                    )
                                  )}
                                </>
                              )}
                            </ul>
                          </div>
                        )}
                      </li>
                    </>
                  )}
                  <li className="logout-btn">
                    <Button
                      style={{ background: "rgb(233 135 0)" }}
                      size="small"
                      variant="contained"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </li>
                </>
              )}
              {!isAuth && (
                <>
                  <li className="navbar-item">
                    <NavLink to="/privacy-policy">Privacy Policy</NavLink>
                  </li>
                  <li className="li-btn">
                    <NavLink to="/login">
                      <Button
                        className="login-btn"
                        style={{
                          background: "rgb(233 135 0)",
                          marginLeft: "30px",
                          padding: "6px 40px",
                          fontWeight: "600",
                          letterSpacing: "1px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                        size="small"
                        variant="contained"
                      >
                        <LoginIcon style={{ marginRight: "15px" }} />
                        Login
                      </Button>
                    </NavLink>
                  </li>
                  <li className="li-btn">
                    <NavLink to="/register">
                      <Button
                        size="small"
                        className="register-btn"
                        style={{
                          background: "#f3f3f3",
                          border: "1px solid rgb(233 135 0)",
                          color: "rgb(233 135 0)",
                          padding: "6px 50px",
                          fontWeight: "600",
                          letterSpacing: "1px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <PersonIcon style={{ marginRight: "15px" }} />
                        Register
                      </Button>
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
