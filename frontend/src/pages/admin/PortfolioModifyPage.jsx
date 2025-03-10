import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import { PortfolioModifyProvider } from '../../context/PortfolioModifyProvider'
import PortfolioModifyForm from '../../components/admin/PortfolioModifyForm'

function PortfolioModifyPage() {
    return (
        <div className='pt-20'>
            <MainTitle content={"Portfolio Modify"} button={"목록"} path={"../portfolio"} />
            <PortfolioModifyProvider>
                <PortfolioModifyForm />
            </PortfolioModifyProvider>
        </div>
    )
}

export default PortfolioModifyPage