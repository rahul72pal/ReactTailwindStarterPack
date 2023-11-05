import React from 'react'

const Links = ({element}) => {
    // console.log("ements.tile",element.title)
    // console.log("liks",element.links);
  return (
    <div className='border-3 border-pink-200'>
      <p>{element.title}</p>
      <div>
        {
            element.links.map((ele,index)=>(
                <div key={index} >
                    <p>{ele.title}</p>
                    {/* <p>{ele.link}</p> */}
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Links
