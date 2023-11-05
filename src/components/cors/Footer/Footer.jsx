import React from 'react'
import {FooterLink2} from '../../../data/footer-links'
import Links from './Links'

const Footer = () => {
  return (
    <div className='w- h-[728px] border-1 border-richblack-600 px-[52px] py-[120px] gap-[32px] bg-richblack-600'>
        {/* uperdiv */}
        <div className='h-[538px] gap-[52px] flex flex-row'>
            {/* details  */}
            <div className='w-[584px] border-2 border-blue-200'></div>

            {/* simple HRline */}
            <div></div>

            {/* links */}
            <div className='gap-[12px] flex border-2 border-blue-200'>
                {
                    FooterLink2.map((element,index)=>(
                        <div key={index} className='flex border-2 border-pink-200'>
                            <Links element={element}/>
                        </div>
                    ))
                }
            </div>
        </div>
        {/* lowerdiv */}
        <div className='h-[22px] gap-[8px]'></div>
    </div>
  )
}

export default Footer
