import React from 'react'

function S3ImageTest() {
    const imageUrl = "https://my-app-images.s3.ap-northeast-2.amazonaws.com/luke.jpg";

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold">S3 이미지 표시</h2>
            <img src={imageUrl} alt="S3 이미지" className="w-64 h-auto mt-4" />
        </div>
    );
}

export default S3ImageTest