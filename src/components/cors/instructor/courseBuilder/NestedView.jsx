import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from 'react-icons/rx';
import { FiEdit, FiPlus } from 'react-icons/fi';
import { MdDeleteOutline } from 'react-icons/md'
import { AiOutlineCaretDown } from 'react-icons/ai'
import SubSectionModal from './SubSectionModal'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteSection, deleteSubSection } from '../../../../services/opreations/courseDetailsApi';
import { setCourse } from '../../../../slices/courseSlice';

const NestedView = ({ handleChangeSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationmodal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._Id
        }, token);

        if (result) {
            console.log("HANDLE DELETE SECTION DISPATCH RESULT = ",result);
            dispatch(setCourse(result))
        }
        setConfirmationModal(null)
    }

    const handleDeleteSubSection = async (subsectionId, sectionId) => {
        console.log("SUBSECTION ID = ",subsectionId);
        console.log("SECTION ID = ",sectionId);
        const result = await deleteSubSection({
            sectionId,
            subsectionId
        }, token);

        if (result) {
            const updatedCourseCountent = course.courseContent.map((section) =>
                section._id === sectionId ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseCountent };
            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null);
    }

    // console.log("COURSE IN NESTED VIEW = ", course.courseContent[0])

    return (
        <div className="p-3 text-xl w-10/12 text-white bg-richblack-700">
            {course?.courseContent?.map((section) => (
                <details key={section._id} className="flex flex-col gap-3 border-b-2 pb-3">

                    <summary className="flex items-center justify-between gap-x-3 bg-gray-800 px-2 py-3 rounded-md">
                        <div className="flex items-center gap-2">
                            <RxDropdownMenu className="text-2xl text-yellow-300" />
                            <p>{section.sectionName}</p>
                        </div>
                        <div className="flex gap-x-2">
                            <button onClick={() => handleChangeSectionName(section._id, section.sectionName)}>
                                <FiEdit />
                            </button>
                            <button
                                onClick={() => {
                                    setConfirmationModal({
                                        text1: "Delete this Section",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    });
                                }}
                            >
                                <MdDeleteOutline />
                            </button>
                            <span>|</span>
                            <AiOutlineCaretDown />
                        </div>
                    </summary>

                    <div>
                        {section?.subsection.map((data) => (
                            <div
                                key={data?._id}
                                onClick={() => setViewSubSection(data)}
                                className="flex items-center justify-between gap-x-2 bg-gray-700 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-600"
                            >
                                <div className="flex items-center gap-2 ml-2">
                                    <RxDropdownMenu className="text-2xl text-yellow-300" />
                                    <p className="text-yellow-100 text-1.5sm ">{data.title}</p>
                                </div>

                                <div 
                                onClick={(e)=>e.stopPropagation()}
                                className="flex gap-x-2">
                                    <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                        <FiEdit />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmationModal({
                                                text1: "Delete this Subsection",
                                                text2: "The lectures in this Subsection will be deleted",
                                                btn1Text: "Delete",
                                                btn2Text: "Cancel",
                                                btn1Handler: () => handleDeleteSubSection(data._id,section._id),
                                                btn2Handler: () => setConfirmationModal(null),
                                            });
                                        }}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => setAddSubSection(section._id)}
                            className="mt-4 flex items-center gap-x-2 text-yellow-50 cursor-pointer"
                        >
                            <FiPlus />
                            <p>Add Lecture</p>
                        </button>
                    </div>

                </details>
            ))}

            {addSubSection && (
                <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />
            )}
            {viewSubSection && (
                <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />
            )}
            {editSubSection && (
                <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />
            )}
            {confirmationmodal && <ConfirmationModal modalData={confirmationmodal} />}
        </div>


    )
}

export default NestedView
