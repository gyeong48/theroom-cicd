import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import SubTitle from '../../components/user/SubTitle'
import ServiceContent from '../../components/user/ServiceContent'

function ServicesPage() {
    return (
        <BasicLayout>
            <div className="max-w-6xl mx-auto px-4 py-8">
                <SubTitle content={"BRAND"} />
                <ServiceContent />
            </div>
        </BasicLayout>
    )
}

export default ServicesPage