import React, { useContext, useEffect, useState } from 'react'
import { validate } from '../../util/validator';

function GridSelectBox({ isLabel, label, id, options, placeholder, context, isModifiable, errors, setErrors, isEssential }) {
    const { formData, setFormData } = useContext(context)
    const [data, setData] = useState(formData[id]);

    useEffect(() => {
        setFormData(prev => ({ ...prev, [id]: data }))
    }, [data])

    const handleChange = (e) => {
        setData(e.target.value);
        if (setErrors !== null) setErrors((prevErrors) => ({ ...prevErrors, [id]: validate(id, e.target.value) }));
    }

    return (
        <div>
            {isLabel && (
                <label htmlFor="scope" className="block text-sm lg:text-base font-semibold text-gray-700">
                    {label}{isEssential && <small>(필수*)</small>}
                </label>
            )}
            <select
                id={id}
                name={id}
                value={data}
                onChange={handleChange}
                className={`block w-full border-b border-gray-300 text-sm lg:text-base focus:border-gray-500 focus:outline-none p-1 pb-1.5`}
                disabled={!isModifiable}
            >
                <option value="">{placeholder}</option>
                {options
                    .map((option, index) => (
                        <option key={index} value={option.value}>{option.content}</option>
                    ))
                }
            </select>
            {errors && errors.hasOwnProperty(id) && <small className="text-red-500">{errors[id]}</small>}
        </div>
    )
}

export default GridSelectBox