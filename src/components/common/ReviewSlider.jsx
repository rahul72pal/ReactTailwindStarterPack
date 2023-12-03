import React from 'react'

// import { Swiper, SwiperSlide } from 'swiper/react'
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination, Autoplay } from 'swiper/modules';
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
// import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import ReactStars from 'react-rating-stars-component'
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { useState } from 'react'
import { useEffect } from 'react'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const { REVIEWS_DETAILS_API } = ratingsEndpoints

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const turncatewords = 15;

    useEffect(() => {
        const fetchAllReviews = async () => {
            const response = await apiConnector("GET", REVIEWS_DETAILS_API);
            // console.log("ALL RATING RESPONSE = ",response?.data?.data);
            setReviews(response?.data?.data);
        }
        fetchAllReviews();
    }, []);

    console.log("Rating reviews = ", reviews);

    return (
        <div className='text-white flex flex-col justify-center items-center pb-[300px'>
            {
                !reviews ? (<div>No Reviews Found</div>) : (
                    <div className=' px-10 py-3 w-10/12'>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={24}
                            loop={true}
                            freeMode={true}
                            autoplay={{
                                delay: 2500,
                            }}
                            modules={[FreeMode, Pagination, Autoplay]}
                            className='w-full'
                        >
                            {
                                reviews.map((review, index) => (
                                    <SwiperSlide key={index} className='bg-richblack-800 py-5 px-6 w-fit rounded-lg'>
                                        <img src={review?.user?.image} alt="User Image" className='w-[80px] h-[80px] rounded-full object-cover' />
                                        <div className='flex gap-2'>
                                            <p>{review?.user?.firstName}</p>
                                            <p>{review?.user?.lastName}</p>
                                        </div>
                                        <p>Email: {review?.user?.email}</p>
                                        <p>Review: {review?.review}</p>
                                        <p>Course: {review?.course?.courseName}</p>
                                        <p>Rating: {review?.rating.toFixed(1)}</p>
                                        <ReactStars
                                            value={review?.rating.toFixed(1)}
                                            count={5}
                                            size={26}
                                            activeColor={"#ffd700"}
                                            edit={false}
                                            isHalf={true}
                                            emptyIcon={<FaRegStar />}
                                            halfIcon={<FaStarHalfAlt />}
                                            fullIcon={<FaStar />}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                )
            }
        </div>
    )
}

export default ReviewSlider








