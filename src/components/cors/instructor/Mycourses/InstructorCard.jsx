import React from 'react'
import { useState } from 'react';
import { FiEdit } from 'react-icons/fi'
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux';
import { Table, Tr, Thead, Tbody, Th, Td } from 'react-super-responsive-table';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { getinstructorCourses } from '../../../../services/opreations/courseDetailsApi';
import { setCourse } from '../../../../slices/courseSlice';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { deleteCourse } from '../../../../services/opreations/courseDetailsApi';
// import { LoadingSpinner } from 'video-react';
import Loading from '../../../../Pages/Loading'
import {  useNavigate } from 'react-router-dom';

const InstructorCard = ({ courses ,setInstructorCourse}) => {

    // console.log("COURSE IS HERE = ", courses);
    const { token } = useSelector((state) => state.auth);
    const [loading, setloading] = useState(false);
    const [confirmationmodal, setConfirmationModal] = useState(null);
    const navigate = useNavigate();


    const handlecoursedelete = async (courseId) => {
        setloading(true);
        await deleteCourse({ courseId: courseId }, token);
        // const result = await getinstructorCourses(token);
        // if(result){
        //     setCourse(result);
        // }
        // setConfirmationModal(null);
        // setloading(false);

        // Wait for some time (e.g., 2 seconds) using setTimeout
        setTimeout(async () => {
            // Fetch instructor courses after the delay
            const result = await getinstructorCourses(token);
            // console.log("COURSE settTime out = ",result);

            if (result) {
                setCourse(result);
                setInstructorCourse(result);
            }

            setConfirmationModal(null);
            setloading(false);
        }, 2000);
    }


    const editHandler = (course)=>{
        console.log("Edit course is here = ",course);
        setCourse(course)
        navigate(`/dashboard/edit-courses/${course._id}`)
    }

    // console.log("COURSE IMAGE = ",courses[0]?.thumbnail);

    return (
        <div>
            {
                loading ? (<Loading/>) : (
                    <div>

            {/* <div className="flex bg-richblack-800 w-full p-4 justify-between  px-4 rounded-md shadow-md ">
                {/* Left Side }
                <div className="flex gap-4 h-fit items-center ml-4 w-[100%]">
                    {/* Course Image }
                    <img
                        src={course.thumbnail}  // Replace with the actual image source
                        alt={course.courseName}
                        className="w-80 mt-4 h-60 object-cover rounded-md"
                    />

                    {/* Course Information }
                    <div className="mt-4 ">
                        <h2 className="text-xl font-bold">{course.courseName}</h2>
                        <p className="text-gray-500 w-full">{course.courseDescription}</p>
                        <p className="text-gray-500">Created At: {course.createdAt}</p>
                        <p >
                            Status: <span className={`text-sm ${course.status === 'Published' ? 'text-yellow-50' : 'text-pink-200'}`}>{course.status}</span>
                        </p>
                    </div>
                </div>

                {/* Right Side }
                <div className="flex ml-4 my-auto gap-4 mr-4">
                    {/* Duration and Price }
                    <div className="flex justify-between gap-3 my-auto">
                        <p className="text-gray-600">Duration: {course.duration}</p>
                        <p className="text-gray-600">Price: ${course.price}</p>
                    </div>

                    {/* Action Buttons }
                    <div className="flex gap-3 my-1">
                        <button className="px-4 py-2 bg-yellow-50 font-semibold text-black rounded-md mr-2">
                            <FiEdit />
                        </button>
                        <button className="px-4 py-2 bg-red-500 text-white bg-richblack-600 rounded-md">
                            <MdDeleteOutline />
                        </button>
                    </div>
                </div>
            </div> */}

            <Table className='bg-richblack-800  text-white mb-10 px-3 py-4 rounded-lg'>
                <Thead>
                    <Tr>
                        <Th className='text-left ml-4 pl-5'>COURSES</Th>
                        <Th className='text-center'>DURATION</Th>
                        <Th>PRICE</Th>
                        <Th>ACTIONS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        courses.length === 0 ?
                            (
                                <Tr>
                                    <Td>
                                        No courses found
                                    </Td>
                                </Tr>
                            ) : (
                                courses.map((course) => (
                                    <Tr className='border-b-2 border-b-richblack-600 mb-4 px-2 py-1'
                                        key={course?._id}>
                                        <Td className='w-full flex gap-2 mb-8 ml-4'>
                                            <img
                                                src={course?.thumbnail}  // Replace with the actual image source
                                                alt={course?.courseName}
                                                className="w-80 mt-4 h-60 object-cover rounded-md"
                                            />
                                            <div className='my-auto ml-3'>
                                                <p className='text-2xl'>Course Name: <br /> {course.courseName}</p>
                                                <p className='text-sm text-richblack-300'>{course.courseDescription}</p>
                                                <p>Created: </p>
                                                <p className={`${course.status === "Published" ? "text-yellow-50" : "text-richblack-300"} font-semibold`}>Status: {course.status}</p>
                                            </div>
                                        </Td>

                                        <Td className='text-center'>
                                            {course?.duration} Sec
                                        </Td>
                                        <Td>
                                            ${course.price}
                                        </Td>
                                        <Td>
                                            <button 
                                            onClick={()=>{editHandler(course)}}
                                            className='px-2 py-1 text-yellow-50 text-2xl'> 
                                            <FiEdit /> 
                                            </button>
                                            <button
                                                className='text-2xl'
                                                onClick={() => {
                                                    setConfirmationModal({

                                                        text1: "Do you want to delete this course",
                                                        text2: "All the data related to this course will be deleted",
                                                        btn1Text: "Delete",
                                                        btn2Text: "Cancel",
                                                        btn1Handler: !loading ? () => handlecoursedelete(course._id) : () => { },
                                                        btn2Handler: !loading ? () => setConfirmationModal(null) : () => { },
                                                    })
                                                }}
                                            > <MdDeleteOutline /></button>
                                        </Td>
                                    </Tr>
                                ))
                            )
                    }
                </Tbody>
            </Table>
            {confirmationmodal && <ConfirmationModal modalData={confirmationmodal} />}
        </div>
                )
            }
        </div>
    )
}

export default InstructorCard
