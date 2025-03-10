import React, { useEffect, useState } from 'react'
import { getContents } from '../../api/contentApi';
import FetchingModal from '../common/FetchingModal';
import useCustomMove from '../../hooks/useCustomMove';
import QuoteButton from '../../components/user/QuoteButton'

function ServiceContent() {
    const [serviceContents, setServiceContents] = useState(null);
    const { moveToError } = useCustomMove();

    useEffect(() => {
        getContents("service")
            .then(res => {
                const contents = res.data;
                const newContents = contents.map((content, index) => {
                    const obj = {
                        title: content.title,
                        strArr: content.str.split("\n")
                    }

                    return obj;
                })
                setServiceContents(newContents);
            })
            .catch(err => {
                console.log(err);
                moveToError();
            })
    }, [])

    if (!serviceContents) return <FetchingModal />

    return (
        <div>
            {serviceContents.map((content, index) => (
                <div key={index} className='pt-20 flex flex-col justify-center md:items-center'>
                    <h1 className='mb-6 font-bold text-base sm:text-lg md:text-2xl font-body'>{content.title}</h1>
                    {content.strArr && content.strArr.map((str, index) => (
                        <p key={index} className="font-body font-semibold px-0 md:px-4 pb-4 text-xs sm:text-sm md:text-base text-gray-500">
                            {str}
                        </p>
                    ))}
                </div>
            ))}
            <div className='pt-20'>
            <QuoteButton />
            </div>
        </div>
    )
}

export default ServiceContent