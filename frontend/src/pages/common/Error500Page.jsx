import React from 'react'
import Error from '../../components/common/Error'

function Error500Page() {
    return (
        <div>
            <Error code={500} message={"Internal Server Error"} />
        </div>
    )
}

export default Error500Page