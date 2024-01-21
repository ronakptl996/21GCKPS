import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo.png";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { setIsLoggedIn } from "../../features/auth/authSlice";
import { useDropdownContext } from "../../context/DropdownContext";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const { isOpen, toggleDropdown, closeDropdown } = useDropdownContext();

  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((store) => store.auth);

  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const Hamburger = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
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
          fill="#574c4c"
        />
        <rect
          id="Rectangle_5"
          data-name="Rectangle 5"
          width="42"
          height="4"
          rx="2"
          transform="translate(304 67)"
          fill="#574c4c"
        />
        <rect
          id="Rectangle_4"
          data-name="Rectangle 4"
          width="52"
          height="4"
          rx="2"
          transform="translate(294 57)"
          fill="#574c4c"
        />
      </g>
    </svg>
  );

  const handleLogout = async () => {
    console.log("logout");
    try {
      let response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();

      if (data.success) {
        toast.success(response.message);
        dispatch(setIsLoggedIn(false));
      }
    } catch (error) {
      console.log("Error while logout ", error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShowNavbar(false);
    });
  }, []);

  useEffect(() => {
    closeDropdown();
  }, [location]);

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img className="logo-img" src={Logo} alt="Logo" />
        </div>
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
              <li className="navbar-item">
                <NavLink to="/">Home</NavLink>
              </li>
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
                    <NavLink to="#">Management Loby</NavLink>
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
                  {/* <li className="navbar-item">
                    <NavLink to="/business">Business</NavLink>
                  </li> */}
                  <li
                    className="navbar-item dropdown"
                    onMouseEnter={toggleDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <NavLink to="#">Business</NavLink>
                    {isOpen && (
                      <div className="dropdown-content">
                        <ul>
                          <li className="navbar-item">
                            <NavLink to="/business">Add Business</NavLink>
                          </li>
                          <li className="navbar-item">
                            <NavLink to="/education-committee">
                              Businesses
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    )}
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/job-posting">Job</NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/festivals">Festivals</NavLink>
                  </li>
                  <li className="navbar-item">
                    <NavLink to="/donation">Donation List</NavLink>
                  </li>
                  <li>
                    <Button
                      style={{ background: "rgb(233 135 0)" }}
                      size="small"
                      variant="contained"
                      onClick={handleLogout}
                    >
                      {/* <FontAwesomeIcon
                        icon="fa-regular fa-user"
                        style={{ color: "#ffffff" }}
                      />{" "} */}
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
                  <li>
                    <NavLink to="/login">
                      <Button
                        style={{ background: "rgb(233 135 0)" }}
                        size="small"
                        variant="contained"
                      >
                        {/* <FontAwesomeIcon
                          icon="fa-regular fa-user"
                          style={{ color: "#ffffff" }}
                        />{" "} */}
                        Login
                      </Button>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">
                      <Button
                        size="small"
                        style={{
                          border: "1px solid rgb(233 135 0)",
                          color: "rgb(233 135 0)",
                        }}
                      >
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
      {/* </nav> */}
    </nav>
  );
};

export default Navbar;
