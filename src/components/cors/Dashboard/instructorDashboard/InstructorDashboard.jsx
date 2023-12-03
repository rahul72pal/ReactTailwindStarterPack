import React from 'react'
import { useEffect } from 'react'
import { getInstructorDashboard } from '../../../../services/opreations/ProfileApi'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Loading from '../../../../Pages/Loading'
import { getinstructorCourses } from '../../../../services/opreations/courseDetailsApi'
import InstructorChart from './InstructorChart'

const InstructorDashboard = () => {

    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState();
    const [courses, setCourses] = useState([])
    const [instructorCourses, setInstructorCourses] = useState([])
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        const instructorData = async (token) => {
            setLoading(true);
            const result = await getInstructorDashboard(token)
            const instCourses = await getinstructorCourses(token);
            // console.log("INSTRUCORE DATA IS HERE = ",result);
            setCourses(result);
            setInstructorCourses(instCourses);
            setLoading(false);
        }
        instructorData(token);
    }, [])


    console.log("INSTRUCORE DATA IS HERE = ", courses);
    console.log("instructorCourses DATA IS HERE = ", instructorCourses);

    const totalAmount = courses?.reduce((acc, curr) => acc + curr.totalAmountGenrated, 0);
    const totalStudents = courses?.reduce((acc, curr) => acc + curr.totalStudentEnrolled, 0);

    if (loading) {
        return (
            <div>
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <div>
                <h1>Hi {user?.firstName}</h1>
                <p>Let's start something new</p>
            </div>

            <div>
                {
                    courses?.length > 0 && (
                        <div>

                            <div>
                                <div>
                                    <InstructorChart courses={courses}/>
                                </div>

                                <div>
                                    <p>Statics</p>

                                    <div>
                                        <p>Total Courses</p>
                                        <p>{courses.length}</p>
                                    </div>
                                    <div>
                                        <p>Total Students</p>
                                        <p>{totalStudents}</p>
                                    </div>
                                    <div>
                                        <p>Total Income</p>
                                        <p>{totalAmount}</p>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div>
                                    <p>Your courses</p>
                                    <Link to={'/dashboard/my-courses'}>
                                        View all
                                    </Link>
                                </div>

                                <div>
                                    {
                                        instructorCourses.length > 0 ? (
                                            <div className='flex w-full'>
                                                {
                                                    instructorCourses.slice(0, 3).map((course) => (
                                                        <div className='w-[400px]'>
                                                            <img src={course.thumbnail} alt="courseImage" className='w-[100px]' />

                                                            <div>
                                                                <p>{course.courseName}</p>
                                                                <div className='flex gap-4'>
                                                                    <p>Students: {course.studentenrolled.length}</p>
                                                                    <p>|</p>
                                                                    <p>Rs {course.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) : (<div>
                                            <p>You Have not create the course Go to make the course</p>
                                            <Link to={'/dashboard/add-courses'}>Add Course</Link>
                                        </div>)
                                    }
                                </div>
                            </div>

                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default InstructorDashboard
