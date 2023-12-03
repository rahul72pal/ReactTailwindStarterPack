import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import Loading from './Loading';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { toast } from 'react-hot-toast';
import {useDispatch} from 'react-redux'
import { resetPassword } from '../services/opreations/authAPI';
import {useNavigate , useLocation} from 'react-router-dom'

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    // const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const { password, confirmPassword } = formData;
    const { loading } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // const handleChangePassword = (e) => {
    //     setPassword(e.target.value);
    // };

    // const handleChangeConfirmPassword = (e) => {
    //     setConfirmPassword(e.target.value);
    // };

    // Handle input fields, when some value changes
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const isStrongPassword = (password) => {
        // You can implement your own password strength criteria here
        // For this example, we'll consider a password as strong if it has at least 8 characters
        return password.length >= 8;
    };

    console.log("Passowrd =",password,"confirm Password= ",confirmPassword);

    const handleOnsubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }

        const token = location.pathname.split('/').at(-1);
        console.log(token);
        dispatch(resetPassword(password,confirmPassword,token,navigate))
    }

    console.log(formData);

    return (
        <div>
            {
                loading ? (<Loading />) : (
                    <div className="flex justify-center items-center  h-full mt-[7rem]">
                        <div className="w-80 text-white p-4 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
                            <form onSubmit={handleOnsubmit}>
                                <div className="mb-4 relative ">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={password}
                                        onChange={handleOnChange}
                                        placeholder="Enter Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {!showPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )}
                                    </span>
                                </div>
                                <div className="mb-4 relative">
                                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                        Confirm Password <sup className="text-pink-200">*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleOnChange}
                                        placeholder="Enter Confirm Password"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                                    >
                                        {!showConfirmPassword ? (
                                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                        ) : (
                                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                        )}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <input
                                        type="checkbox"
                                        checked={isStrongPassword(password)}
                                        readOnly
                                        className="mr-2 bg-richblack-700"
                                    />
                                    Password Strength: {isStrongPassword(password) ? 'Strong' : 'Weak'}
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-yellow-25 text-black font-semibold p-2 rounded hover:bg-yellow-50"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div >
                    </div >
                )
            }
        </div >
    );
};

export default UpdatePassword;
