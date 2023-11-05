import React from 'react'
import { Link } from 'react-router-dom'

const CTAbutton = ({children , active , linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`font-md flux items-center px-4 py-3 rounded-[10px] hover:scale-95 transition-all duration-200
        ${active? "bg-yellow-50 text-black ": "bg-richblack-800 text-white"} 
        `}>
            {children}
        </div>
    </Link>
  )
}

export default CTAbutton
