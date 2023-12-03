import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullCourseDetials } from '../services/opreations/courseDetailsApi';
import {
    setCompletedNoOfLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures
} from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/cors/ViewCourse/VideoDetailsSidebar';
import CourseReviwModal from '../components/cors/ViewCourse/CourseReviwModal';

const ViewCourse = () => {

    const [reviewModal, setReviwModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullCourseDetials({ courseId }, token);
            dispatch(setCourseSectionData(courseData?.course?.courseContent));
            dispatch(setEntireCourseData(courseData?.course));
            dispatch(setCompletedNoOfLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.course?.courseContent?.forEach((sec) => {
                lectures += sec.subsection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
            // console.log("COURSE DATA IN VIEW COURSE and lecture = ",courseData,lectures);
        }
        setCourseSpecificDetails();
    }, []);



    return (
        <>
            <div className="w-full flex items-stretch border-2 pr-6">
                {/* Video Details Sidebar */}
                <div className="w-1/5 border-r-2 border-r-yellow-50 h-screen">
                    <VideoDetailsSidebar setReviwModal={setReviwModal} />
                </div>

                {/* Video Outlet */}
                <div className="flex-grow border-2">
                    <Outlet />
                </div>
            </div>


            {reviewModal && <CourseReviwModal setReviwModal={setReviwModal} />}
        </>

    )
}

export default ViewCourse
