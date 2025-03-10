import React from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import SubTitle from '../../components/user/SubTitle';
import { ContactAddProvider } from '../../context/ContactAddProvider';
import ContactAddForm from '../../components/user/ContactAddForm';

function ContactPage() {
    return (
        <BasicLayout>
            <div className="max-w-[1400px] mx-auto px-4 py-8 bg-white p-6">
                <SubTitle content={"CONTACT"} />
                <ContactAddProvider>
                    <ContactAddForm />
                </ContactAddProvider>
            </div>
        </BasicLayout>
    );
}

export default ContactPage