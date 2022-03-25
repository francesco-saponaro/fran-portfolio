// The reducer sends the payload coming from the action to the store.
// All projects reducer.
export const projectsReducer = (state = { projects:[] } , action) => { 
    
    // So we check which action has been dispatched to the reducer and update
    // the state depending on the action type
    switch(action.type) {
        // If this action type dispatched we set the state proJECTs to an empty array
        case 'ALL_PROJECTS_REQUEST':
        case 'ADMIN_PROJECTS_REQUEST':
            return {
                loading: true,
                projects: []
            }

        // If this action type dispatched we set the state projects to the projects 
        // array in the action payload data
        case 'ALL_PROJECTS_SUCCESS':
        case 'ADMIN_PROJECTS_SUCCESS':
            return {
                loading: false,
                projects: action.payload.projects
            }

        // If this action type dispatched we get the error returning from the action payload
        case 'ALL_PROJECTS_FAIL':
        case 'ADMIN_PROJECTS_FAIL':
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

// Project details reducer.
export const projectReducer = (state = { project: {} } , action) => { 
    
    // So we check which action has been dispatched to the reducer and update
    // the state depending on the action type
    switch(action.type) {
        case 'PROJECT_REQUEST':
            return {
                ...state,
                loading: true
            }

        case 'PROJECT_SUCCESS':
            return {
                loading: false,
                project: action.payload.project
            }

        case 'PROJECT_FAIL':
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

// New project reducer
export const newProjectReducer = (state = { project: {} }, action) => {
    switch(action.type) {

        case 'NEW_PROJECT_REQUEST':
            return {
                ...state,
                loading: true
            }
        
        case 'NEW_PROJECT_SUCCESS':
            return {
                loading: false,
                success: action.payload.success,
                project: action.payload.project
            }

        case 'NEW_PROJECT_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case 'NEW_PROJECT_RESET':
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

// Delete and update project reducer
export const adminProjectReducer = (state = {}, action) => {
    switch (action.type) {

        case 'DELETE_PROJECT_REQUEST':
        case 'UPDATE_PROJECT_REQUEST':
            return {
                ...state,
                loading: true
            }

        // If this action type dispatched we return the state and set the isDeleted and 
        // project to the action payload    
        case 'DELETE_PROJECT_SUCCESS':
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        // If this action type dispatched we return the state and set the isUpdated and 
        // project to the action payload
        case 'UPDATE_PROJECT_SUCCESS':
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case 'DELETE_PROJECT_FAIL':
        case 'UPDATE_PROJECT_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        // If this action type dispatched we return the state, set the isDeleted
        // to false since at this point the new project will have been deleted    
        case 'DELETE_PROJECT_RESET':
            return {
                ...state,
                isDeleted: false
            }

        // If this action type dispatched we return the state, set the isUpdated
        // to false since at this point the new project will have been updated
        case 'UPDATE_PROJECT_RESET':
            return {
                ...state,
                isUpdated: false
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