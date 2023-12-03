import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import ProgressBar from "@ramonak/react-progress-bar";
import 'react-circular-progressbar/dist/styles.css';


const VideoDetailsSidebar = ({ setReviwModal }) => {

    const
        {
            courseSectionData,
            courseEntireData,
            completedLectures,
            totalNoOfLectoures
        } = useSelector((state) => state.viewCourse)

    const location = useLocation();

    const [activeStatus, setActiveStatus] = useState("");
    const [videoBarActive, setVideoBarActive] = useState("");
    const navigate = useNavigate();
    const { sectionId, subsectionId } = useParams();

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subsection.findIndex(
                (data) => data._id === subsectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subsection?.
            [currentSubSectionIndex]?._id;
            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            // set current sub-section here
            setVideoBarActive(activeSubSectionId);
        })()
    }, [courseEntireData, courseSectionData, location.pathname]);

    console.log("COURSE entire DATA = ", courseSectionData,
        courseEntireData,
        completedLectures.length,
        totalNoOfLectoures);

    const percentage = Math.floor((completedLectures.length / totalNoOfLectoures) * 100);
    console.log(percentage)
    return (
        <div className="text-white flex flex-col h-screen bg-gray-800 py-4 bg-richblack-800">
            <div>
                <div className="flex justify-between px-3">
                    <button
                        onClick={() => {
                            navigate("/dashboard/enrolled-courses");
                        }}
                        className="bg-yellow-50 text-black px-2 py-1 rounded-xl font-semibold flex items-center gap-2 hover:bg-yellow-100"
                    >
                        <IoMdArrowRoundBack />
                        Back
                    </button>
                    <button
                        onClick={() => setReviwModal(true)}
                        className="bg-yellow-50 text-black px-2 py-1 rounded-xl font-semibold"
                    >
                        Add Review
                    </button>
                </div>
                <div className='py-5'>
                    <ProgressBar
                        completed={percentage}
                        bgColor="#f2eb1a"
                        labelColor="#000000"
                        labelAlignment="center"
                        className="text-yellow-100"
                    />
                </div>
                <div className="mt-4">
                    <p className="text-xl font-bold">{courseEntireData.courseName}</p>
                    <p>
                        {completedLectures?.length} / {totalNoOfLectoures}
                    </p>
                </div>
            </div>

            {/* Section and Subsection */}
            <div className="mt-8 w-full bg-richblack-700">
                {courseSectionData.map((section, index) => (
                    <div
                        onClick={() => setActiveStatus(section?._id)}
                        key={index}
                        className="cursor-pointer border-b-2 px-1 py-3 border-b-yellow-50"
                    >
                        {/* Section */}
                        <div className="flex items-center justify-between">
                            <div className="font-bold">{section?.sectionName}</div>
                            {/* Down arrow */}
                        </div>

                        {/* Subsection */}
                        <div className="">
                            {activeStatus === section?._id && (
                                <div>
                                    {section.subsection.map((topic, index) => (
                                        <div
                                            className={`flex gap-5 px-5 py-3 cursor-pointer ${videoBarActive === topic._id
                                                    ? "bg-yellow-100 text-black"
                                                    : "bg-gray-700"
                                                }`}
                                            key={index}
                                            onClick={() => {
                                                navigate(
                                                    `/view-courses/${courseEntireData?._id}/section/${section?._id}/subsection/${topic._id}`
                                                );
                                                setVideoBarActive(topic?._id);
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={completedLectures.includes(topic?._id)}
                                                onChange={() => { }}
                                                className="form-checkbox text-yellow-300"
                                            />
                                            <span className="text-white">{topic.title}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default VideoDetailsSidebar
