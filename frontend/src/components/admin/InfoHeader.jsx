import React from 'react'

function InfoHeader({ items }) {
    return (
        <div className='hidden lg:block'>
            <div className='grid lg:grid-cols-3 xl:space-y-0 justify-between border rounded-md border-gray-800 p-4 bg-gray-800'>
                {items.map((item, index) => (
                    <div key={index} className='text-white lg:text-center'>{item}</div>
                ))}
            </div>
        </div>
    )
}

export default InfoHeader