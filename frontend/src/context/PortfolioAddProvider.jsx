import React, { createContext, useState } from 'react'

export const PortfolioAddContext = createContext();

export function PortfolioAddProvider({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    buildingType: "",
    supplyArea: "",
    completion: "",
    postCode: "",
    mainAddress: "",
    detailAddress: "",
    startDate: "",
    endDate: "",
    budget: "",
    interiorType: "",
    thumbnail: "",
    imageFiles: [],
  })

  return (
    <PortfolioAddContext.Provider value={{ formData, setFormData }}>
      {children}
    </PortfolioAddContext.Provider>
  )
}