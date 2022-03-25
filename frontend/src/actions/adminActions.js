import axios from 'axios'

// ADMIN PROJECTS ACTIONS
// Get all projects action
export const adminProjectsAction = () => async (dispatch) => {
    try {
        dispatch({ type: 'ADMIN_PROJECTS_REQUEST' });

        const { data } = await axios.get('/api/v1/admin/projects');

        dispatch({ 
            type: 'ADMIN_PROJECTS_SUCCESS',
            payload: data
        })

    } catch(error) {
        dispatch({
            type: 'ADMIN_PROJECTS_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

// Get single project action
export const singleProjectAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'PROJECT_REQUEST' });

        const { data } = await axios.get(`/api/v1/admin/project/${id}`);

        dispatch({ 
            type: 'PROJECT_SUCCESS',
            payload: data
        })

    } catch(error) {
        console.log(error.response)
        dispatch({
            type: 'PROJECT_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

// New project action
export const newProjectAction = (projectData) => async (dispatch) => {
    try {
        dispatch({ type: 'NEW_PROJECT_REQUEST' });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/project/new`, projectData, config);

        dispatch({
            type: 'NEW_PROJECT_SUCCESS',
            payload: data
        })  
    } catch(error) {
        console.log(error.response)

        dispatch({
            type: 'NEW_PROJECT_FAIL',
            error: error.response.data.errMessage
        })
    }
}

// Update project action
export const updateProjectAction = (id, projectData) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_PROJECT_REQUEST' });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/projupdate/${id}`, projectData, config);

        dispatch({
            type: 'UPDATE_PROJECT_SUCCESS',
            payload: data.success
        })
    } catch(error) {
        dispatch({
            type: 'UPDATE_PROJECT_FAIL',
            error: error.response.data.errMessage
        })
    }
}

// Delete project action
export const deleteProjectAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_PROJECT_REQUEST' });

        const { data } = await axios.delete(`/api/v1/admin/project/${id}`);

        dispatch({
            type: 'DELETE_PROJECT_SUCCESS',
            payload: data.success
        })
    } catch(error) {
        dispatch({
            type: 'DELETE_PROJECT_FAIL',
            error: error.response.data.errMessage
        })
    }
}

// ADMIN QUIZ ACTIONS
// Get all questions action
export const adminQuestionsAction = () => async (dispatch) => {
    try {
        dispatch({ type: 'ADMIN_QUESTIONS_REQUEST' });

        const { data } = await axios.get('/api/v1/admin/questions');

        dispatch({ 
            type: 'ADMIN_QUESTIONS_SUCCESS',
            payload: data
        })

    } catch(error) {
        dispatch({
            type: 'ADMIN_QUESTIONS_FAIL',
            payload: error.response.data.errMessage
        })
    }
}

// New question action
export const newQuestionAction = (questionData) => async (dispatch) => {
    try {
        dispatch({ type: 'NEW_QUESTION_REQUEST' });

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/admin/question/new', questionData, config);

        dispatch({
            type: 'NEW_QUESTION_SUCCESS',
            payload: data
        })
    } catch(error) {
        dispatch({
            type: 'NEW_QUESTION_FAIL',
            error: error.response.data.errMessage
        })
    }
}

// Delete question action
export const deleteQuestionAction = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'DELETE_QUESTION_REQUEST' });

        const { data } = await axios.delete(`/api/v1/admin/question/${id}`);

        dispatch({
            type: 'DELETE_QUESTION_SUCCESS',
            payload: data.success
        })
    } catch(error) {
        dispatch({
            type: 'DELETE_QUESTION_FAIL',
            error: error.response.data.errMessage
        })
    }
}


// If this action type dispatched since we just want to clear the errors,
// we simply return the state array and set the errors to null
export const clearErrors = () => async (dispatch) => {
    dispatch({ type:'CLEAR_ERRORS' })
}