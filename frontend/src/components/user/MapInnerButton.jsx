import React from 'react'

function MapInnerButton({ image, onClick }) {
    return (
        <div>
            <button onClick={onClick} className='w-7 h-7 border-solid border border-gray-400 rounded-md hover:opacity-70 bg-white focus:outline-none'>
                <div className='w-3/4 h-3/4 m-auto' style={{ backgroundImage: `url('/assets/icons/${image}')`, backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                </div>
            </button>
        </div>
    )
}

export default MapInnerButton