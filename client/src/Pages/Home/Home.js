import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
function Home()
{
    const [isAuthenticated, setAuth] = useState(false);
    const [name, setName] = useState("");
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
                setAuth(false);
            }
            else
            {
                const { name } = json;
                setAuth(true);

                setName(name);

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
        <div className="home">

            { !isAuthenticated ? (
                <div className="home__left">
                    <h1> Welcome to <span className="name"> Password Manager </span> </h1>

                    <p> The best and secure way to save your passwords. </p>

                    <Link to="/signup"> SignUp Now </Link>
                </div>
            ) :
                (
                    <div className="home__left">
                        <h1> Welcome <span className="name"> { name } </span> </h1>

                        <p> Hope you are doing well. </p>

                        <Link to="/passwords"> See your passwords </Link>
                    </div>
                )
            }


        </div>
    )
}

export default Home;
