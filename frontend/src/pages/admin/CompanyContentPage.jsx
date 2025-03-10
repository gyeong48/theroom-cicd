import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import { CompanyInfoProvider } from '../../context/CompanyInfoProvider'
import CompanyInfoForm from '../../components/admin/CompanyInfoForm'

function CompanyContentPage() {
  return (
    <div className='pt-20'>
      <MainTitle content={"Company"} />
      <CompanyInfoProvider>
        <CompanyInfoForm />
      </CompanyInfoProvider>
    </div>
  )
}

export default CompanyContentPage