import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import ContentForm from '../../components/admin/ContentForm'

function AbountContentPage() {
  return (
    <div className='pt-20'>
      <MainTitle content={"About"} />
      <ContentForm type={"about"} />
    </div>
  )
}

export default AbountContentPage