import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminLayout from '../../layouts/AdminLayout'

function IndexPage() {

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    )
}

export default IndexPage