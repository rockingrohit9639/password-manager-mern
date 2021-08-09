const initialState = {
    isAuthenticated: false,
    name: "",
    email: "",
    passwords: []
}

const rootReducer = (state = initialState, action) =>
{
    switch (action.type)
    {
        case "SET_AUTH":
            return {
                ...state,
                isAuthenticated: action.payload
            }

        case "SET_NAME":
            return {
                ...state,
                name: action.payload
            }

        case "SET_EMAIL":
            return {
                ...state,
                email: action.payload
            }

        case "SET_PASSWORDS":
            return {
                ...state,
                passwords: action.payload
            }

        case "DEL_PASS":
            return {
                ...state,
                passwords: state.passwords.filter(password => password._id !== action.payload)
            }


        default:
            return state;
    }
}

export default rootReducer;