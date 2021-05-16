import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Password from './Password';
import "./Passwords.css";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 


function Passwords()
{

    const [name, setName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPasswords, setPasswords] = useState([]);

    const [platform, setPlatform] = useState("");
    const [platEmail, setPlatEmail] = useState("");
    const [userPass, setUserPass] = useState("");

    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

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

            const jsonRes = await res.json();

            if (res.status === 400)
            {
                history.push("/signin");
            }
            else
            {
                const { name, passwords, email } = jsonRes;

                console.log(passwords)

                setName(name);
                setUserEmail(email)
                setPasswords(passwords);
            }
        }
        catch (error)
        {
            console.log(error)
        }
    }

    const addNewPassword = async () => {
        try
        {
            const data = {
                platform: platform,
                userPass: userPass,
                platEmail: platEmail, 
                userEmail: userEmail,
            }
            const res = await fetch("/addnewpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })

            const jsonRes = await res.json();

            if (res.status === 400)
            {
                toast.error(jsonRes.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            else if (res.status === 200)
            {
                setPlatform("");
                setPlatEmail("");
                setUserPass("");
                setOpen(false);
                
                toast.success(jsonRes.message, {
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
        catch (error)
        {
            console.log(error)
        }
    }

    useEffect(() =>
    {
        verifyUser();
    }, []);

    return (
        <div className="passwords">
            <ToastContainer />
            <h1> Welcome <span className="name"> { name } </span> </h1>

            <div className="modal">
                <button className="modalButton" onClick={onOpenModal}> Add New Password</button>

                <Modal open={open} onClose={onCloseModal}>
                    <h2>Add a new password</h2>
                    <div className="form">
                        <div className="form__inputs">
                            <label> Platform </label>
                            <input type="text" placeholder="E.g. Facebook" value={platform} onChange={ (e) => setPlatform(e.target.value) }/>
                        </div>

                        <div className="form__inputs">
                            <label> Email </label>
                            <input type="email" placeholder="E.g. rohitsaini@gmail.com" value={platEmail} onChange={ (e) => setPlatEmail(e.target.value) }/>
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
                
                { userPasswords.length !== 0 ? userPasswords?.map((data) =>
                {
                    return (
                        <Password
                            key={data._id}
                            id={data._id}
                            name={data.platform}
                            password={data.password}
                            email={data.platEmail}
                            iv={data.iv}
                            verifyUser={verifyUser}    
                        />
                    )
                }) :
                    
                    <div className="nopass">
                        <p> You have not added any passwords yet. </p>
                        <button className="modalButton" onClick={onOpenModal}> Try Adding a password now </button>
                    </div>
                 }
            
            </div>
        </div>
    )
}

export default Passwords;
