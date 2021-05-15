import React, { useState } from 'react';
import "./Password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from "@fortawesome/free-solid-svg-icons";
import Showcase from './Showcase';

function Password({ name, password })
{

    library.add(fab, fas);
    
    const [show, setShow] = useState(false);

    return (
        <div className="password">
            
            <div className="media">
                
                <Showcase mediaIcon={ name }/>
                <h3> {name} </h3>
            </div>

            <div className="user-password">
                
                <input type={!show ? "password" : "text"} value={password} disabled={true} />
                
                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShow(!show)} />
                
            </div>
        </div>
    )
}

export default Password;
