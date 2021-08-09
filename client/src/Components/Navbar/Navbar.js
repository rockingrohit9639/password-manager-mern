import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useSelector } from "react-redux";


function Navbar()
{
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const menu = useRef();
    const [isOpen, setIsOpen] = useState(false);

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
                <div className="right__menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {
                            isAuthenticated ?
                                (<>
                                    <li><Link to="/passwords">Passwords</Link></li>
                                    <li><Link to="/logout">Logout</Link></li>
                                </>)
                                :
                                (<>
                                    <li><Link to="/signin">SignIn</Link></li>
                                    <li><Link to="/signup">SignUp</Link></li>
                                </>)

                        }
                    </ul>
                </div>
                <FontAwesomeIcon icon={faBars} className="menu__icon" onClick={handleMenu} />
            </div>

            <div className="phone__nav" ref={menu}>
                <div className="back">
                    <FontAwesomeIcon icon={faArrowLeft} className="back__button" onClick={handleMenu} />
                </div>
                <ul>
                    <li className="nav-item"><Link to="/" onClick={handleMenu}>Home</Link></li>
                    {
                        isAuthenticated ?
                            (
                                <>
                                    <li className="nav-item" onClick={handleMenu}><Link to="/passwords">Passwords</Link></li>
                                    <li className="nav-item" onClick={handleMenu}><Link to="/logout">Logout</Link></li>
                                </>
                            )
                            :
                            (
                                <>
                                    <li className="nav-item" onClick={handleMenu}><Link to="/signin">SignIn</Link></li>
                                    <li className="nav-item" onClick={handleMenu}><Link to="/signup">SignUp</Link></li>
                                </>
                            )
                    }


                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
