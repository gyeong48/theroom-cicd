import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import MainImageUploadForm from '../../components/admin/MainImageUploadForm'

function MainContentPage() {
  return (
    <div className='pt-20'>
      <MainTitle content={"Main"} />
      <MainImageUploadForm />
    </div>
  )
}

export default MainContentPage