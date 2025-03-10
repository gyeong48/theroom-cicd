import React from 'react'

function NextArrow({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-20 hover:bg-opacity-50 text-white w-12 h-24 flex items-center justify-center shadow-lg"
            style={{ width: "50px", height: "90px" }}
        >
            {">"}
        </button>
    )
}

export default NextArrow