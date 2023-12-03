import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../../services/opreations/courseDetailsApi';
import { courseEndpoints } from '../../../services/apis';

const CourseReviwModal = ({ setReviwModal }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { register, setValue, formState: { errors }, handleSubmit } = useForm();
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    // console.log("COURSErEVIWLIKEMODAL = ",token,courseEntireData);

    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])

    const ratingchange = (newRating) => {
        setValue("courseRating", newRating);
    }

    const formSubmit = async (data) => {
        await createRating({
            courseId: courseEntireData._id,
            rating: data.courseRating,
            review: data.courseExperience
        }, token);
        setReviwModal(false);
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 bg-gray-500 backdrop-blur-[20%] bg-richblack-500">
            <div className="text-white p-8 bg-richblack-800 rounded-lg w-96">
            {/* modal header  */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-semibold">Add Review</p>
                <button onClick={() => setReviwModal(false)} className="text-gray-300 hover:text-gray-100">
                    Close
                </button>
            </div>

            {/* modal body  */}
            <div>
                <div className="flex items-center mb-4">
                    <img src={user?.image} alt="User Image" className="aspect-square w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                        <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
                        <p className="text-gray-500">Posting Publicly</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(formSubmit)}>
                    <ReactStars
                        count={5}
                        onChange={ratingchange}
                        size={24}
                        activeColor={"#ffd700"}
                    />

                    <div className="mt-4">
                        <label htmlFor="courseExperience" className="block text-gray-400 text-sm mb-2">
                            Add Your Experiences
                        </label>
                        <textarea
                            id="courseExperience"
                            placeholder="Add Your Experiences Here"
                            {...register("courseExperience", { required: true })}
                            className="form-style min-h-[130px] w-full p-2 bg-richblack-700 text-white border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                        ></textarea>
                        {errors.courseExperience && (
                            <span className="text-red-500 text-sm mt-1">
                                Please Add your experience
                            </span>
                        )}
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button onClick={() => setReviwModal(false)} className="mr-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-yellow-50 text-black rounded hover:bg-yellow-100 focus:outline-none focus:shadow-outline-blue">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
        </div>

    )
}

export default CourseReviwModal
