import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { logoutUser } from '../../axios/instance';

function Logout()
{

    const history = useHistory();



    useEffect(() =>
    {
        const logout = async () =>
        {
            try
            {
                const res = await logoutUser();
                if (res.status === 200)
                {
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

    }, [])
    return (
        <div className="logout">
            logout page
        </div>
    )
}

export default Logout;
