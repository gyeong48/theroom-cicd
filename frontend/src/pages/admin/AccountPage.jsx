import React from 'react'
import MainTitle from '../../components/admin/MainTitle'
import { AccountProvider } from '../../context/AccountProvider'
import AccountModifyForm from '../../components/admin/AccountModifyForm'

function AccountPage() {
    return (
        <div className='pt-20'>
            <MainTitle content={"Account List"} button={"등록"} path={"./add"} />
            <AccountProvider>
                <AccountModifyForm />
            </AccountProvider>
        </div>
    )
}

export default AccountPage