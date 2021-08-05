import React, { useState } from 'react';
import "./Password.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Showcase from '../../Pages/Passwords/Showcase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { decryptThePass, deleteAPassword } from "../../axios/instance";

function Password({ id, name, password, email, verifyUser, iv })
{
    const [show, setShow] = useState(false);
    const [decPassword, setDecPassword] = useState("");

    const deletePassword = async () =>
    {
        try
        {
            const res = await deleteAPassword({id});

            if (res.status === 400)
            {
                toast.error(res.data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                verifyUser();
            }
            else if (res.status === 200)
            {
                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                verifyUser();
            }
        }
        catch (err)
        {
            console.log(err)
        }

    }

    const decryptPassword = async () =>
    {
        try
        {
            if (!show)
            {
                const res = await decryptThePass({
                    iv: iv,
                    encryptedPassword: password,
                });

                if (res.status === 200)
                {
                    setDecPassword(res.data);
                    setShow(!show);
                }
            }
            else
            {
                setShow(!show);
            }

        }
        catch (error)
        {
            console.log(error);
        }
    }

    return (
        <div className="password">
            <ToastContainer />
            <div className="media">

                {<Showcase mediaIcon={name} />}
                <h3> {name} </h3>

                {<FontAwesomeIcon className="delete__btn1" onClick={deletePassword} icon={faTrash} />}

            </div>

            <div className="email">
                <p> {email} </p>
            </div>

            <div className="user-password">

                <input type={show ? "text" : "password"} value={decPassword} disabled={true} />

                <FontAwesomeIcon icon={faEyeSlash} onClick={decryptPassword} />

            </div>

            {<FontAwesomeIcon className="delete__btn2" onClick={deletePassword} icon={faTrash} />}

        </div>
    )
}

export default Password;
