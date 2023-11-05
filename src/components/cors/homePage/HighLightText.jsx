import React from 'react'
import './Highlight.css'

const HighLightText = ({text}) => {
  return (
    <span className='font-bold  text-blue-100 '>
        {" "}
        {text}
    </span>
  )
}

export default HighLightText
