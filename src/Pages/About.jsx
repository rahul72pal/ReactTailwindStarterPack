import React from 'react'
import HighLightText from '../components/cors/homePage/HighLightText'
import img1 from '../assets/Images/aboutus1.webp'
import img2 from '../assets/Images/aboutus2.webp'
import img3 from '../assets/Images/aboutus3.webp'
import img4 from '../assets/Images/FoundingStory.png'
import Aboutbox from '../components/cors/Aboutpage/Aboutbox'
import Table from '../components/cors/Aboutpage/Table'
import Contactform from '../components/cors/Aboutpage/Contactform'
import RatingAndReviews from '../components/cors/RatingAndReviews/RatingAndReviews'
import Footer from '../components/cors/Footer/Footer'
import ReviewSlider from '../components/common/ReviewSlider'

const About = () => {
    return (
        <div className='text-white'>
            {/* this is about page */}
            {/* Contact form pendding */}

            {/* section 1 */}
            <div className=' bg-richblack-800 flex flex-col justify-center items-center px-[90px] py-[120px] gap-[52px] h-full'>
                {/* headings */}
                <div className='flex flex-col w-10/12 text-center justify-center items-center '>
                    <p className='px-[6px] py-[18px] text-richblack-200 text-[16px] text-center'>About us</p>
                    <h1 className=' text-center mt-7 mb-9 gap-1 text-[36px] w-8/12  '>Driving Innovation in Online Education for a <HighLightText text={"Brighter Future"} /></h1>
                    <p className='text-[16px] text-richblack-200 w-8/12 '>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                </div>
                {/* images */}
                <div className='flex gap-[24px] border-2 mb-[-220px]'>
                    <img src={img1} alt="" />
                    <img src={img2} alt="" />
                    <img src={img3} alt="" />
                </div>
            </div>

            {/* section 2 */}
            <div className='bg-richblack-900 px-[90px] py-[120px] mt-10'>
                <div className='text-[36px] text-center leading-[52px] text-richblack-100  '>
                    <span className='text-[40px] font-bold text-richblack-500'>"</span>
                    We are passionate about revolutionizing the way we learn. Our innovative platform <HighLightText text={"combines technology"} />,<span className='text-yellow-400'> expertise</span>,
                    and community to create an <span className='text-yellow-200  '>unparalleled educational experience.</span>
                    <span className='text-[40px] font-bold text-richblack-500'>"</span>
                </div>
            </div>

            {/* section 3 */}
            <div className='px-[80px] py-[120px] flex flex-col justify-center items-center '>
                {/* upper div  */}
                <div className='flex justify-center items-center gap-[98px] w-11/12 mb-9'>
                    {/* left */}
                    <div className='w-[50%]'>
                        <Aboutbox
                            heading={"Our Founding Story "}
                            para={
                                <div>
                                    Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of
                                    educators, technologists, and lifelong learners
                                    who recognized the need for accessible, flexible, and
                                    high-quality learning opportunities in a rapidly evolving digital world.
                                    <br />
                                    <br />

                                    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                                    We believed that education should not be confined to the walls of a classroom or restricted by
                                    geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of
                                    life to unlock their full potential.
                                </div>
                            }
                            color={"yellow-50"}
                        />
                    </div>
                    {/* right  */}
                    <div>
                        <img src={img4} alt="founding story" />
                    </div>
                </div>
                {/* lower div  */}
                <div className='flex justify-center items-center gap-[98px] w-10/12 mt-9'>
                    {/* left */}
                    <div>
                        <Aboutbox
                            heading={"Our Vision"}
                            para={
                                <div>
                                    With this vision in mind, we set out on a journey to create an
                                    e-learning platform that would revolutionize the way people learn. Our team of
                                    dedicated experts worked tirelessly to develop a robust and intuitive platform that
                                    combines cutting-edge technology with engaging content, fostering a dynamic and interactive
                                    learning experience.
                                </div>
                            }
                            color={"blue-100"}
                        />
                    </div>
                    {/* right  */}
                    <div>
                        <Aboutbox
                            heading={"Our Mission"}
                            para={
                                <div>
                                    our mission goes beyond just delivering courses online. We wanted to create
                                    a vibrant community of learners, where individuals can connect, collaborate,
                                    and learn from one another. We believe that knowledge thrives in an environment of
                                    sharing and dialogue, and we foster this spirit of collaboration through forums, live
                                    sessions, and networking opportunities.
                                </div>
                            }
                            color={"blue-100"}
                        />
                    </div>
                </div>
            </div>

            {/* section 4 */}
            <div className='flex flex-row justify-center items-center px-[80px] py-[120px] border-2 bg-richblack-700'>
                <div className='w-[25%] gap-3'>
                    <p className='text-4xl'>5K</p>
                    <p className='text-sm text-richblack-500 '>Active Students</p>
                </div>
                <div className='w-[25%]'>
                    <p className='text-4xl'>10+</p>
                    <p className='text-sm text-richblack-500 '>Mentors</p>
                </div>
                <div className='w-[25%]'>
                    <p className='text-4xl'>200+</p>
                    <p className='text-sm text-richblack-500 '>Courses</p>
                </div>
                <div className='w-[25%]'>
                    <p className='text-4xl'>50+</p>
                    <p className='text-sm text-richblack-500 '>Awards</p>
                </div>
            </div>

            {/* section 5 */}
            <div className='flex flex-row justify-center items-center px-[80px] py-[120px]'>
                <Table />
            </div>
            {/* section 6 */}
            <div className='flex flex-row justify-center items-center px-[80px] py-[120px]'>
                <Contactform />
            </div>


            {/* rating and review section  */}
            {/* <RatingAndReviews /> */}
            <ReviewSlider/>

            {/* footer */}
            <Footer />


        </div>
    )
}

export default About
