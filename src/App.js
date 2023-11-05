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

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 font-inte">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
          <ForgotPassword/>
          </OpenRoute>
        }
          >
        </Route>
        <Route 
        path="verify-email"
        element={
          <OpenRoute>
          <VerifyEmail/>
          </OpenRoute>
        }
          >
        </Route>
        <Route 
        path="upadate-password"
        element={
          <OpenRoute>
          <UpdatePassword/>
          </OpenRoute>
        }
          >
        </Route>
      </Routes>
    </div>
  );
}

export default App;
