import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../RenderSteps';
import { useEffect } from 'react';
import { fetchCourseDetails } from '../../../../services/opreations/courseDetailsApi';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';

const Editcourse = () => {

    const dispatch = useDispatch();
    const {courseId} = useParams();
    const {course} = useSelector((state)=>state.course);
    const [loading , setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    // useEffect(()=>{
    //     const populateCourseDetails = async(courseId)=>{
    //         setLoading(true)
    //         const result  = await fetchCourseDetails({courseId:courseId},token);
    //         if(result){
    //             dispatch(setEditCourse(true));
    //             dispatch(setCourse(result))
    //         }
    //         setLoading(false);
    //     }
    //     populateCourseDetails(courseId);
    // },[])

    useEffect(() => {
      ;(async () => {
        setLoading(true)
        const result = await fetchCourseDetails(courseId, token)
        console.log("EDIT COURSES RESULT = ",result);
        if (result) {
          dispatch(setEditCourse(true))
          dispatch(setCourse(result))
        }
        setLoading(false)
      })()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }

    // console.log("EDIT COURSE IS HERE = ",course);

  return (
    <div className='h-screen  mt-[200px] pb-[200px] w-full'>
      <h1 className='text-2xl font-semibold text-center'>Edit Course</h1>
      <div>
        {
            course ? (<RenderSteps/>) : (<p>Course Not Found</p>)
        }
      </div>
    </div>
  )
}

export default Editcourse
