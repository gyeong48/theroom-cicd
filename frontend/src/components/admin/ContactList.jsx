import React, { useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import InfoHeader from './InfoHeader';
import { getContactList } from '../../api/contactApi';
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';

const ContactList = () => {
    const [contacts, setContacts] = useState(null)
    const [filteredData, setFilteredData] = useState(null);
    const [selectedType, setSelectedType] = useState('all');
    const { moveToAdminError } = useCustomMove();

    useEffect(() => {
        getContactList()
            .then(res => {
                setContacts(res.data);
                setFilteredData(res.data);

            })
            .catch(err => {
                console.log();
                moveToAdminError();
            })
    }, [])

    const filterType = (status) => {
        setSelectedType(status);
        setFilteredData(
            status === 'all' ? contacts : contacts.filter(item => item.status === status)
        );
    };

    if (!contacts) return <FetchingModal />

    return (
        <div className="pt-4 px-1 md:px-4 lg:px-7">
            <InfoHeader items={["이름", "주소", "상태"]} />
            <div>
                {filteredData && filteredData.map((item, index) => (
                    <InfoBox
                        key={index}
                        id={item.id}
                        row1={item.customer}
                        row2={item.mainAddress + " " + item.detailAddress}
                        row3={item.status}
                    />
                ))}
            </div>
            <div className='flex justify-end items-center mt-2'>
                유형
                <select
                    value={selectedType}
                    onChange={(e) => filterType(e.target.value)}
                    className="ml-2 bg-transparent border border-gray-300 text-gray-700 focus:outline-none rounded-md p-1"
                >
                    <option value="all">모두</option>
                    <option value="CONTACT">상담전</option>
                    <option value="MEET1">상담1</option>
                    <option value="MEET2">상담2</option>
                    <option value="MEET3">상담3</option>
                    <option value="CONTRACT">계약완료</option>
                    <option value="IN_PROGRESS">시공중</option>
                    <option value="COMPLETE">시공완료</option>
                    <option value="HOLD">보류</option>
                </select>
            </div>
        </div>
    );
};

export default ContactList;
