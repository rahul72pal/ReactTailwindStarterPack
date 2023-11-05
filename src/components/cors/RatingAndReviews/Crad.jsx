import React from 'react'
import {FaStar,FaStarHalf} from 'react-icons/fa'
import {AiOutlineStar} from 'react-icons/ai'

const Crad = ({review , rating}) => {

    const ratingstars = Array.from({length:5},(e,index)=>{

        let number = index + 0.5;
        // console.log(index,number)
        return (
          <span key={index}>
            {
              rating >=  index +1 ? (<FaStar/>)
              : rating >= number ? (<FaStarHalf/>)
              : (<AiOutlineStar/>)
              
            }
          </span>
        )
        
      })

  return (
    <div className='bg-richblack-800 w-[327px] h-[184px] text-white p-[12px]'>
      {/* this is rating and review card section  */}
      {/* user */}
      <div>
         {/* image  */}
         <div></div>
         {/* details  */}
         <div>
            <p className='text-[14px]'>name</p>
            <p className='text-[12px] text-richblack-600'>email</p>
         </div>
      </div>

      {/* review  */}
      <div>{review}</div>
    
      {/* rating  */}
      <span className='flex text-yellow-50 items-center gap-1 '>{rating} {ratingstars}</span>
    </div>
  )
}

export default Crad
