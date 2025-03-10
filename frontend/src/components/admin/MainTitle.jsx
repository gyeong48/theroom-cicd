import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainTitle({ content, button, path }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ pathname: `${path}` })
  }

  return (
    <div className='flex justify-between px-1 md:px-4 lg:px-7'>
      <div className='text-2xl lg:text-3xl font-bold'>{content}</div>
      {button &&
        <button onClick={handleClick} className='text-xs px-4 py-2 lg:text-base lg:px-6 lg:py-2 bg-black text-white rounded-md hover:opacity-75 focus:outline-none'>
          {button}
        </button>
      }
    </div>
  )
}

export default MainTitle