import React from 'react'

function CheckModal({ title, content, checkFn, cancelFn }) {
    return (
        <div className='fixed top-0 left-0 z-[1055] h-full w-full flex justify-center bg-black bg-opacity-20' onClick={cancelFn}>
            <div className='absolute bg-white shadow dark:bg-gray-700 opacity-100 w-full max-w-lg rounded mt-10 mb-10 mx-auto px-6'>
                <div className='justify-center bg-warning-400 mt-6 mb-6 text-base md:text-lg border-b-4 border-gray-500'>
                    {title}
                </div>
                <div className='text-sm pt-4 pb-4'>
                    {content}
                </div>
                <div className='flex justify-end space-x-2'>
                    <div
                        className='rounded bg-black my-4 px-4 py-2 text-xs text-white hover:cursor-pointer'
                        onClick={checkFn}
                    >
                        확인
                    </div>
                    <div
                        className='rounded bg-red-400 my-4 px-4 py-2 text-xs text-white hover:cursor-pointer'
                        onClick={cancelFn}
                    >
                        취소
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckModal