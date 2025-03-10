import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import { PortfolioAddProvider } from '../../context/PortfolioAddProvider'
import PortfolioAddForm from '../../components/admin/PortfolioAddForm'

function PortfolioAddPage() {
    return (
        <div className='pt-20'>
            <MainTitle content={"Portfolio Add"} button={"목록"} path={"../portfolio"} />
            <PortfolioAddProvider>
                <PortfolioAddForm />
            </PortfolioAddProvider>
        </div>
    )
}

export default PortfolioAddPage