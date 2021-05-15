import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";

function Showcase({ mediaIcon })
{
    library.add(fab, fas);
    return (
        <div>
        <FontAwesomeIcon icon={["fab", mediaIcon.toLowerCase()]} />
    </div>
    )
}

export default Showcase;