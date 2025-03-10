import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import PortfolioDetailContent from '../../components/admin/PortfolioDetailContent'

function PortfolioDetailPage() {
    return (
        <div className='pt-20'>
            <MainTitle content={"Portfolio Detail"} button={"목록"} path={"../portfolio"} />
            <PortfolioDetailContent />
        </div>
    )
}

export default PortfolioDetailPage