import React, { useState } from 'react';
import "./Password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Showcase from './Showcase';

function Password({ id, name, password, email, verifyUser })
{
    const [show, setShow] = useState(false);

    const deletePassword = async () =>
    {
        try
        {
            const res = await fetch("/deletepassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: id,
                })
            })

            const jsonRes = await res.json();

            if (res.status === 400)
            {
                window.alert(jsonRes.error);
                verifyUser();
            }
            else if (res.status === 200)
            {
                window.alert(jsonRes.message);
                verifyUser();
            }
        }
        catch (err)
        {
            console.log(err)
        }

    }

    return (
        <div className="password">

            <div className="media">

                {<Showcase mediaIcon={name} />}
                <h3> {name} </h3>

                {<FontAwesomeIcon className="delete__btn1" onClick={deletePassword} icon={faTrash} />}

            </div>

            <div className="email">
                <p> {email} </p>
            </div>

            <div className="user-password">

                <input type={!show ? "password" : "text"} value={password} disabled={true} />

                <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShow(!show)} />

            </div>

            {<FontAwesomeIcon className="delete__btn2" onClick={deletePassword} icon={faTrash} />}

        </div>
    )
}

export default Password;
