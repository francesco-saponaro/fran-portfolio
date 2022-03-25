import axios from "axios";

// This function will dispatch actions to POST the user log in details to the backend
// in order to login, it takes the email and password as parameters.
export const loginAction = (email, password) => async (dispatch) => {

    try {
        // We first dispatch the LOGIN_REQUEST action type, which 
        // will set the authentication to false.
        dispatch({ type: 'LOGIN_REQUEST' });

        // Then we set the config variable to be sent into the POST request
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Then we perform the POST request to the backend with email, password and config passed in
        const { data } = await axios.post('/api/v1/login', {email, password}, config) 

        // Then we dispatch the LOGIN_SUCCESS action type with a payload of the
        // data extracted from the backend, which will set the user store state to the 
        // action payload.
        dispatch({ 
            type: 'LOGIN_SUCCESS',
            payload: data.user
        });

    } catch(error) {
        // If there is an error we dispatch the LOGIN_FAIL action type with
        // a payload of the error message, which will simply return the error .
        dispatch({ 
            type: 'LOGIN_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

// This function will dispatch actions to get a user from the backend with the same ID of the user
// sent by the isUserAuthenticated middleware in the request (logged in) (req.user)
export const loadUser = () => async (dispatch) => {

    try {
        // We first dispatch the LOAD_USER_REQUEST action type, which 
        // will set the authentication to false.
        dispatch({ type: 'LOAD_USER_REQUEST' });

        // Then we perform the get request to the backend
        const { data } = await axios.get('/api/v1/profile') 

        // Then we dispatch the LOAD_USER_SUCCESS action type with a payload of the
        // data extracted from the backend, which will set the user store state to the 
        // action payload.
        dispatch({ 
            type: 'LOAD_USER_SUCCESS',
            payload: data.user
        });

    } catch(error) {
        // If there is an error we dispatch the LOAD_USER_FAIL action type with
        // a payload of the error message, which will simply return the error .
        dispatch({ 
            type: 'LOAD_USER_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

export const logout = () => async (dispatch) => {

    try {
        await axios.get('/api/v1/logout') 

        dispatch({ type: 'LOGOUT_SUCCESS' });

    } catch(error) {
        // If there is an error we dispatch the LOGIN_FAIL action type with
        // a payload of the error message, which will simply return the error .
        dispatch({ 
            type: 'LOGOUT_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

// If this action type dispatched since we just want to clear the errors,
// we simply return the state array and set the errors to null
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' })
}