import React from 'react'
import Crad from './Crad'

const RatingAndReviews = () => {
  return (
    <div className='flex flex-col justify-center items-center px-[90px] py-[120px] gap-[52px]'>
        {/* this is review page components */}

        {/* heading  */}
        <div className='text-white text-[36px] text-center'>Reviews from other learners</div>

        {/* cards  */}
        <div className='flex gap-4'>
            <Crad review={"Coordination of activities improved tremendously with Learn codings ."} rating={3.5}/>
            <Crad review={"Coordination of activities improved tremendously with Learn codings ."} rating={4.5}/>
            <Crad review={"Coordination of activities improved tremendously with Learn codings ."} rating={2.5}/>
            <Crad review={"Coordination of activities improved tremendously with Learn codings ."} rating={5}/>
        </div>
    </div>
  )
}

export default RatingAndReviews
