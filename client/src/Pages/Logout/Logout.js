import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { logoutUser } from '../../axios/instance';
import { useDispatch } from "react-redux";
import { setAuth } from '../../redux/actions';


function Logout()
{

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() =>
    {
        const logout = async () =>
        {
            try
            {
                const res = await logoutUser();
                if (res.status === 200)
                {
                    dispatch(setAuth(false));
                    history.replace("/signin");
                }
                else
                {
                    throw new Error("Could not logout the user.")
                }
            }
            catch (err)
            {
                console.log(err)
            }
        }
        logout();

    }, [history])
    return (
        <div className="logout">
            Logging you out...
        </div>
    )
}

export default Logout;
