import React, { useState } from 'react';
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import img from "../../static/signup.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function Signup()
{
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (e) =>
    {
        const { name, value } = e.target;
        
        setUserData((prevData) =>
        {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const handleRegister = async () =>
    {
        try
        {
            const res = await fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

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
            else if (res.status === 201)
            {
                setUserData({
                    name: "",
                    email: "",
                    password: "",
                    cpassword: ""
                });

                toast.success(jsonRes.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                history.push("/signin");
                
            }
        }
        catch (error)
        {
            console.log(error);
        }
    }

    return (
        <div className="signup">
            <ToastContainer />
            <div className="signup__wrapper">


                <div className="signup__left">
                    
                    <div className="inputs">
                        <label> Full Name </label>
                        <input type="text" placeholder="Full Name" name="name" autoComplete={"off"} onChange={handleChange} value={userData.name} required />
                    </div>


                    <div className="inputs">
                        <label> Email </label>
                        <input type="email" placeholder="Email" name="email" autoComplete={"off"} onChange={handleChange} value={userData.email} required />
                    </div>

                    <div className="inputs">
                        <label> Password </label>
                        <input type="password" placeholder="Password" name="password" required onChange={handleChange} value={userData.password} />
                    </div>

                    <div className="inputs">
                        <label> Confirm Password </label>
                        <input type="password" placeholder="Confirm Password" name="cpassword" onChange={handleChange} required value={userData.cpassword} />
                    </div>

                    <button onClick={handleRegister}> SignUp </button>
                </div>


                <div className="signup__right">
                    <img src={img} alt="login.jpg" />

                    <div className="signup__content">
                        <h1> SignUp </h1>
                        <h4> Get your password secured with us for free. </h4>

                        <p> Already have an account ?
                        <Link to="/signin"> Login </Link> </p>


                        <a className="attr" href='https://www.freepik.com/vectors/star' target="_blank">Star vector created by vectorpouch - www.freepik.com</a>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Signup;
