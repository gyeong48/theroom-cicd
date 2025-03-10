import React from 'react'

function FetchingModal() {
    return (
        <div className='fixed top-0 left-0 z-[1055] h-full w-full flex justify-center place-items-center bg-black bg-opacity-20'>
            <div
                className='shadow dark:bg-gray-700 opacity-100 flex justify-center items-center
                w-1/4 h-1/4 rounded-3xl min-w-[600px]'
            >
                <div className='text-4xl font-extrabold text-black m-20'>
                    Loading.....
                </div>
            </div>
        </div>
    )
}

export default FetchingModal