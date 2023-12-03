import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { getEnrollredCourses } from '../../../services/opreations/ProfileApi';
import Loading from '../../../Pages/Loading';
import CardComponent from '../Dashboard/Cardcomponent';

const EnrolledCourse = () => {

    // const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);

    const [enrolledcourse, setEnrolledcurses] = useState(null);

    // const getEnrollerdCourses = async() => {
    //     try {
    //         const response = await dispatch(getEnrollredCourses(token));
    //         setEnrolledcurses(response);
    //     } catch (error) {
    //         console.log(error);
    //         console.log("Unable to get the enrolledc courses")
    //     }
    // }

    // useEffect(()=>{
    //     getEnrollerdCourses()
    // },[])

    const getEnrolledCourses = useCallback(async () => {
        // Your logic for getting enrolled courses here
        try {
            const response = await getEnrollredCourses(token);
            setEnrolledcurses(response);
        }
        catch (error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }, [token]);

    // const getEnrolledCourses = async() => {
    //     try{
    //         const response = await getEnrollredCourses(token);
    //         setEnrolledcurses(response);
    //     }
    //     catch(error) {
    //         console.log("Unable to Fetch Enrolled Courses");
    //     }
    // }

    useEffect(() => {
        getEnrolledCourses();
    }, [getEnrolledCourses]);

    console.log("Enrolled courses = ", enrolledcourse);
    return (
        <div className='h-screen w-9/12 mt-[300px] px-3 rounded-sm'>
            {!enrolledcourse ? (
                <Loading />
            ) : (
                enrolledcourse && enrolledcourse.length > 0 ? (
                    <div className='flex flex-col w-full flex-wrap gap-3 p-4'>
                        {enrolledcourse.map((course, index) => (
                            <CardComponent key={index} course={course} />
                        ))}
                    </div>
                ) : (
                    <p className='text-center text-gray-500 mt-8'>No enrolled courses found</p>
                )
            )}
        </div>
    )
}

export default EnrolledCourse
