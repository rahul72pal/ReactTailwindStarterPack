import React from 'react'
import { useSelector } from 'react-redux'
import { AiFillCheckCircle } from 'react-icons/ai'
import CourseInformationForm from './courseInformation/CourseInformationForm'
import CourseBuilderForm from './courseBuilder/CourseBuilderForm'
import PublisherCourse from './PublisherCourse'

const RenderSteps = () => {

    // const { step } = useSelector((state) => state.course);
    const { step } = useSelector((state) => state.course);
    // const step = 2;
    // console.log("STEP = ", step);
    // console.log(useSelector((state) => state.course));


    const steps = [
        {
            id: 1,
            title: "Course Information",
        },
        {
            id: 2,
            title: "Course Builder",
        },
        {
            id: 3,
            title: "Publish",
        },
    ]

    // console.log(step);
    return (
        <>
            <div className=' h-full flex justify-center items-center w-full flex-col gap-x-2 '>

                <div className="flex w-[60%] items-center my-5">
                    {steps.map((item) => (
                        <React.Fragment key={item.id}>
                            <div
                                className={`${step === item.id
                                        ? 'bg-yellow-25 gap-4 text-black p-3 rounded-full text-2xl font-bold'
                                        : 'bg-richblack-700 gap-4 text-black p-3 rounded-full text-2xl font-bold'
                                    }`}
                            >
                                {step > 0 && step > item.id ? (
                                    <AiFillCheckCircle className='text-yellow-25' />
                                ) : (
                                    <div>{item.id}</div>
                                )}
                            </div>
                            {item.id !== steps.length && (
                                <div className="flex-1">
                                    {/* Dashed lines for connection */}
                                    <div className={`h-0.7 border-2 border-dashed  ${item.id <= step ? "border-yellow-25":"border-richblack-700"}`}></div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>


                <div className='flex w-[75%] items-center justify-around my-6 '>
                    {
                        steps.map((item, index) => (
                            <div key={index}>
                                <>
                                    <div  className={`${step === item.id
                                        ? 'text-yellow-25 rounded-full text-sm font-bold'
                                        : 'text-richblack-700 rounded-full text-sm font-bold'
                                    }`} >
                                        <p >{item.title}</p>
                                    </div>
                                </>
                            </div>
                        ))
                    }
                </div>

                {step === 1 && <CourseInformationForm />}
                {step === 2 && <CourseBuilderForm />}
                {step === 3 && <PublisherCourse />}
            </div>
        </>
    );

}

export default RenderSteps
