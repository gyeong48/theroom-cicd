import React from 'react'
import ContactList from '../../components/admin/ContactList'
import MainTitle from '../../components/admin/MainTitle'

function ContactPage() {
    return (
        <div className='pt-20'>
            <MainTitle content={"Contact List"} button={"등록"} path={"./add"} />
            <ContactList />
        </div>
    )
}

export default ContactPage