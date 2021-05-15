import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function Showcase({ mediaIcon })
{
    return (
        <div>
        <FontAwesomeIcon icon={['fab', mediaIcon.toLowerCase()]} />
    </div>
    )
}

export default Showcase;