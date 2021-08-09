export const setAuth = (auth) =>
{

    return {
        type: "SET_AUTH",
        payload: auth
    }
}

export const setName = (name) =>
{
    return {
        type: "SET_NAME",
        payload: name
    }
}

export const setEmail = (email) =>
{
    return {
        type: "SET_EMAIL",
        payload: email
    }
}

export const setPasswords = (passwords) =>
{
    return {
        type: "SET_PASSWORDS",
        payload: passwords
    }
}

export const delPass = (id) =>
{

    return {
        type: "DEL_PASS",
        payload: id
    }
}