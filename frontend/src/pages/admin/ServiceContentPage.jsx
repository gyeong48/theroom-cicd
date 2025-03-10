import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import ContentForm from '../../components/admin/ContentForm'

function ServiceContentPage() {
  return (
    <div className='pt-20'>
      <MainTitle content={"Services"} />
      <ContentForm type={"service"} />
    </div>
  )
}

export default ServiceContentPage