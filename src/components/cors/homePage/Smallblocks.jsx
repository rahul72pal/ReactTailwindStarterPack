import React from 'react'

const Smallblocks = ({heading,subheading,icons}) => {
  return (
    <div className='px-[16px] py-[12px] flex  gap-[24px]'>
      <div className='grid place-content-center text-[24px]'>
        {icons}
      </div>
      <div className='flex flex-col'>
        <p className='text-[18px] text-richblack-800'>{heading}</p>
        <p className='text-[14px] text-richblack-700'>{subheading}</p>
      </div>
    </div>
  )
}

export default Smallblocks
