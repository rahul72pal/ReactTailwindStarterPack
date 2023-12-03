import React from 'react'

const Aboutbox = ({heading,para,color}) => {
  return (
    <div className='flex flex-col gap-[24px]'>
      <h1 className={`text-${color} text-5xl font-bold`}>{heading}</h1>
      <p className='text-sm '>{para}</p>
    </div>
  )
}

export default Aboutbox
