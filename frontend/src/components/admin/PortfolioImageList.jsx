import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPortfolioList } from '../../api/portfolioApi'
import FetchingModal from '../common/FetchingModal'
import useCustomMove from '../../hooks/useCustomMove'

function PortfolioImageList() {
    const [portfolios, setPortfolios] = useState(null)
    const host = process.env.REACT_APP_SERVER_URL;
    const { moveToAdminError } = useCustomMove();

    useEffect(() => {
        getPortfolioList()
            .then(res => setPortfolios(res.data))
            .catch(err => {
                console.log(err);
                moveToAdminError();
            })
    }, [])

    if (!portfolios) return <FetchingModal />

    return (
        <div className='pt-10 flex flex-wrap items-center'>
            {portfolios.map((portfolio, index) => (
                <div className='md:space-x-10 md:p-4 px-1 pb-8 md:w-1/3 md:h-1/3' key={index}>
                    <Link to={`/admin/portfolio/${portfolio.id}`}>
                        <div className='hover:opacity-75 hover:cursor-pointer hover:scale-95 transition-transform'>
                            <img
                                src={`${host}/api/portfolio/view/${portfolio.filename}`}
                                alt='no images'
                                className='w-full aspect-[4/3] object-cover rounded-md'
                            >
                            </img>
                            <p className='text-center font-body text-xs lg:text-sm'>{portfolio.title}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export default PortfolioImageList