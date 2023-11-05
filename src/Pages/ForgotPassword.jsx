import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/opreations/authAPI';
import { FaLongArrowAltLeft } from 'react-icons/fa'
// import

const ForgotPassword = () => {
    const [EmailSent, setEmailSent] = useState(false);
    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleResetPassword = (e) => {
        console.log("On submit called");
        e.preventDefault();
        // Simulate an API request with a timeout (you should replace this with your actual API call)
        // setShowResetForm(flase); // Show loading initially

        // setTimeout(() => {
        // After the timeout, reset the loading state and show the "Check Your Email" message
        // setShowResetForm(true);
        // }, 3000); // Simulate a 3-second loading period

        // You can add your actual form submission code here
        // This is where you would make the API request to send the reset email
        dispatch(getPasswordResetToken(email, setEmailSent))

    };

    console.log("Reset Password Email = ", email);

    return (
        <div className="min-h-screen mt-[-40px] flex justify-center items-center ">
            <div className=" max-w-md w-3/12 p-6 space-y-6 text-white shadow-md rounded-lg">
                {!EmailSent ? (
                    <form onSubmit={handleResetPassword}>
                        <h2 className="text-4xl  font-semibold text-center">Reset Your Password</h2>
                        <div className="text-center">
                            <div className='my-5 text-[16px] text-richblack-600 text-left'>
                                Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery
                            </div>
                            <div className="mb-4 text-left ">
                                <label htmlFor="email" className="block text-sm font-medium text-richblack-100">
                                    Email Address <sup className="text-pink-200">*</sup>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 p-2 w-full bg-richblack-600  rounded-md border-2 border-blue-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            {/* <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                                    placeholder="Enter your new password"
                                />
                            </div> */}
                            {loading ? (
                                <div className="text-gray-600 bg-yellow-25">Loading...</div>
                            ) : (
                                <button type="submit" className="btn-primary w-full bg-yellow-25 text-black font-semibold px-3 py-2 rounded-sm">

                                    {
                                        !EmailSent ? "Reset Password" : "Resend Email..."
                                    }
                                </button>
                            )}
                        </div>
                    </form>

                ) : (
                    <div>
                        {/* Check your email message */}
                        <h2 className="text-2xl font-semibold text-center">Check Your Email</h2>
                        <p className="text-center text-gray-600">
                            We've sent instructions to reset your password to your email address.
                        </p>
                    </div>
                )}
                {
                    EmailSent &&
                    <div className="text-center">
                        <button
                            className="btn-secondary
                        w-full bg-yellow-25 text-black font-semibold px-3 py-2 rounded-sm
                        "
                            onClick={() => setEmailSent(false)}
                            disabled={loading} // Disable the button while loading
                        >
                            Resend Email
                        </button>
                    </div>
                }
                <Link to='/login' className='flex justify-center items-center gap-2'>
                    <FaLongArrowAltLeft />
                    Back to login
                </Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
