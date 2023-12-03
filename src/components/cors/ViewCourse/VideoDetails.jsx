import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/opreations/courseDetailsApi';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import { Player } from 'video-react';
// import '~video-react/dist/video-react.css'; // import css
import "video-react/dist/video-react.css";
import { FaPlay } from "react-icons/fa";
import toast from 'react-hot-toast';

const VideoDetails = () => {


  const { courseId, sectionId, subsectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse);
  const location = useLocation();

  const [videoData, setVideoData] = useState([])
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("COURSE SECTION DATA =", courseSectionData);
  console.log("COURSE SECTION DATA =", courseSectionData);
  console.log("sectionId =", sectionId);
  console.log("SubsectionId =", subsectionId);


  useEffect(() => {

    const setVideoSpecificDetails = () => {

      if (!courseSectionData.length || !sectionId || !subsectionId) return;
      if (!courseSectionData.length) return;
      if (!courseId && !sectionId && !subsectionId) {
        navigate("/dashboard/enrolled-courses");
      }
      else {
        //lets assume k all 3 fields are present

        const filterData = courseSectionData.filter(
          (course) => course._id === sectionId
        )

        if (filterData.length === 0) {
          console.log("Section not found");
          // toast.loading("Loading...");
          return;
        }

        const filteredVideoData = filterData && filterData[0]?.subsection.filter(
          (data) => data._id === subsectionId
        )

        if (filteredVideoData.length === 0) {
          console.log("Subsection not found");
          // toast.loading("Loading...");
          return;
        }

        console.log("filteredVideoData =", filteredVideoData);

        setVideoData(filteredVideoData[0]);
        setVideoEnded(false);
      }
    }
    setVideoSpecificDetails();
  }, [courseEntireData, courseSectionData, location.pathname])


  const isFirstVideo = () => {

    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const currentsubsectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
      (data) => data._id === subsectionId
    )
    if (currentSectionIndex === 0 && currentsubsectionIndex === 0) {
      return true;
    }

    else {
      return false;
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfSubsection = courseSectionData[currentSectionIndex].subsection.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
      (data) => data._id === subsectionId
    )

    console.log("PPPPPPPPPPP=", currentSubSectionIndex, noOfSubsection - 1);
    if (currentSectionIndex === courseEntireData.courseContent.length - 1 &&
      currentSubSectionIndex === noOfSubsection - 1) {
      return true;
    }

    else {
      return false;
    }
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )

    const noOfsubSection = courseSectionData[currentSectionIndex]?.subsection?.length;

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subsection.findIndex(
      (data) => data._id === subsectionId
    )


    //same section ki next video pr jana h
    if (currentSubSectionIndex !== noOfsubSection - 1) {
      const nextsubsectionId = courseSectionData[currentSectionIndex].subsection[currentSubSectionIndex + 1]._id;
      //iss video pr jao
      navigate(`/view-courses/${courseId}/section/${sectionId}/subsection/${nextsubsectionId}`)
    }
    else {
      //diffrent section ki first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextsubsectionId = courseSectionData[currentSectionIndex + 1].subsection[0]._id;
      // go to next video
      navigate(`/view-courses/${courseId}/section/${nextSectionId}/subsection/${nextsubsectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subsection.findIndex((data) => data._id === subsectionId);

    // Check if it's the first video in the section
    if (currentSubSectionIndex !== 0) {
      // Go to the previous video in the same section
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subsection[
          currentSubSectionIndex - 1
        ]._id;
      // Navigate to the previous video
      navigate(
        `/view-courses/${courseId}/section/${sectionId}/subsection/${prevSubSectionId}`
      );
    } else {
      // Check if it's the first section
      if (currentSectionIndex !== 0) {
        // Go to the last video of the previous section
        const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
        const lastSubSectionIndex =
          courseSectionData[currentSectionIndex - 1].subsection.length - 1;
        const lastSubSectionId =
          courseSectionData[currentSectionIndex - 1].subsection[
            lastSubSectionIndex
          ]._id;
        // Navigate to the last video of the previous section
        navigate(
          `/view-courses/${courseId}/section/${prevSectionId}/subsection/${lastSubSectionId}`
        );
      }
      // If it's the first section and the first video, do nothing (already at the beginning)
    }
  };


  const handleLectureCompletion = async () => {
    // dummy code , 
    setLoading(true);

    const res = await markLectureAsComplete({ courseId: courseId, subsectionId: subsectionId }, token);
    if (res) {
      dispatch(updateCompletedLectures(subsectionId));
    }

    setLoading(false);
  }

  return (
    <div className='text-white w-full h-full flex flex-col justify-center items-center'>
      {!videoData ? (
        <div className='text-lg font-semibold text-red-500'>No Data Found</div>
      ) : (
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
          className='relative z-0'
        >
          <FaPlay className='absolute text-4xl text-white' />

          {videoEnded && (
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full h-full flex flex-col justify-center items-center p-4'>
              {!completedLectures.includes(subsectionId) && (
                <button
                  onClick={() => handleLectureCompletion()}
                  className='bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-md mb-2 text-black text-lg font-semibold transition duration-300 ease-in-out'
                >
                  {!loading ? "Mark As Completed" : "Loading..."}
                </button>
              )}

              <button
                onClick={() => {
                  if (playerRef?.current) {
                    playerRef.current?.seek(0);
                    setVideoEnded(false);
                  }
                }}
                className='bg-white text-lg font-semibold text-black px-4 py-2 rounded-md mb-2 hover:bg-white transition duration-300 ease-in-out'
              >
                Rewatch
              </button>

              <div className='flex gap-6 mt-10'>
                {!isFirstVideo() && (
                  <button
                    onClick={goToPrevVideo}
                    className='bg-richblack-700 text-lg font-semibold text-white px-4 py-2 rounded-md hover:bg-richblack-600 transition duration-300 ease-in-out'
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    onClick={goToNextVideo}
                    className='bg-yellow-50 text-lg text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-100 transition duration-300 ease-in-out'
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </Player>
      )}

      <h1 className='text-2xl font-bold my-4'>{videoData?.title}</h1>
      <p className='text-gray-300'>{videoData?.description}</p>
    </div>

  )
}

export default VideoDetails
