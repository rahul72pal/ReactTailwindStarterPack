import React, { useState } from 'react'
import { Form, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setCourse, setEditCourse, setStep } from '../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../utils/constants';
import { editCourseDetails } from '../../../services/opreations/courseDetailsApi';
import { useNavigate } from 'react-router-dom';

const PublisherCourse = () => {

  const { register, getValues , handleSubmit } = useForm();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { course ,editCourse} = useSelector((state) => state.course);
  const navigate = useNavigate();

  const goToCourses = () => {
    dispatch(resetCourseState());
    //navigate ("/dashboard/my-courses");
  }

  const handlecoursePublic = async () => {
    if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true &&
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
      // no courses change of updatetion 
      // no need to api call
      goToCourses();
      return;
    }

    // if the form is update 
    const formData = new FormData();
    formData.append("courseId", course._id);
    const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setloading(true);
    const result = await editCourseDetails(formData, token);

    if (result) {
      goToCourses();
    }

    setloading(false);
  }

  const submitform = () => {
    // e.preventDefault();
    console.log("Submit form called");
    handlecoursePublic();
    if(editCourse){
      console.log("THIS IS EDIT COURSE= ",editCourse)
      dispatch(setCourse(null))
      dispatch(setEditCourse(false))
      dispatch(setStep(1))
      navigate('/dashboard/my-courses')
    }
    // set
  }

  const gotoback = () => {
    dispatch(setStep(2));
  }
  // const gotoPublish = () =>{

  // }

  return (
    <div className="text-white bg-richblack-800 p-4 w-[50%] flex flex-col justify-center items-center rounded-lg m-3">
      <p className="text-xl font-bold mb-4">Publisher Course</p>
      <form onSubmit={handleSubmit(submitform)}>
        <div>
          <label htmlFor="public">
            <input
             id='public'
             type="checkbox" 
             {...register("public")}
            />
            <span>Make This Course As Public</span>
          </label>
        </div>
        <div className='flex gap-3 m-4 flex-row-reverse'>
          <button className='px-2 py-2 bg-yellow-50 text-black rounded-lg font-semibold' type='submit'>Save Changes</button>
          <button 
          className='border-2 border-richblack-600 px-2 py-1 rounded-lg bg-richblack-600'
          onClick={()=>gotoback()} 
          >Cancel</button>
        </div>
      </form>
    </div>


  )
}

export default PublisherCourse
