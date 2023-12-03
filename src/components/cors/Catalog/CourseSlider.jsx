import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import "swiper/css/free-mode"
// import 'swiper/css/pagination'
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/free-mode"
// import "swiper/css/pagination"
// import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import CourseCard from './CourseCard'

// import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Pagination, Autoplay } from 'swiper/modules';

// import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const CourseSlider = ({ Courses }) => {
  console.log("Course = ", Courses);
  return (
    <div className='mx-auto max-w-screen-xl p-4'>
      {Courses && Courses.length ? (
        <Swiper
        slidesPerView={3}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
            delay: 3000,
        }}
        modules={[FreeMode, Pagination, Autoplay]}
        className='w-full'
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index} className="flex items-center justify-center">
              <CourseCard course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="text-center text-gray-600">No Courses Found</div>
      )}
    </div>

  )
}

export default CourseSlider
