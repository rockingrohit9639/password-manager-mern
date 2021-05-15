import React, { useState } from 'react';
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import img from "../../static/login.jpg";


function Login()
{

    const history = useHistory();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
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

    const handleLogin = async () =>
    {
        try
        {
            const res = await fetch("http://localhost:8000/login", {
                method: "POST",
                redirect: 'follow',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });

            const json = await res.json();

            if (res.status === 400)
            {
                window.alert(json.error);
            }
            else if (res.status === 200)
            {
                window.alert(json.message);
                history.push("/");
            }
        }
        catch (error)
        {
            console.log(error)
        }

    }

    return (
        <div className="login">
            <div className="login__wrapper">
                

                <div className="login_left">
                    <div className="inputs">
                        <label> Email </label>
                        <input type="email" placeholder="Email" name="email" value={userData.email} onChange={handleChange} autoComplete={"off"} required />
                    </div>

                    <div className="inputs">
                        <label> Password </label>
                        <input type="password" placeholder="Password" value={userData.password} onChange={handleChange} name="password" required />
                    </div>

                    <button onClick={handleLogin}> Login </button>
                </div>
                <div className="login_right">
                    <img src={img} alt="login.jpg" />

                    <div className="login__content">
                    <h1> Login </h1>
                    <h4> Get your password secured with us for free. </h4>

                    <p> Did not have any Account?
                    <Link to="/signup"> Signup </Link> </p>
                    
                    
                    <a className="attr" href='https://www.freepik.com/vectors/star' target="_blank">Star vector created by vectorpouch - www.freepik.com</a>

                    </div>
                </div>
            
            
            </div>
        </div>
    )
}

export default Login;
