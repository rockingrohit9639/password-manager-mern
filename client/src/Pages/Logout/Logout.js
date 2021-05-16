import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function Logout()
{

    const history = useHistory();
    useEffect(() =>
    {
        fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include"
        })
            .then((res) =>
            {
                if (res.status === 200)
                {
                    history.replace("/signin");
                }
                else
                {
                    throw new Error("Could not logout the user.")
                }
            })
            .catch((err) =>
            {
                console.log(err);
        })
    }, [])
    return (
        <div className="logout">
            logout page
        </div>
    )
}

export default Logout;
