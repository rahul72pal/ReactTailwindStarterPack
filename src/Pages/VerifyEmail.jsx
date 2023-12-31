import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiClockCounterClockwiseFill } from 'react-icons/pi';
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../services/opreations/authAPI';
import { useNavigate } from 'react-router-dom'
import OtpInput from 'react-otp-input';
import { sendOtp } from '../services/opreations/authAPI';
import Loading from './Loading';
import { useEffect } from 'react';


const VerifyEmail = () => {
    // const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');

    const { signupData, loading } = useSelector((state) => state.auth);
    // console.log("Signup Data verify email = ",signupData);

    // const handleChange = (e, index) => {
    //     const value = e.target.value;
    //     // Check if the input is a number and has a length of 1
    //     if (/^[0-9]*$/.test(value) && value.length === 1) {
    //         const newOtp = [...otp];
    //         newOtp[index] = value;
    //         // Move to the next input field if available
    //         if (index < 5 && newOtp[index] !== '') {
    //             newOtp[index + 1] = '';
    //         }
    //         setOtp(newOtp);
    //     }
    // };

    // console.log("OTP = ", otp);

    // const handleBackspace = (e, index) => {
    //     if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
    //         const newOtp = [...otp];
    //         newOtp[index - 1] = '';
    //         setOtp(newOtp);
    //     }
    // };

    //   const convertToOTPString = () => {
    //     const otpString = otp.join(''); // Join the OTP array into a single string
    //     console.log('OTP as a string: ', otpString);
    //   };

    // const otpString = otp.join(''); // Join the OTP array into a single string
    // console.log('OTP as a string: ', otpString);

    //chek your self
    useEffect(() => {
        if (!signupData) {
            navigate('/signup')
        }
    },[signupData,navigate]);

    console.log("OTP =", otp);

    const onVerifyEmail = () => {
        dispatch(signUp(
            signupData.accountType,
            signupData.firstName,
            signupData.lastName,
            signupData.email,
            signupData.password,
            signupData.confirmPassword,
            otp,
            navigate));
    }

    return (

        <div>
            {
                loading ? (<Loading />) : (
                    <div className="flex flex-col gap-3 justify-center items-center h-full lg:mt-[100px]">
                        <div className='text-white w-3/12 text-[36px]'>Verify email</div>
                        <div className=' text-richblack-400 w-3/12 text-[18px]'>A verification code has been sent to you. Enter the code below</div>
                        {/* <div className="w-3/12 flex flex-row my-5 items-center space-x-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        className="w-12 h-12 bg-richblack-800 text-4xl text-center border-b rounded-md border-blue-50"
                        value={digit}
                        onChange={(e) => handleChange(e, index)}
                        onKeyUp={(e) => handleBackspace(e, index)}
                    />
                ))}
            </div> */}
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} />}
                            inputStyle=" text-[36px] border rounded text-center bg-richblack-700 text-white gap-5  "
                        />
                        <button onClick={onVerifyEmail} className="bg-yellow-25 w-3/12 text-richblack-900 font-semibold px-4 py-2 rounded">
                            Verify And Register
                        </button>
                        <div className='flex w-3/12 text-white justify-between '>
                            <Link to='/login' className='text flex justify-center items-center gap-2'>
                                <FaLongArrowAltLeft />
                                Back to Login
                            </Link>
                            <button className=' text-blue-100 flex justify-center items-center gap-2 '>
                                <PiClockCounterClockwiseFill />
                                <button
                                    onClick={() => { dispatch(sendOtp(signupData.email, navigate)) }}
                                >Resend it</button>
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default VerifyEmail;
