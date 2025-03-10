import React from 'react'
import Sidebar from '../components/admin/Sidebar'
import ScrollToTop from '../components/common/ScrollToTop'

function AdminLayout({ children }) {
    return (
        <div className="font-body">
            <ScrollToTop />
            <aside><Sidebar /></aside>
            <main className='bg-gray-50 min-h-screen lg:ml-64'>{children}</main>
        </div>
    )
}

export default AdminLayout