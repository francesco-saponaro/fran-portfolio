import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// We import the reducers to be passed into the reducer variable
import { projectsReducer, projectReducer, newProjectReducer, adminProjectReducer } from './reducers/projectReducers';
import { questionsReducer, newQuestionReducer, deleteQuestionReducer } from './reducers/quizReducers';
import { userReducer } from './reducers/userReducer';

// This variable contains all reducers combined
// The reducers update the store with whatever action was dispatched
const reducers = combineReducers({
    projects: projectsReducer,
    project: projectReducer,
    newProject: newProjectReducer,
    adminProject: adminProjectReducer,
    questions: questionsReducer,
    newQuestion: newQuestionReducer,
    deleteQuestion: deleteQuestionReducer,
    user: userReducer
})

let initialState = {};

// We need to pass thunk into the store to be able to perform async requests when 
// dispatching actions to the reducer, like for example grabbing data from the backend or API
const middleware = [thunk];

// We associated the reducer with the store
// We pass thunk as a middleware to the store
const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;