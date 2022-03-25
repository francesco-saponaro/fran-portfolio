import axios from 'axios'

// This function will dispatch actions to get questions from the backend.
export const getQuestionsAction = () => async (dispatch) => {

    try {
        // We first dispatch the ALL_QUESTIONS_REQUEST action type, which 
        // will set products to an empty array.
        dispatch({ type: 'ALL_QUESTIONS_REQUEST'})

        // Then we perform a get request to the backend with the URL corresponding to 
        // the "getQuestions" controller and extract the data from it
        // This is why we need thunk.
        const { data } = await axios.get('/api/v1/quiz')

        // Then we dispatch the ALL_QUESTIONS_SUCCESS action type with a payload of the
        // data extracted from the backend, which will set the questions state to the 
        // action payload.
        dispatch({
            type: 'ALL_QUESTIONS_SUCCESS',
            payload: data
        })

    } catch(error) {
        // If there is an error we dispatch the ALL_QUESTIONS_FAIL action type with
        // a payload of the error errMessage, which will simply return the error .
        dispatch({
            type: 'ALL_QUESTIONS_FAIL',
            payload: error.response.data.errMessage
        })

    }
}

// If this action type dispatched since we just want to clear the errors,
// we simply return the state array and set the errors to null
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' })
}