import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home'
import Navbar from "./components/cors/Navbar/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import OpenRoute from "./components/cors/Auth/OpenRoute";
// import { useNavigate, Link } from "react-router-dom";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyEmail from "./Pages/VerifyEmail";
import UpdatePassword from "./Pages/UpdatePassword";
import About from "./Pages/About";
import MyProfile from "./Pages/MyProfile";
import PrivateRoute from "./components/cors/Auth/PrivateRoute";
import Error from './Pages/Error'
import Mysection from "./components/cors/Auth/Mysection";
import Setting from "./components/cors/Auth/Setting";
import EnrolledCourse from "./components/cors/Auth/EnrolledCourse";
import Cart from "./components/cors/Dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourses from "./components/cors/instructor/index";
import MyCourses from "./components/cors/instructor/Mycourses/MyCourses";
import Editcourse from "./components/cors/instructor/EditCourses/Editcourse";
import CatalogPage from "./Pages/CatalogPage";
import CourseDetails from "./Pages/CourseDetails";
import ViewCourse from "./Pages/ViewCourse";
import VideoDetails from "./components/cors/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/cors/Dashboard/instructorDashboard/InstructorDashboard";
import Contact from "./Pages/Contact";
import Settings from "./components/cors/Dashboard/Settings";


function App() {

  const {user} = useSelector((state)=> state.profile);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inte">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="catalog/:catalogName" element={<CatalogPage />}></Route>
        <Route path="courses/:courseId" element={<CourseDetails />}></Route>
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        >
        </Route>
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        >
        </Route>
        <Route
          path="upadate-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        >
        </Route>
        <Route
          path="about"
          element={
            // <OpenRoute>
            <About />
            // </OpenRoute>
          }
        >
        </Route>

        <Route path="/contact" element={<Contact />} />

        <Route
          // path="dashboard/my-profile"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<Mysection />}></Route>
          <Route path="dashboard/setting" element={<Settings />} />


          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="dashboard/cart" element={<Cart />}></Route>
                <Route path="dashboard/enrolled-courses" element={<EnrolledCourse />}></Route>
              </>
            )
          }

          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&(
              <>
              <Route path="dashboard/add-course" element={<AddCourses />}></Route>
              <Route path="dashboard/my-courses" element={<MyCourses />}></Route>
              <Route path="dashboard/instructor" element={<InstructorDashboard />}></Route>
              <Route path="dashboard/edit-courses/:courseId" element={<Editcourse />}></Route>
              </>
            )
          }
        </Route>

        <Route
         element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
         }
        >
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route path="view-courses/:courseId/section/:sectionId/subsection/:subsectionId"
              element={<VideoDetails/>}
              ></Route>
              </>
            )
          }
        </Route>

        <Route path="*"
          element={<Error />}></Route>

      </Routes>
    </div>
  );
}

export default App;
