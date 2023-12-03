import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/opreations/studentFeatureApi'

const RenderTotalAmount = () => {

  const { total, cart } = useSelector((state) => state.card)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log("TOTAL CART IN RENTOALAMI = ",total,cart)

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    buyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total:</p>
      <p className="mb-6 text-3xl font-medium text-yellow-100">₹ {total}</p>
      <button className='w-full justify-center bg-yellow-25 py-2 px-1 text-black font-semibold rounded-xl' onClick={handleBuyCourse}>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount
