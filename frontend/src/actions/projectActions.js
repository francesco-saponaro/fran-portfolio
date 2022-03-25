import axios from 'axios';

// This function will dispatch actions to get projects from the backend,
// it takes a keyword as parameter which is passed into the URL query
// to fetch the projects based on whatever the paramater value is.
export const getProjectsAction = (keyword) => async (dispatch) => {
    
    try {
        // We first dispatch the ALL_PROJECTS_REQUEST action type, which 
        // will set projects to an empty array.
        dispatch({ type:'ALL_PROJECTS_REQUEST' })

        // Then we perform a get request to the backend with the URL corresponding to 
        // the "getProjects" controller and extract the data from it
        // This is why we need thunk.
        const { data } = await axios.get(`/api/v1/projects?keyword=${keyword}`)

        // Then we dispatch the ALL_PROJECTS_SUCCESS action type with a payload of the
        // data extracted from the backend, which will set the projects state to the 
        // action payload.
        dispatch({ 
            type:'ALL_PROJECTS_SUCCESS',
            payload: data
        })
    } catch(error) {
        // If there is an error we dispatch the ALL_PROJECTS_FAIL action type with
        // a payload of the error errMessage, which will simply return the error .
        dispatch({
            type:'ALL_PROJECTS_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

// If this action type dispatched since we just want to clear the errors,
// we simply return the state array and set the errors to null
export const clearErrors = () => async (dispatch) => {
    dispatch({ type:'CLEAR_ERRORS' })
}