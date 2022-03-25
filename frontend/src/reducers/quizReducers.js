// The reducer sends the payload coming from the action to the store.
// All questions reducer.
export const questionsReducer = (state = { questions:[] } , action) => { 

    // So we check which action has been dispatched to the reducer and update
    // the state depending on the action type
    switch(action.type) {
        // If this action type dispatched we set the state products to an empty array
        case 'ALL_QUESTIONS_REQUEST':
        case 'ADMIN_QUESTIONS_REQUEST':
            return {
                loading: true,
                questions: []
            }

        // If this action type dispatched we set the state questions to the questions 
        // array in the action payload data
        case 'ALL_QUESTIONS_SUCCESS':
        case 'ADMIN_QUESTIONS_SUCCESS':
            return {
                loading: false,
                questions: action.payload.questions
            }

        // If this action type dispatched we get the error returning from the action payload
        case 'ALL_QUESTIONS_FAIL':
        case 'ADMIN_QUESTIONS_FAIL':
            return {
                loading: false,
                error: action.payload
            }

        // If this action type dispatched since we just want to clear the errors,
        // we simply return the state array and set the errors to null.
        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}

// New question reducer.
export const newQuestionReducer = (state = { question: {} } , action) => {
    switch(action.type) {

        case 'NEW_QUESTION_REQUEST':
            return {
                ...state,
                loading: true
            }
        
        case 'NEW_QUESTION_SUCCESS':
            return {
                loading: false,
                success: action.payload.success,
                question: action.payload.question
            }

        case 'NEW_QUESTION_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case 'NEW_QUESTION_RESET':
            return {
                ...state,
                success: false
            }

        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

// Delete question reducer
export const deleteQuestionReducer = (state = {}, action) => {
    switch (action.type) {

        case 'DELETE_QUESTION_REQUEST':
            return {
                ...state,
                loading: true
            }

        // If this action type dispatched we return the state and set the isDeleted and 
        // question to the action payload    
        case 'DELETE_QUESTION_SUCCESS':
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case 'DELETE_QUESTION_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        // If this action type dispatched we return the state, set the isDeleted
        // to false since at this point the new question will have been deleted    
        case 'DELETE_QUESTION_RESET':
            return {
                ...state,
                isDeleted: false
            }

        case 'CLEAR_ERRORS':
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}