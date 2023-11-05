import React from 'react'

const Dropdown = (props) => {
  return (
    <div className='ul'>
     <li className='li'>
       {/* <img src={props.image}></img> */}
       <p>{props.imgtag}</p>
       <p>{props.text}</p>
     </li>
    </div>
  )
}

export default Dropdown
