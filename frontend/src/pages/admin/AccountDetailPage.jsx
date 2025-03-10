import React from 'react'
import MainTitle from '../../components/admin/MainTitle'

function AccountDetailPage() {
    return (
        <div className='pt-20'>
            <MainTitle content={"Account Detail"} button={"목록"} path={"../account"} />
        </div>
    )
}

export default AccountDetailPage