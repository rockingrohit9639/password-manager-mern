import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Password from './Password';
import "./Passwords.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


function Passwords()
{

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [platform, setPlatform] = useState("");
    const [userPass, setUserPass] = useState("");

    const history = useHistory();

    const verifyUser = async () =>
    {
        try
        {
            const res = await fetch("/authenticate", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include",
            });

            const json = await res.json();

            if (res.status === 400)
            {
                window.alert("User is not authenticated.");
                history.push("/signin");
            }
            else
            {
                const { name, email } = json;

                setName(name);
                setEmail(email);

            }
        }
        catch (error)
        {
            console.log(error)
        }
    }

    // useEffect(() =>
    // {
    //     verifyUser();
    // }, [])

    const addNewPassword = () => {
        console.log("This is working fine")
    }

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);


    return (
        <div className="passwords">
            <h1> Welcome <span className="name">Rohit Kumar Saini </span> </h1>

            <div className="modal">
                <button onClick={onOpenModal}> Add New Password</button>

                <Modal open={open} onClose={onCloseModal}>
                    <h2>Add a new password</h2>
                    <div className="form">
                        <div className="form__inputs">
                            <label> Platform </label>
                            <input type="text" placeholder="E.g. Facebook" value={platform} onChange={ (e) => setPlatform(e.target.value) }/>
                        </div>

                        <div className="form__inputs">
                            <label> Password </label>
                            <input type="password" placeholder="Password"
                                value={userPass} onChange={(e) => setUserPass(e.target.value)}
                            />
                        </div>

                        <button onClick={addNewPassword}> Add </button>
                    </div>
                </Modal>
            </div>

            <hr />


            <div className="passwords__list">
                <Password name="Facebook" password="msdhoni" />

                <Password name="Twitter" password="msdhoni7" />
            </div>
        </div>
    )
}

export default Passwords;
