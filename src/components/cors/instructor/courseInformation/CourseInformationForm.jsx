import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseDetails, editCourseDetails, fetchCourseCategory } from '../../../../services/opreations/courseDetailsApi';
import RequirementField from './RequirementField';
import toast from 'react-hot-toast';
// import {COURSE_STATUS} from '../../../../utils/constants'
import { COURSE_STATUS } from '../../../../utils/constants';
import { setStep, setCourse } from '../../../../slices/courseSlice';
import Upload from '../Upload';
import ChipInput from './ChipInput';

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors }
    } = useForm();

    const dispatch = useDispatch();
    const { course, editCourse } = useSelector((state) => state.course);
    // console.log(setStep);
    // console.log("COURSE INFORMATION COURSE IS HERE = ", course);
    const { token } = useSelector((state) => state.auth);
    // console.log("TOKEN = ",token);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    // console.log("course in the course information =", course);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategory(course);

            if (categories.data.length > 0) {
                setCourseCategories(categories.data);
            }

            setLoading(false);
        }

        if (editCourse) {
            // console.log("IS EDIT 2", course);
            setValue("courseTitle", course.courseName);
            setValue("courseDescription", course.courseDescription);
            setValue("price", course.price);
            setValue("tag", course.tag);
            setValue("category", course.category._id);
            setValue("whatYouWillLearn", course.whatYouWillLearn);
            setValue("instructions", JSON.parse(course.instructions));
            // setValue("courseImage", course.thumbnail);
            setValue("status", course.status);
        }

        getCategories();
    }, [editCourse, course]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        // console.log("LINE 181 CURRENTVALUES = ", currentValues);
        // console.log("LINE 182 COURSE = ", course);
        // console.log("STEP 1=", currentValues.courseTitle !== course.courseName)
        // console.log("STEP 2=", currentValues.courseDescription !== course.courseDescription)
        // console.log("STEP 3=", currentValues.price !== course.price)
        // console.log("STEP 4=", currentValues.tag.toString() !== course.tag.toString())
        // console.log("STEP 5=", currentValues.whatYouWillLearn !== course.whatYouWillLearn)
        // console.log("STEP 6=", currentValues.instructions.toString() !== JSON.parse(course.instructions).toString())
        // console.log("STEP 6=", currentValues.instructions.toString(), JSON.parse(course.instructions).toString())
        // console.log("STEP 6= type of", typeof (currentValues.instructions.toString()), typeof (JSON.parse(course.instructions).toString()))
        // console.log("STEP 7=", currentValues.courseImage !== course.thumbnail)
        // console.log("STEP 7=", currentValues.courseImage, course.thumbnail)
        // console.log("STEP 8=", currentValues.status !== course.status)
        // console.log("STEP 9=", currentValues.category !== course.category._id)
        // console.log("STEP 9=", currentValues.category , course.category._id)
        // const trimmedCurrentInstructions = currentValues.instructions.map(str => str.trim());
        // const trimmedCourseInstructions = course.instructions.map(str => str.trim());

        // if (trimmedCurrentInstructions.toString() === trimmedCourseInstructions.toString()) {
        //     console.log('Arrays are equal after trimming.');
        // } else {
        //     console.log('Arrays are not equal after trimming.');
        // }
        return (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseDescription !== course.courseDescription ||
            currentValues.price !== course.price ||
            currentValues.tag.toString() !== course.tag.toString() ||
            currentValues.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValues.instructions.toString() !== JSON.parse(course.instructions).toString() ||
            // currentValues.courseImage !== course.thumbnail ||
            currentValues.status !== course.status ||
            currentValues.category !== course.category._id
        );
    }

    const Onsubmit = async (data) => {
        console.log("Onsubmit data = ", data);

        if (editCourse) {
            // console.log("EDIT COURSE SUBMISSION");

            // console.log("Onsubmit course = ", course);
            // console.log("IS FORM UPDATED = ",isFormUpdated());
            if (isFormUpdated()) {
                // console.log("Onsubmit EDIT data = ", data);
                // const courseTagsArray = course.tag.split(',');
                let newtags
                if (data.tag) {
                    newtags = data.tag.join(',');
                }
                const formData = new FormData();
                // console.log("LINE 201 COURSE AND DATA BOTH HERE =",course,data);
                formData.append("courseId", course._id);

                if (data.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (data.courseDescription !== course.courseDescription) {
                    console.log("course desc update here")
                    formData.append("courseDescription", data.courseDescription);
                } if (data.price !== course.price) {
                    formData.append("price", data.price);
                } if (data.whatYouWillLearn !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.whatYouWillLearn);
                } if (data.category !== course.category._id) {
                    formData.append("category", data.category);
                } if (data.instructions.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.instructions));
                } if (data.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage);
                }
                if (data.tag[0] !== course.tag[0]) {
                    console.log("TAg UPDATED")
                    formData.append("tag", data.tag);
                }
                // const tagString = 

                // console.log("EDIT TAGS AND COUSE TAG 1", course.tag)
                // console.log("EDIT TAGS AND COUSE TAG 2", data.tag)
                // console.log("EDIT TAGS AND COUSE TAG 3", data.tag[0] !== course.tag[0])

                setLoading(true);
                const result = await editCourseDetails(formData, token);
                setLoading(false);

                if (result) {
                    console.log("EDITCOURSE DETAILS RESULT = ", result);
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("NO changes made to the form");
            }

            return;
        }

        console.log("Onsubmit CREATE data = ", data.thumbnail);
        // create a new course
        const formData = new FormData();
        formData.append("courseName", data.courseTitle);
        formData.append("courseDescription", data.courseDescription);
        formData.append("price", data.price);
        formData.append("whatYouWillLearn", data.whatYouWillLearn);
        formData.append("category", data.category);
        formData.append("thumbnail", data.thumbnail);
        formData.append("instructions", JSON.stringify(data.instructions));
        formData.append("status", COURSE_STATUS.DRAFT);
        formData.append("tag", data.tag);

        setLoading(true);
        const result = await addCourseDetails(formData, token);

        if (result) {
            dispatch(setStep(2));
            dispatch(setCourse(result));
        }

        setLoading(false);
    }

    // console.log("COURSE CATEGORY IS HERE = ",course.category._id)

    return (
        <div className='lg:w-[750px] w-full bg-richblack-800 p-4 space-y-4 h-fit mb-[200px]'>
            <form onSubmit={handleSubmit(Onsubmit)} className="p-4 space-y-4">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input
                        type="text"
                        id="courseTitle"
                        // name="courseTitle"
                        // value={courseTitle}
                        className="w-full p-2 border  text-white bg-richblack-600 border-gray-300 rounded"
                        placeholder='Enter your Course Title'
                        {...register("courseTitle", { required: true })}
                    />
                    {
                        errors.courseTitle && (
                            <span>Course Title is Required**</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="courseDescription">Short Course Description</label>
                    <textarea
                        id="courseDescription"
                        name="courseDescription"
                        // value={courseDescription}
                        // onChange={handleInputChange}
                        placeholder='Course Description'
                        className="w-full p-2 bg-richblack-600 text-white border border-gray-300 rounded"
                        {...register("courseDescription", { required: true })}
                    />
                    {
                        errors.courseDescription && (
                            <span>Course Description is required</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        // name="courseTitle"
                        // value={courseTitle}
                        className="w-full p-2 border  text-white bg-richblack-600 border-gray-300 rounded"
                        placeholder='Enter your Course Price'
                        {...register("price",
                            {
                                required: true,
                                valueAsNumber: true,
                            })}
                    />
                    Rs
                    {
                        errors.price && (
                            <span>Course Price is Required**</span>
                        )
                    }
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        // value={category}
                        // onChange={handleInputChange}
                        className="w-full p-2 text-white bg-richblack-600 border border-gray-300 rounded"
                        {...register("category", { required: true })}
                    >
                        {
                            course?.category && (
                                <option className='text-yellow' value={course?.category?._id} >
                                    {course?.category?.name}
                                </option>
                            )
                        }
                        {
                            !loading && courseCategories.map((category, index) => (
                                <option key={index} value={category?._id}>
                                    {category?.name}
                                </option>
                            ))
                        }
                    </select>
                    {errors.category && (
                        <span className='text-[14px] font-semibold text-yellow-25 '>
                            Course Category is Required
                        </span>
                    )}
                </div>
                {/* custom component for tag  */}
                {/* Course Tags */}
                <ChipInput
                    label="Tags"
                    name="tag"
                    placeholder="Enter Tags and press Enter"
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    getValues={getValues}
                />
                {/* custom component for file image  */}
                {/* Course Thumbnail Image */}
                <Upload
                    name="thumbnail"
                    label="Course Thumbnail"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    editData={editCourse ? course?.thumbnail : null}
                />
                {/* whatYouWillLearn of course  */}
                <div>
                    <label htmlFor="whatYouWillLearn">whatYouWillLearn of Course</label>
                    <textarea
                        type="text"
                        id="whatYouWillLearn"
                        name="whatYouWillLearn"
                        className="w-full p-2 bg-richblack-600 text-white border border-gray-300 rounded"
                        {...register("whatYouWillLearn", { required: true })}
                    ></textarea>
                    {
                        errors.whatYouWillLearn && (
                            <span>
                                whatYouWillLearn are required**
                            </span>
                        )
                    }
                </div>
                <RequirementField
                    name="instructions"
                    label="Requirements/Insructions"
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                    editData={editCourse ? course?.instructions : null}
                />
                <div>
                    {
                        editCourse && (
                            <button
                                onClick={() => dispatch(setStep(2))}
                            >
                                Continue withOut Saving
                            </button>
                        )
                    }
                    {
                        <button
                            className='bg-yellow-25 text-richblack-800 font-semibold px-3 py-1 rounded-lg'
                            type='submit'>
                            {!editCourse ? "Next" : "Save Changes"}
                        </button>
                    }
                </div>
            </form>
        </div>
    );
};

export default CourseInformationForm


