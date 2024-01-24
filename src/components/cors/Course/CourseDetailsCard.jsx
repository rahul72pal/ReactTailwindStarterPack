import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import toast from 'react-hot-toast';
import {ACCOUNT_TYPE} from '../../../utils/constants'
import { addToCart } from '../../../slices/cardSlice';
import { IoIosShareAlt } from "react-icons/io";

const CourseDetailsCard = ({ course, setConfirmationModal, handleByCourse }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAddToCart = () => {
       if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
        toast.error("You are instructor You Can't buy the course ");
        return;
       }

       if(token){
        console.log("DISPATCH ADD TO CART")
        dispatch(addToCart(course));
        return;
       }

       setConfirmationModal({
        text1: "you are not logged in",
        text2: "Please login to add to cart",
        btn1text: "Login",
        btn2text: "cancel",
        btn1Handler: ()=> navigate("/login"),
        btn2Handler:()=> setConfirmationModal(null)
       })
    }

    const handleToShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to ClickBoard")
    }

    console.log("User here =",user?.accountType);
    console.log("User here =",ACCOUNT_TYPE.INSTRUCTOR);

    return (
        <div className="flex flex-col items-center w-[400px] bg-richblack-700 px-3 py-3 rounded-lg">
            <img src={course.thumbnail} alt="Course Image" className="mb-4" />

            <div className="text-center mb-2 text-richblack-100">
                Rs. {course.price}
            </div>

            <div className="flex flex-col items-center w-full">
                <button
                    onClick={
                        user && course && course.studentenrolled.includes(user?._id)
                            ? () => navigate("/dashboard/enrolled-courses")
                            : handleByCourse
                    }
                    className="mb-2 px-3 py-2 bg-yellow-50 w-full text-black font-semibold rounded-xl"
                >
                    {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR? "Go To Courses":
                     user && course?.studentenrolled.includes(user?._id) ? "Go to Course" : "Buy Course" }
                </button>

                {!course?.studentenrolled.includes(user?._id) && (
                    <button onClick={handleAddToCart} className="px-3 py-2 w-full bg-black text-white font-semibold rounded-lg">
                        Add to Cart
                    </button>
                )}
            </div>

            <div className='text-richblack-100'>
                <p>30-Day Money-Back Gurantee</p>
            </div>

            <div className='text-richblack-100'>
                <p>This Course Includes:</p>
                {course?.instructions && (
                    <div>
                        {JSON.parse(course?.instructions).map((item, index) => (
                            <p key={index} className='flex flex-col gap-3'>
                                {item}
                            </p>
                        ))}
                    </div>
                )}
            </div>
            
            <div className=''>
                <button onClick={handleToShare} className='flex items-center gap-2 text-yellow-25'>
                    share <IoIosShareAlt className='text-yellow-25' />
                </button>
                
            </div>
        </div>

    )
}

export default CourseDetailsCard
