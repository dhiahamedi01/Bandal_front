import React from 'react'

const Color = ({ children , props}) =>{
    const divStyle = {
        backgroundColor: children,
    }
  return (
    <div  onClick={()=>props(children)} style={divStyle} className='rounded-circle color-circle-main'></div>
  )
}
export default Color