import React, { useContext, useState } from 'react'
import { validate } from '../../util/validator';

function ThumbnailUploadBox({ context, errors, setErrors }) {
    const { formData, setFormData } = useContext(context);
    const [thumbnail, setThumbnail] = useState(formData.thumbnail);

    const handleThumbnailChange = (e) => {
        e.preventDefault();
        setThumbnail(e.target.files[0])
        setFormData(prev => ({ ...prev, thumbnail: e.target.files[0] }));
        setErrors((prevErrors) => ({ ...prevErrors, thumbnail: validate("thumbnail", e.target.files[0]) }));
    }

    const handleRemoveThumbnail = (e) => {
        e.preventDefault();
        setThumbnail("");
        setFormData(prev => ({ ...prev, thumbnail: "" }));
        setErrors((prevErrors) => ({ ...prevErrors, thumbnail: validate("thumbnail", null) }));
    }

    return (
        <div>
            <div className='mb-2 flex items-center justify-end font-body font-semibold text-sm space-x-4'>
                <div>용량: {thumbnail ? Math.ceil(thumbnail.size / 1024 / 1024) : 0}MB/10MB</div>
            </div>

            {thumbnail &&
                <div className='w-full border p-2 rounded-md flex justify-between items-center text-sm lg:text-base'>
                    <div>{thumbnail.name}</div>
                    <button onClick={handleRemoveThumbnail}>✖</button>
                </div>
            }
            <label className='block w-full border rounded-md'>
                <div className='flex items-center hover:cursor-pointer pb-1'>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-8 h-8 text-gray-600"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16v-8m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        />
                    </svg>
                    <div className='ml-2 mt-2 font-body font-semibold text-gray-600'>대표 이미지를 선택해 주세요.</div>
                </div>
                <input
                    type="file"
                    className='hidden'
                    onChange={handleThumbnailChange}
                />
            </label>

            {errors && errors.hasOwnProperty("thumbnail") && <small className="text-red-500">{errors["thumbnail"]}</small>}
        </div>
    )
}

export default ThumbnailUploadBox