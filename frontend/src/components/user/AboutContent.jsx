import React, { useEffect, useState } from 'react'
import Location from './Location'
import { getCompanyInfo, getContents } from '../../api/contentApi'
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';
import QuoteButton from './QuoteButton';

function AboutContent() {
    const [introduces, setIntroduces] = useState(null);
    const [companyInfo, setCompanyInfo] = useState(null);
    const [location, setLocation] = useState(null)
    const { moveToError } = useCustomMove();

    useEffect(() => {
        getContents("about")
            .then(res => {
                const contents = res.data;
                const newContents = contents.map((content) => content.str.split("\n"))
                setIntroduces(newContents);
            })
            .catch(err => {
                console.log(err);
                moveToError();
            })

        getCompanyInfo()
            .then(res => {
                const info = res.data;

                setCompanyInfo([
                    { title: "대표자", content: info.representative },
                    { title: "이메일", content: info.email },
                    { title: "연락처", content: info.phoneNumber },
                    { title: "주소", content: info.mainAddress + " " + info.detailAddress },
                ]);

                setLocation({
                    latitude: info.latitude,
                    longitude: info.longitude
                })
            })
            .catch(err => {
                console.log(err);
                moveToError()
            })
    }, [])

    if (!introduces || !companyInfo) return <FetchingModal />
    return (
        <div className='font-body space-y-28 pt-10'>
            {introduces && introduces.map((intro, index) => (
                <div key={index} className='space-y-4'>
                    {intro && intro.map((str, index) => (
                        <p key={index} className="text-center font-body text-xs sm:text-sm md:text-base text-gray-500">
                            {str}
                        </p>
                    ))}
                </div>
            ))}
            <Location location={location} />
            <div>
                <ul>
                    {companyInfo.map((info, index) => (
                        <li key={index} className='mt-4 block sm:flex sm:flex-wrap max-[400px]:text-sm md:text-base'>
                            <span className='sm:w-1/3 sm:mb-0 block mb-1 font-body font-semibold'>{info.title}</span>
                            <span className='sm:w-2/3 block font-body text-gray-500'>{info.content}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <QuoteButton />
        </div>
    )
}

export default AboutContent