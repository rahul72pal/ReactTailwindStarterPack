import React from 'react';
import ProgressBar from "@ramonak/react-progress-bar";
// import { CircularProgressbar,AnimatedProgressProvider } from 'react-circular-progressbar';
// import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// import { easeQuadInOut } from 'd3-ease'; // Import the easing function
// import  AnimatedProgressProvider  from '../../common/AnimatedProgressProvider';
import { useNavigate } from 'react-router-dom';

const CardComponent = (props) => {
  const { course } = props;
  const percentage = course.progressPercentage || 0;
  const navigate = useNavigate();

  // console.log("SINGLE COURSE WITH SECTION AND SUBSECTION = ",course.courseContent[0]._id,course.courseContent[0]?.subsection[0]?._id);

  return (
    <div className="w-full h-72 rounded overflow-hidden shadow-lg bg-richblack-600 flex items-center cursor-pointer px-4 py-2" onClick={() => {
      navigate(`/view-courses/${course?._id}/section/${course.courseContent[0]?._id}/subsection/${course.courseContent[0]?.subsection[0]?._id}`);
    }}>
      <img src={course.thumbnail} alt="Course Thumbnail" className="w-48 h-48 object-cover mr-4" />
      <div className="flex flex-col flex-grow">
        <div className="font-bold text-xl mb-2">{course.courseName}</div>
        <p className="text-gray-700 text-base flex-grow">{course.courseDescription}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-wrap space-x-2">
            {course.tag.map((tag, index) => (
              <span key={index} className="text-yellow-50 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mb-2">
                Tags: {tag}
              </span>
            ))}
          </div>
          <span className="text-teal-500 font-semibold text-lg">Price: {course.price} Rs</span>
        </div>
        <div className="flex items-center mt-4">
          <span className="text-gray-500 mr-2">Duration: {course?.totalDuration}</span>
          <div className="w-24">
            <CircularProgressbar value={percentage} text={`${percentage}%`} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default CardComponent;
