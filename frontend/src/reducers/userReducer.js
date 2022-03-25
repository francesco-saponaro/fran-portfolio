// The reducer sends the payload coming from the action to the store.
// User reducer.
export const userReducer = (state = { user: {} }, action) => {

    // So we check which action has been dispatched to the reducer and update
    // the state depending on the action type
    switch(action.type) {
        // If this action type dispatched we set the loading to true and 
        // isAuthenticated to false
        case 'LOGIN_REQUEST':
        case 'LOAD_USER_REQUEST':
            return {
                loading: true,
                isAuthenticated: false
            }

        // If this action type dispatched we return the state, loading to false, 
        // isAuthenticated to true and the user to the action payload
        case 'LOGIN_SUCCESS':
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated:true,
                user: action.payload
            }

        case 'LOAD_USER_FAIL':
            return { 
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        // If this action type dispatched we return the state, loading to false, 
        // isAuthenticated to false and the error to the action payload
        case 'LOGIN_FAIL':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case 'LOGOUT_FAIL':
            return {
                ...state,
                error: action.payload
            }

        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
            }

        // If this action type dispatched since we just want to clear the errors,
        // we simply return the state array and set the errors to null.
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }
        
        default:
            return state
    }
}