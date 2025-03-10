import React from 'react'
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

function InfoBox({ id, row1, row2, row3 }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate({ pathname: `./${id}` })
    }

    return (
        <div
            className='grid grid-cols-1 space-y-2 lg:grid-cols-3 lg:space-y-0 border rounded-md shadow-md lg:shadow-none border-gray-300 p-4 hover:bg-gray-100 mb-2 lg:mb-0'
            onClick={handleClick}
        >
            <div className='border-b text-xs md:text-sm lg:text-base lg:border-0 border-gray-400 text-center'>{row1}</div>
            <div className='border-b text-xs md:text-sm lg:text-base lg:border-0 border-gray-400 text-center'>{row2}</div>
            <div className='border-b pb-1 sm:pb-1 text-xs md:text-sm lg:text-base lg:border-0 border-gray-400 text-center flex justify-center'>
                <StatusBadge status={row3} />
            </div>
        </div>
    )
}

export default InfoBox