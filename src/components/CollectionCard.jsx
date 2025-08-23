import React from 'react'

const CollectionCard = () => {
  return (
    <div className='bg-image'>
    <img src='https://mdbootstrap.com/img/new/standard/city/053.webp' className='img-fluid' alt='Sample' width={200} height={250} />
    <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }} width={200} height={250}>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <p className='text-white mb-0'>Can you see me?</p>
      </div>
    </div>
  </div>
  )
}

export default CollectionCard






 