import React, { useContext, useEffect, useState } from 'react'
import { validate } from '../../util/validator';

function GridInputBox({ label, id, type, placeholder, context, isModifiable, errors, setErrors }) {
    const { formData, setFormData } = useContext(context)
    const [data, setData] = useState(formData[id]);

    useEffect(() => {
        setFormData(prev => ({ ...prev, [id]: data }));
    }, [data])

    const handleChange = (e) => {
        setData(e.target.value);
        if (setErrors !== null) setErrors((prevErrors) => ({ ...prevErrors, [id]: validate(id, e.target.value) }));
    }

    return (
        <div>
            <label htmlFor="name" className="block text-sm lg:text-base font-semibold text-gray-700">
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={id}
                value={data}
                onChange={handleChange}
                className="w-full p-1 border-b border-gray-300 focus:border-gray-500 text-sm lg:text-base focus:outline-none placeholder:text-sm lg:placeholder:text-base"
                placeholder={placeholder}
                readOnly={!isModifiable}
            />
            {errors && errors.hasOwnProperty(id) && <small className="text-red-500">{errors[id]}</small>}
        </div>
    )
}

export default GridInputBox