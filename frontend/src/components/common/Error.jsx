import React from 'react'

import { Link } from "react-router-dom";

const Error = ({ code = 404, message = "Page not found", path = "/" }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800">{code}</h1>
            <p className="text-xl text-gray-600 mt-4">{message}</p>
            <Link
                to={path}
                className="mt-6 px-6 py-2 bg-black text-white text-lg rounded-lg shadow-md hover:bg-black transition"
            >
                메인으로 이동하기
            </Link>
        </div>
    );
};

export default Error;
