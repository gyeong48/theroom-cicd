import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import PortfolioDetailContent from '../../components/user/PortfolioDetailContent'

function PortfolioDetailPage() {
    return (
        <BasicLayout>
            <div className="max-w-6xl mx-auto px-1 md:px-4 py-8 pt-20">
                <PortfolioDetailContent />
                {/* 버튼 리스트 */}
            </div>
        </BasicLayout>
    )
}

export default PortfolioDetailPage