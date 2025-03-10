import React from 'react'
import Header from '../components/user/Header'
import ScrollToTop from '../components/common/ScrollToTop'

function BasicLayout({ children }) {
    return (
        <div>
            <ScrollToTop />
            <Header />
            <main>{children}</main>
        </div>
    )
}

export default BasicLayout