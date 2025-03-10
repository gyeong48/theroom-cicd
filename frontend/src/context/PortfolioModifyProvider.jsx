import React, { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPortfolioModifyDetail } from '../api/portfolioApi';
import FetchingModal from '../components/common/FetchingModal';
import useCustomMove from '../hooks/useCustomMove';

export const PortfolioModifyContext = createContext();

export function PortfolioModifyProvider({ children }) {
    const { id } = useParams();
    const [formData, setFormData] = useState(null)
    const { moveToError } = useCustomMove();

    useEffect(() => {
        getPortfolioModifyDetail(id)
            .then((res) => {
                const data = res.data;
                setFormData({
                    id: data.id,
                    title: data.title,
                    buildingType: data.buildingType,
                    supplyArea: data.supplyArea,
                    completion: data.completion,
                    postCode: data.postCode,
                    mainAddress: data.mainAddress,
                    detailAddress: data.detailAddress,
                    latitude: data.latitude ? data.latitude : 0,
                    longitude: data.longitude ? data.longitude : 0,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    budget: data.budget,
                    interiorType: data.interiorType,
                    thumbnail: data.thumbnail,
                    imageFiles: data.imageFiles,
                    thumbnailName: data.thumbnail.name,
                    uploadImageFilenames: [],
                })
            })
            .catch(err => {
                console.log(err);
                moveToError();
            })
    }, [id]);

    if (!formData) return <FetchingModal />

    return (
        <PortfolioModifyContext.Provider value={{ formData, setFormData }}>
            {children}
        </PortfolioModifyContext.Provider>
    )
}