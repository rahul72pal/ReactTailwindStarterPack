import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

const CourseCard = ({ course, Height }) => {

  console.log("COURSE IN THE CARD = ", course);

  const [AvgRewiCount, setAvgRewieCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course?.ratingandreviews);
    setAvgRewieCount(count)
  }, [course])

  return (
    <div className='text-white'>
      <Link to={`/courses/${course._id}`} className="block transition-transform transform hover:scale-105">
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-md">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={course?.thumbnail}
              alt='course ka thumbnail'
              className="object-cover w-[300px] h-[200px]"
            />
          </div>
          <div className="p-4">
            <p className="text-xl font-semibold mb-2">{course?.courseName}</p>
            <p className="text-gray-400">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-yellow-400">{AvgRewiCount || 0}</span>
              <RatingStars Review_Count={AvgRewiCount} />
              <span className="text-gray-400">{course?.ratingandreviews?.length} Rating</span>
            </div>
            <p className="text-green-400 font-semibold mt-2">{course?.price} Rs</p>
          </div>
        </div>
      </Link>
    </div>

  )
}

export default CourseCard
