import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import { AiOutlineStar } from 'react-icons/ai'
import { MdDeleteForever } from 'react-icons/md'
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from '../../../../slices/cardSlice';
import { useDispatch } from 'react-redux';
// import { render } from "react-dom";

const Card = ({ course }) => {

    const dispatch = useDispatch();

    // const ratingstars = Array.from({ length: 5 }, (e, index) => {

    //     let number = index + 0.5;
    //     // console.log(index,number)
    //     return (
    //         <span key={index}>
    //             {
    //                 rating >= index + 1 ? (<FaStar />)
    //                     : rating >= number ? (<FaStarHalf />)
    //                         : (<AiOutlineStar />)

    //             }
    //         </span>
    //     )

    // })

    // const ratingChanged = (newRating) => {
    //     console.log(newRating);
    // };

    return (
        <div className=" text-white shadow-md p-4 flex items-center">
            {/* Left side: Course Image */}
            <div className="w-1/4">
                <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="w-full h-auto"
                />
            </div>

            {/* Right side: Course Details */}
            <div className="w-3/4 p-4">
                <h2 className="text-xl font-semibold mb-2">{course.courseName}</h2>
                <p className="text-gray-600 mb-2">Category: {course?.category?.name}</p>
                <p className="text-gray-600 mb-2">Rating: {course.rating}</p>
                <p className="text-gray-600 mb-2">Total Lessons: {course.totalLessons}</p>
                <p className="text-gray-600 mb-2">Price: ${course.price}</p>
                {/* <span className='flex text-yellow-50 items-center gap-1 '>{course?.ratingandreviws?.rating} {ratingstars}</span> */}
                <span className='flex text-yellow-50 items-center gap-1 '>Total Rating And Reviews :{course?.ratingandreviws.length} </span>
                <ReactStars
                    count={5}
                    // onChange={ratingChanged}
                    edit={false}
                    emptyIcon={<AiOutlineStar/>}
                    halfIcon={<FaStarHalf/>}
                    fullIcon={<FaStar/>}
                    size={24}
                    activeColor="#ffd700"
                />,

                {/* Remove Button */}
                <button 
                className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => dispatch(removeFromCart(course._id))}>
                    <MdDeleteForever/>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default Card
