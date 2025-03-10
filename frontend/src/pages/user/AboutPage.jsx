import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import SubTitle from '../../components/user/SubTitle'
import AboutContent from '../../components/user/AboutContent'

function AboutPage() {
    return (
        <BasicLayout>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <SubTitle content={"ABOUT"} />
                <AboutContent />
            </div>
        </BasicLayout>
    )
}

export default AboutPage