import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar()
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
    const menu = useRef();
    const [ isOpen, setIsOpen ] = useState(false);

    const handleMenu = () =>
    {
        setIsOpen(!isOpen);
        if (isOpen)
        {
            menu.current.style.transform = "translateX(0px)";
        }
        else
        {
            menu.current.style.transform = "translateX(-100%)";   
        }
    }

    return (
        <nav className="navbar">
            
            <div className="navbar__left">
                <h2> <Link to="/"> Password Manager </Link> </h2>
            </div>

            <div className="navbar__right">
        
                <div className="menu__icon" onClick={handleMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>

                <ul className="navbar__menu" ref={menu}>
                    
                    <li className="back_btn"> <FontAwesomeIcon icon={faArrowLeft} onClick={handleMenu} /> </li>
                    <li> <Link to="/"> Home </Link> </li>
                    <li> <Link to="/passwords"> Passwords </Link> </li>
                    {
                        isAuthenticated ? null
                            :
                            (<li> <Link to="/signup"> SignUp </Link> </li>)
                    }
                    <li> <Link to="/about"> AboutUs </Link> </li>
                </ul>

            </div>
        </nav>
    )
}

export default Navbar;
