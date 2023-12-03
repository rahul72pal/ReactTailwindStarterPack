import React from 'react'
// import CourseForm from './CourseForm'
import RenderSteps from './RenderSteps'

export default function AddCourses() {
    return (
        < >
            <div className='h-screen mt-20 w-full'>
                <div className='flex lg:flex-row w-full h-fit flex-col justify-center items-center'>

                    <div className='h-screen mt-20 mx-auto w-full lg:w-2/3'>
                        <h1 className='text-center text-3xl font-semibold mb-4'>Add Courses</h1>
                        <div className='w-full p-6 rounded shadow-md'>
                            <RenderSteps />
                        </div>
                    </div>

                    <div className='h-screen mt-20 ml-10 w-1/3'>
                        <div className=' p-6 rounded shadow-md'>
                            <p className='text-lg font-semibold mb-2'>Code Upload Tips</p>
                            <ul className='list-disc pl-5'>
                                <li>Set the Course Price option or make it free.</li>
                                <li>Standard size for the course thumbnail is 1024x576.</li>
                                <li>Video section controls the course overview video.</li>
                                <li>Course Builder is where you create & organize a course.</li>
                                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                                <li>Information from the Additional Data section shows up on the course single page.</li>
                                <li>Make Announcements to notify any important notes to all enrolled students at once.</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

