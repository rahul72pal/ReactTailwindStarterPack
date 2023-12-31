import React from 'react'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../services/opreations/courseDetailsApi';
import { setCourse } from '../../../../slices/courseSlice';
import { GiCancel } from 'react-icons/gi'
import Upload from '../Upload'

const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false
}) => {

  // console.log("MODAL DATA OF THE SUBSECTION = ",modalData);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (view || edit) {
      setValue("Title", modalData.title);
      setValue("description", modalData.description);
      setValue("lectureVideo", modalData.videpUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.Title !== modalData.title ||
      currentValues.Description !== modalData.description ||
      currentValues.lectureVideo !== modalData.videpUrl) {
      return true;
    }
    else {
      return false;
    }
  }

  const handleEditSubSection = async () => {

    console.log("EDIT SUB SECTION handleeditsection = ");
    const currentValues = getValues();
    console.log("CURRENT Values = ", currentValues);
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subsectionId", modalData._id);

    if (currentValues.Title !== modalData.title) {
      formData.append("title", currentValues.Title);
    }
    if (currentValues.description !== modalData.description) {
      formData.append("description", currentValues.description);
    }
    if (currentValues.lectureVideo !== modalData.videpUrl) {
      formData.append("video", currentValues.lectureVideo);
    }
    setloading(true);
    //api call
    const result = await updateSubSection(formData, token);
    if (result) {
      //TODO : same check
      console.log("RESULT OF THE UPDATE SECTION = ", result);
      // const updatedCourseCountent = course.courseContent.map((section) =>
      //   section._id === modalData ? result : section);
      // const updatedCourseContent = course.courseContent.map((section) =>
      //   section._id === modalData ? { ...section, ...result } : section
      // );
      console.log("MODAL DATA IS HERE = ".modalData);
      const updatedCourseContent = course.courseContent.map((section) => {
        console.log("Comparing:", section._id, modalData.sectionId);
        return section._id === modalData.sectionId
          ? { ...section, subsection: result.subsection }
          : section;
      });

      console.log("UPDATED COURSE CONTENT IS HERE", updatedCourseContent);
      // )
      // console.log("UPDATED COURSE CONTENT IS HERE = ", updatedCourseContent);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setloading(false);

  }


  const onSubmithandle = async (data) => {

    // console.log("DATA ON SUBMIT SUB SECTION = ", data)
    if (view) return;

    if (edit) {
      console.log("edit condition satisfiesd")
      if (!isFormUpdated()) {
        toast.error("NO CHANGES made to the form")
        return;
      }

      // edit krdo store me
      handleEditSubSection();

      return;
    }

    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.Title);
    formData.append("description", data.description);
    formData.append("videoUrl", data.lectureVideo);
    setloading(true);
    console.log("Form Data in Create Sub section",formData);
    //API CALL
    const result = await createSubSection(formData, token);

    if (result) {
      //TODO: check for updation
      console.log("RESULT OF THE CREATE THE SUBSECTION = ", result);
      const updatedCourseCountent = course.courseContent.map((section) =>
        section._id === modalData ? result : section);
      const updatedCourse = { ...course, courseContent: updatedCourseCountent };
      console.log("UPDATED COURSES IN THE CREATE SUBSECTION = ", updatedCourse);
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
    setloading(false);

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-richblack-800 p-8 rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <p className="text-white text-lg font-bold">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button
            onClick={() => !loading && setModalData(null)}
            className="text-white text-2xl hover:text-gray-300"
          >
            <GiCancel />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmithandle)}>
          <Upload
            name="lectureVideo"
            label={edit ? "Edit Lecture Video" : "Lecture Video"}
            register={register}
            errors={errors}
            video={true}
            setValue={setValue}
            getValues={getValues}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />
          <div>
            <label htmlFor="Title" className="text-white">
              Lecture Title
            </label>
            <input
              id="Title"
              placeholder="Enter Lecture Title"
              {...register("Title", { required: true })}
              className="w-full px-2 py-3 bg-richblack-700 rounded-lg text-white"
            />
            {errors.Title && (
              <span className="text-pink-600">Lecture Title is required**</span>
            )}
          </div>
          <div>
            <label htmlFor="description" className="text-white">
              Lecture Description
            </label>
            <textarea
              id="description"
              placeholder="Enter Lecture Description"
              {...register("description", { required: true })}
              className="w-full min-h-[130px] px-2 py-3 bg-richblack-700 rounded-lg text-white"
            ></textarea>
            {errors.description && (
              <span className="text-pink-600">
                Lecture Description is required**
              </span>
            )}
          </div>
          {!view && (
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-yellow-25 font-semibold text-richblack-800 rounded-lg hover:bg-yellow-400"
                disabled={loading}
              >
                {loading ? "Loading...." : edit ? "Save changes" : "Save"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>

  )
}

export default SubSectionModal
