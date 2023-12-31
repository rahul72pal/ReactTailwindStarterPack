import React from 'react'
// import './Home.css'
import "../App.css"
import {FiArrowRight} from 'react-icons/fi'
import {FaGraduationCap} from 'react-icons/fa'
import {MdOutlineDiamond} from 'react-icons/md'
import {BsFillFileCodeFill} from 'react-icons/bs'
import {PiMedal} from 'react-icons/pi'
import { Link } from 'react-router-dom'
import image from '../assets/Images/boxoffice.png'
import HighLightText from '../components/cors/homePage/HighLightText'
import CTAbutton from '../components/cors/homePage/CTAbutton'
import CodeBlocks from '../components/cors/homePage/CodeBlocks'
import CardBlocks from '../components/cors/homePage/CardBlocks'
import frame from '../assets/Images/Frame 60.jpg'
import Smallblocks from '../components/cors/homePage/Smallblocks'
import TimelineImage from '../assets/Images/TimelineImage.png'
import img1 from '../assets/Images/Compare_with_others.png'
import img2 from '../assets/Images/Know_your_progress.png'
import img3 from '../assets/Images/Plan_your_lessons.png'
import instructor from '../assets/Images/Instructor.png'
import RatingAndReviews from '../components/cors/RatingAndReviews/RatingAndReviews'
import Footer from '../components/cors/Footer/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
import Banner from '../assets/Images/banner.mp4'
import ExploreMore from '../components/cors/homePage/ExploreMore'

function Home() {
  return (
    <div className='relative'>
      {/* this is Home Page */}
      {/* section 1 */}
      <section className='flex flex-col justify-center items-center text-white  font-inter '>

        {/* box1 */}
        <div className='flex flex-col justify-center items-center  mt-14 w-[60%] mb-14 '>

          {/* become an instructor */}
          <Link to="/signup" className='flex items-center gap-2 px-4 py-2 bg-richblack-800 text-richblack-100 text-[19px] mx-7 rounded-[20px]'>
          <button className=' font-semibold'>Become an instructor </button>
          <FiArrowRight className='mt-1'/>
          </Link>

          {/* Heading box */}
          <div className='text-center mt-7  '>
            <div className="flex justify-center items-center mt-7 mb-9 gap-1 text-[36px]">
             Empower Your Future with Your <HighLightText text={" Coding Skills"}/>
            </div>
            
            <p className='font-medium leading-5 text-richblack-300'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. </p>
          </div>

          <div className='flex mt-8 gap-6 mb-5'>
          <CTAbutton children={"Learn more"} active={true} linkto={'/signup'}/>
          <CTAbutton children={"Book a demo"} active={false} linkto={'signup'}/>
          </div>

        </div>

        {/* box2 */}
        <div className='w-[935px] h-[415px] mb-16 shadow-blue-200 '>
          {/* image */}
          {/* <img src={image} alt="boxoffice iamge" /> */}
          <video
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        {/* box3 */}
        <div>
            <CodeBlocks 
            heading=
            {
              <div>
                Unlock your {<HighLightText text={"coding potential"}/>} with our online courses.
              </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1=
            {
              {
                btntext: (<div className='flex items-center gap-4'>Try it Yourself <FiArrowRight/></div>),
                linkto: "/singup",
                active: true,
              }
            }
            ctabtn2=
            {
              {
                btntext: "Learn More",
                linkto: "/singup",
                active: false,
              }
            }

            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example<\n/title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two<\n/a><ahref="three/">Three</a>\n/nav>`}
            css={'flex'}
            />
        </div>

        {/* box4 */}
        <div>
        <CodeBlocks 
            heading=
            {
              <div className='flex flex-col'>
                <div>Start <HighLightText text={"coding"}/></div>
                <HighLightText text={"in seconds"}/>
              </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1=
            {
              {
                btntext: (<div className='flex items-center gap-4'>Continue Lesson <FiArrowRight/></div>),
                linkto: "/singup",
                active: true,
              }
            }
            ctabtn2=
            {
              {
                btntext: "Learn More",
                linkto: "/singup",
                active: false,
              }
            }

            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example<\n/title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</a><ahref="two/">Two<\n/a><ahref="three/">Three</a>\n/nav>`}
            css={'flex flex-row-reverse'}
            />
        </div>

        {/* box5 */}
        <div className='px-[130px] py-[100px] flex flex-col justify-center items-center gap-[98px]  z-10'>

          {/* headings */}
          <div>
            <h1 className='text-[36px] text-center'>Unlock the <HighLightText text={"Power of Code"}/> </h1>
            <p className='text-[16px] text-center text-richblack-400'>Learn to Build Anything You Can Imagine</p>
          </div>

          {/* blocks */}
          {/* <div className='flex px-[32px] pt-[52px]  gap-[36px] '>
            <CardBlocks
            heading={"Learn HTML"}
            para={"This course covers the basic concepts of HTML including creating and structuring web pages, adding text, links, images, and more."}
            left={"Beginner"}
            right={"6 Lessons"}
            bg={"white"}
            text={"black"}
            icon={"blue-500"}
            shadow={"[12px_12px_0px_0px_rgb(225,214,10,1)]"}
            />
            <CardBlocks
            heading={"Learn CSS"}
            para={"This course explores advanced topics in HTML5 and CSS3, including animations, transitions, and layout techniques"}
            left={"Beginner"}
            right={"6 Lessons"}
            bg={"richblack-800"}
            icon={"richblack-400"}
            />
            <CardBlocks
            heading={"Responsive Web design"}
            para={"This course teaches responsive web design techniques, allowing web pages to adapt to different devices and screen sizes"}
            left={"Beginner"}
            right={"6 Lessons"}
            bg={"richblack-800"}
            icon={"richblack-400"}
            />
          </div> */}

          <ExploreMore/>

          <div className='flex  gap-[24px]'>
            <CTAbutton 
            children=
            {
              <div className='flex items-center gap-1 text-bold'>
                Explore Full Catalog
                <FiArrowRight/>
              </div>
            }
            active={true}
            linkto={"/signup"}
            />
            <CTAbutton
            children={"Learn More"}
            active={false}
            linkto={"/signup"}
            />
          </div>

        </div>
      </section>

       {/* frame  */}
      {/* <div className='absolute top-[2347px] z-0 bg-white '>
        <img  src={frame} alt="frame" />
        {/* <img  src={frame} alt="frame" /> */}
        {/* <div className='homebgframe'></div> }
      </div> */}

      {/* section 2 */}
      <section className='bg-white relative flex flex-col px-[140px] py-[120px] gap-[52px]'>
        {/* box 1 */}
        <div className='flex'>
          <div>
            <h1 className='font-semibold text-[36px] font-inter'>Get the skills you need for <HighLightText text={"a job that is in demand."}/> </h1>
          </div>
          <div className='flex flex-col'>
            <p className='text-[16px] text-richblack-700'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
            <div className='pt-[36px] w-[137px]'>
            <CTAbutton children={"Learn More"} 
            linkto={""} active={true}/>
            </div>
          </div>
        </div>
        {/* box 2 */}
        <div className='flex justify-center gap-[76px]'>
          {/* list section  */}
          <div className='pt-[80px]'>
            {/* small block  */}
            <Smallblocks
            heading={"Leadreship"}
            subheading={"Fully Committed to the success company"}
            icons={<PiMedal/>}
            />
            <Smallblocks
            heading={"Responsibility"}
            subheading={"Students will always be our top priority"}
            icons={<FaGraduationCap/>}
            />
            <Smallblocks
            heading={"Flexibility"}
            subheading={"The ability to switch is an important skills"}
            icons={<MdOutlineDiamond/>}
            />
            <Smallblocks
            heading={"Solve the problem"}
            subheading={"Code your way to a solution"}
            icons={<BsFillFileCodeFill/>}
            />
          </div>
          {/* image section 1 */}
          <div className='w-[741px] h-[545px] relative'>
            <img src={TimelineImage} alt="TimelineImage" />
            {/* box 3 */}
            <div className='flex absolute  top-[30rem] right-[8rem] gap-[52px] w-[511px] h-[128px] p-[42px] bg-caribbeangreen-700 '>
              <div className='flex justify-center items-center gap-[24px]'>
                <p className='text-white text-[36px]'>10</p>
                <p className='text-caribbeangreen-300 text-[14px]'>YEARS <br/> EXPERIENCES</p>
              </div>
              <div className='w-[2px] border-1 bg-caribbeangreen-500 rotate-180'></div>
              <div className='flex justify-center items-center gap-[24px]'>
                <p className='text-white text-[36px]'>250</p>
                <p className='text-caribbeangreen-300 text-[14px] '>TYPES OF <br/> COURSES</p>
              </div>
            </div>
          </div>
        </div>
        
      </section>

      {/* section 3 */}
      <section className='flex flex-col justify-center items-center px-[90px] py-[120px] gap-[52px] bg-white'>
        {/* box 1 */}
        <div>
          {/* layer1 */}
          <div className='text-[36px] font-semibold text-center'>Your swiss knife for <HighLightText text={"learning any language"}/></div>
          {/* layer2 */}
          <div className='text-[16px] w-[760px] text-center text-richblack-700'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</div>
        </div>
        {/* box 2 */}
        <div className='flex'>
          <img src={img2} alt="know your progress" className='w-[441px] h-[440px] mr-[-90px]' />
          <img src={img1} alt="comapare with others" className='w-[441px] h-[508px] mr-[-120px]' />
          <img src={img3} alt="plan your lessons"  className='w-[441px] h-[446px]'/>
        </div>
        {/* box 3 */}
        <div>
          <CTAbutton children={"Learn More"} linkto={""} active={true}/>
        </div>
      </section>

      {/* section 4 */}
      <div className='flex flex-row justify-center items-center px-[90px] py-[120px] gap-[52px]'>
        {/* box1 */}
        <div className='flex gap-[98px]'>
          {/* image */}
          <div className='w-[616px] h-[544px]' >
            <img className=' shadow-[-20px_-20px_0px_0px_rgb(225,225,225,1)]' src={instructor} alt="Instructor" />
          </div>
          {/* container */}
          <div className='flex flex-col w-[486px] h-[284px]'>
            {/* heading  */}
            <div className='text-white text-[36px]'>Become an <br/> <HighLightText text={"instructor"}/></div>
            {/* subheading */}
            <div className='text-richblack-300 text-[16px] leading-7 '>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
            {/* btn  */}
            <div className='pt-[52px] w-[211px] '>
            <CTAbutton children={
              <div className='flex items-center gap-2'>
                Start Teaching Today <FiArrowRight/>
              </div>
            }
            linkto={""}
            active={true}
            />
            </div>
          </div>
        </div>
        {/* box2 */}
        <div></div>
      </div>

      {/* rating and review section  */}
      {/* <RatingAndReviews/> */}
      <ReviewSlider/>

      {/* footer */}
      <Footer/>
      

    </div>
  )
}

export default Home
