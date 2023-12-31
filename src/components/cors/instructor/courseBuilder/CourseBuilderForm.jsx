import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux';
import { GrFormNextLink } from 'react-icons/gr'
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../services/opreations/courseDetailsApi';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "")
  }

  const gotoback = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true))
  }

  // console.log("COURSE BUILDER =", course);

  const gotonext = () => {
    // console.log("GOTONEXT = ",course.courseContent);
    if (course?.courseContent.lenght === 0) {
      toast.error("Please atleaste add one section");
      return;
    }
    // console.log("Course is here = ",course);
    if (course?.courseContent.some((section) => section.subsection.length === 0)){
      toast.error("Please add atleaste one lecture in each section");
      return;
    }
    // if everything is good
    dispatch(setStep(3));
  }

  const onSubmit = async (data) => {
    // console.log("ON SUBMIT THE CREATE SECTION")
    console.log("ON SUBMIT THE CREATE SECTION DATA=", data);
    setLoading(true);
    let result;

    if (editSectionName) {
      //we are editing the section name
      console.log("EDITCOURSE IS API CALL AVIBALE");
      console.log("WHAT IS EDITSECTION IS =",editSectionName);
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id
        }, token
      )
    }
    else {
      console.log("EDITCOURSE IS NOT AVIBALE");
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }

    //updates value
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loadinng false
    setLoading(false);
  }


  const handleChangeSectionName = (sectionId, sectionName) => {

    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  // console.log("COURSE CONTENT = ", course?.courseContent);

  return (
    <div className='text-white mx-auto flex flex-col justify-center items-center px-3 bg-richblack-800 lg:m-[200px] w-[60%] '>
      <p className='m-4'>Course Builder Section</p>
      <form onSubmit={handleSubmit(onSubmit)}
        className='w-[80%] m-4 p-4 text-left bg-richblack-800'>
        <div className='flex flex-col'>
          <label htmlFor='sectionName'> Section name *</label>
          <input
            id='sectionName'
            placeholder='Add Section Name'
            {...register("sectionName", { required: true })}
            className='w-[80%] m-3 rounded-lg p-2  bg-richblack-700 text-white'
          />
          {
            errors.sectionName && (
              <span>Section Name is required</span>
            )
          }
          <div className='flex gap-3'>
            <button
              type='submit'
              className='px-2 py-3 border-[2.4px] w-fit border-yellow-300 text-yellow-300 flex gap-3 items-center'>
              {editSectionName ? "Edit Section Name" : "Create Section"}
              <AiOutlinePlusCircle />
            </button>
            {
              editSectionName && (<button
                onClick={cancelEdit}
                className='text-richblack-500'>
                Cancel</button>)
            }
          </div>
        </div>
      </form>

      {/* section name of the form  */}
      <div className='w-full'>
        {
          course?.courseContent?.length > 0 && (
            <div className='w-8/10'>
              <NestedView handleChangeSectionName={handleChangeSectionName} />
            </div>
          )
        }
      </div>
      <div className='flex gap-6 m-4 '>
        <button
          onClick={gotoback}
          className='px-3 py-2 w-fit rounded-lg  
        bg-richblack-700 flex gap-3 items-center'>
          Cancel
        </button>
        <button
          onClick={gotonext}
          className='px-3 py-2  w-fit rounded-lg 
        bg-yellow-25 text-black flex gap-3 items-center'>
          Next
          <GrFormNextLink />
        </button>
      </div>
    </div>
  )
}

export default CourseBuilderForm
