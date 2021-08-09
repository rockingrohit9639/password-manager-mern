const initialState = {
    isAuthenticated: false,
    name: "",
    email: ""
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

        default:
            return state;
    }
}

export default rootReducer;