import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import "./index.css";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import MainLoby from "./pages/ManagementLoby/MainLoby";
import AccountCommittee from "./pages/ManagementLoby/AccountCommittee";
import EducationCommittee from "./pages/ManagementLoby/EducationCommittee";
import ItCommittee from "./pages/ManagementLoby/ItCommittee";
import FestivalCommittee from "./pages/ManagementLoby/FestivalCommittee";
import MahilaCommittee from "./pages/ManagementLoby/MahilaCommittee";
import YuvakCommittee from "./pages/ManagementLoby/YuvakCommittee";
import Matrimonial from "./pages/Matrimonial/Matrimonial";
import Job from "./pages/Job";
import JobPoster from "./pages/JobPoster";
import Contact from "./pages/Contact";
import JobSeeker from "./pages/JobSeeker";
import About from "./pages/About";
import DonationPage from "./pages/DonationPage";
import DonationInfo from "./pages/DonationInfo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Festival from "./pages/Festival";
import EventDetails from "./pages/EventDetails";
import AdminLayout from "./pages/AdminLayout";
import AdminHome from "./pages/AdminPages/AdminHome/AdminHome";
import AdminGuest from "./pages/AdminPages/AdminGuest/AdminGuest";
import AdminCommittee from "./pages/AdminPages/AdminCommittee/AdminCommittee";
import AdminDonation from "./pages/AdminPages/AdminDonation/AdminDonation";
import AdminFestival from "./pages/AdminPages/AdminFestival/AdminFestival";
import AdminAddJobPosting from "./pages/AdminPages/AdminAddJobPosting/AdminAddJobPosting";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./components/ProtectedRoute/AdminProtectedRoute";
import CreateMatrimonialProfile from "./pages/Matrimonial/CreateMatrimonialProfile/CreateMatrimonialProfile";
import MatrimonialProfiles from "./pages/Matrimonial/MatrimonialProfiles/MatrimonialProfiles";
import DetailMatrimonialProfile from "./pages/Matrimonial/DetailMatrimonialProfile/DetailMatrimonialProfile";
import Business from "./pages/BusinessPage/Business";
import BusinessDetail from "./pages/BusinessDetail/BusinessDetail";
import BusinessPackages from "./pages/BusinessPackages/BusinessPackages";
import { DropdownProvider } from "./context/DropdownContext";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import VillageWiseFamilyDetails from "./pages/Village/VillageWiseFamilyDetails/VillageWiseFamilyDetails";
import Email from "./pages/Email";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route exact path="/" element={<Layout />}>
        <Route path="" element={<Landing />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile/:id"
          element={
            ///////////////////
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="paymentsuccess"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        />
        <Route path="village">
          <Route path=":villageName">
            <Route
              path=""
              element={
                <ProtectedRoute>
                  <VillageWiseFamilyDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path=":id"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
        </Route>
        <Route path="about" element={<About />} />
        <Route path="email" element={<Email />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="contact" element={<Contact />} />
        <Route
          path="main-loby"
          element={
            <ProtectedRoute>
              <MainLoby />
            </ProtectedRoute>
          }
        />
        <Route
          path="account-committee"
          element={
            <ProtectedRoute>
              <AccountCommittee />
            </ProtectedRoute>
          }
        />
        <Route path="business">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Business />
              </ProtectedRoute>
            }
          />
          <Route
            path=":businessID"
            element={
              <ProtectedRoute>
                <BusinessDetail />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route
          path="business-package"
          element={
            <ProtectedRoute>
              <BusinessPackages />
            </ProtectedRoute>
          }
        />
        <Route
          path="education-committee"
          element={
            <ProtectedRoute>
              <EducationCommittee />
            </ProtectedRoute>
          }
        />
        <Route
          path="it-committee"
          element={
            <ProtectedRoute>
              <ItCommittee />
            </ProtectedRoute>
          }
        />
        <Route
          path="festival-committee"
          element={
            <ProtectedRoute>
              <FestivalCommittee />
            </ProtectedRoute>
          }
        />
        <Route
          path="mahila-committee"
          element={
            <ProtectedRoute>
              <MahilaCommittee />
            </ProtectedRoute>
          }
        />
        <Route
          path="yuvak-committee"
          element={
            <ProtectedRoute>
              <YuvakCommittee />
            </ProtectedRoute>
          }
        />
        <Route
          path="matrimonial"
          element={
            <ProtectedRoute>
              <Matrimonial />
            </ProtectedRoute>
          }
        />
        <Route path="matrimonial-profile">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <MatrimonialProfiles />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <DetailMatrimonialProfile />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="create-matrimonial-profile"
          element={
            <ProtectedRoute>
              <CreateMatrimonialProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="job-posting"
          element={
            <ProtectedRoute>
              <Job />
            </ProtectedRoute>
          }
        />
        <Route
          path="job-poster"
          element={
            <ProtectedRoute>
              <JobPoster />
            </ProtectedRoute>
          }
        />
        <Route
          path="job-seeker"
          element={
            <ProtectedRoute>
              <JobSeeker />
            </ProtectedRoute>
          }
        />
        <Route path="donation">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <DonationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <ProtectedRoute>
                <DonationInfo />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="festivals">
          <Route
            path=""
            element={
              <ProtectedRoute>
                <Festival />
              </ProtectedRoute>
            }
          />
          <Route
            path="detail/:id"
            element={
              <ProtectedRoute>
                <EventDetails />
              </ProtectedRoute>
            }
          />
        </Route>
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminProtectedRoute>
              <AdminLayout />
            </AdminProtectedRoute>
          </ProtectedRoute>
        }
      >
        <Route path="" element={<AdminHome />} />
        <Route path="guest" element={<AdminGuest />} />
        <Route path="committee" element={<AdminCommittee />} />
        <Route path="donation" element={<AdminDonation />} />
        <Route path="festival" element={<AdminFestival />} />
        <Route path="job-posting" element={<AdminAddJobPosting />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <DropdownProvider>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </DropdownProvider>
    </Provider>
  </>
);
