import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { getinstructorCourses } from '../../../../services/opreations/courseDetailsApi';
import { useSelector } from 'react-redux';
import { FiEdit, FiPlus } from 'react-icons/fi';
import InstructorCard from './InstructorCard';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {


  const [instructorCourses, setInstructorCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getInstructorcourses = async () => {
    setLoading(true);
    const result = await getinstructorCourses(token);
    // console.log("INSTRUCOTOR COURSE = ", result);
    setInstructorCourse(result);
    setLoading(false);
  }

  useEffect(() => {
    getInstructorcourses()
  }, [])

  // console.log("COURSE IS HERE = ", instructorCourses);

  return (
    <div className='flex flex-col w-full items-center  mt-[200px]  h-screen'>

      <div className='flex w-[80%] my-4 justify-between'>
        <p className='text-2xl font-semibold'>My Courses</p>
        <button
          className='flex items-center gap-2 px-2 py-1 bg-yellow-50 text-black rounded-lg'
          onClick={() => { navigate("/dashboard/add-course") }}
        >
          Add Courses <FiPlus className='font-bold text-xl' />
        </button>
      </div>

      {/* <div className='flex w-[80%] justify-between py-4 rounded-lg'>
        <p className='ml-4 w-[50%]'>COURSES</p>
        <div className='flex w-[30%] mr-4 gap-2 justify-between'>
          <p>DURATION</p>
          <p>PRICE</p>
          <p>ACTIONS</p>
        </div>
      </div> */}

      {/* <div className='w-[80%] flex flex-col gap-4 mb-[100px] '>
        {
          instructorCourses.map((course, index) => (
            <InstructorCard key={index} course={course} />
          ))
        }
      </div> */}

      <div className='w-[90%] flex flex-col gap-4 mb-[100px] '>
        <InstructorCard courses={instructorCourses} setInstructorCourse={setInstructorCourse} />
      </div>

    </div>

  )
}

export default MyCourses
