import React, { createContext, useEffect, useState } from 'react'
import { getCompanyInfo } from '../api/contentApi';
import FetchingModal from '../components/common/FetchingModal';
import useCustomMove from '../hooks/useCustomMove';

export const CompanyInfoContext = createContext();

export function CompanyInfoProvider({ children }) {
    const [formData, setFormData] = useState(null)
    const { moveToError } = useCustomMove()

    useEffect(() => {
        getCompanyInfo()
            .then(res => {
                setFormData(res.data);
            })
            .catch(err => {
                console.log(err);
                moveToError();
            })
    }, [])


    if (!formData) return <FetchingModal />

    return (
        <CompanyInfoContext.Provider value={{ formData, setFormData }}>
            {children}
        </CompanyInfoContext.Provider>
    )
}