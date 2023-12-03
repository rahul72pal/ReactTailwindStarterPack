import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const {token} = useSelector((state)=> state.auth);

    if (token !== null) {
        return children
      } else {
        return <Navigate to="/login" />
      }
}

export default PrivateRoute


// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, useNavigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const { token, expires } = useSelector((state) => state.auth);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkTokenStatus = () => {
//             if (!token) {
//                 // Redirect to login if the token is null
//                 navigate('/login');
//                 return;
//             }

//             const expirationTime = new Date(expires);
//             const currentTime = new Date();

//             if (currentTime > expirationTime) {
//                 // Redirect to login if the token is expired
//                 navigate('/login');
//             }
//         };

//         // Check the token status initially
//         checkTokenStatus();

//         // Check the token status every 1 hour
//         const intervalId = setInterval(checkTokenStatus, 60 * 60 * 1000);

//         // Clear the interval on component unmount
//         return () => clearInterval(intervalId);
//     }, [token, expires, navigate]);

//     return children;
// };

// export default PrivateRoute;

