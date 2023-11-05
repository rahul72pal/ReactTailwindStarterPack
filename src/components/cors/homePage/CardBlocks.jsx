import React from 'react'
import {HiUsers} from 'react-icons/hi'
import {PiTreeStructureBold} from 'react-icons/pi'

const CardBlocks = ({heading,para,left,right,bg,text,icon,shadow}) => {
  return (
    <div className={`w-[341px] h-[] border-2 border-blue-50 bg-${bg} text-${text} shadow-${shadow}`}>
        <div className='pt-[32px] px-[24px] pb-[52px] h-[224px]'>
        <h1 className='font-semibold font-inter text-[20px] '>{heading}</h1>
        <p className='text-[16px] text-richblack-400 mt-3 '>{para}</p>
        </div>
        <div className= {`flex justify-between items-center py-[16px] px-[24px] border-t-2 border-dashed border-${icon} text-${icon}`}>
            <p className='flex justify-center items-center gap-1'> <HiUsers className='text-2xl'/> {left}</p>
            <p className='flex justify-center items-center gap-1'> {right}<PiTreeStructureBold className='text-xl'/></p>
        </div>
    </div>
  )
}

export default CardBlocks
