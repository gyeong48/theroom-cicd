import React from 'react'
import Error from '../../components/common/Error'

function Error500AdminPage() {
    return (
        <div>
            <Error code={500} message={"Internal Server Error"} path='/admin' />
        </div>
    )
}

export default Error500AdminPage