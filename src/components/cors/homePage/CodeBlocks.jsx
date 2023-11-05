import React from 'react'
// import HighLightText from './HighLightText'
import CTAbutton from './CTAbutton'
// import {FiArrowRight} from 'react-icons/fi'
import { TypeAnimation } from 'react-type-animation'
import { useState } from 'react'

const CodeBlocks = ({heading , subheading ,ctabtn1 , ctabtn2 ,codeblock, css}) => {
  const [animationKey, setAnimationKey] = useState(0);

  const handleAnimationFinish = () => {
    setAnimationKey(animationKey + 1);
  };
  return (
    <div className={`${css} justify-center items-center gap-[200px] px-[6rem] py-[5rem] `}>

      {/* box1 */}
      <div className=' w-[40%] h-full '>

        {/* heading */}
        <h1 className='text-[36px]'>
        {heading}
        </h1>

        {/* parag */}
        <p className='text-[16px] text-richblack-300'>
        {subheading}
        </p>

        {/* butoons */}
        <div className='flex pt-[52px] gap-[24px]'>
          <CTAbutton  linkto={ctabtn1.linkto} active={ctabtn1.active} className='flex'>
            {ctabtn1.btntext}
          </CTAbutton>
          <CTAbutton children={ctabtn2.btntext} linkto={ctabtn2.linkto} active={ctabtn2.active} />
        </div>

      </div>

      {/* box2 */}
      <div className='w-[30%] text-[14px] p-[8px] flex justify-center gap-1 '>
        {/* number line */}
        <div className='w-[4%]'>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10 </p>
          <p>11 </p>
        </div>
        {/* code  */}
        <div className='w-[500px] h-[270px] text-yellow-5 overflow-auto '>
          <TypeAnimation
          key={animationKey}
          sequence={[codeblock , 5000,""]}
          onFinish={handleAnimationFinish}
          repeat={Infinity}
          cursor={true}

          style={
            {
              whiteSpace: "pre-line",
              display:"block",
            }
          }
          />
        </div>
      </div>

    </div>
  )
}

export default CodeBlocks
