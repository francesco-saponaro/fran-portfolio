import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

// Import actions
import { getProjectsAction, clearErrors } from '../actions/projectActions'

// Import components
import About from './About'
import Search from './layouts/Search'
import Dashboard from './layouts/Dashboard'
import Project from './Project'

// Home component
const Home = () => {

    // States
    // This state will set the currentProject on clicking on any of the corresponding dashboard tabs,
    // in order display its details below.
    const [currentProject, setCurrentProject] = useState('')
    // These two states serve the search functionality
    // Keyword will be set to the value (taken onChange from the input) when submitting the search form,
    // which in turn will fire the 'getProjectsAction' in the useEffect with keyword as a query.
    const [ keyword, setKeyword ] = useState('')
    const [ value, setValue ] = useState('');

    // We extract data from the state projects with the useSelector hook,
    // To be passed in the front end below
    const { projects, error } = useSelector(state => state.projects);

    // This useDispatch hook returns a reference to the redux dispatch function
    // We will use it to dispatch functions as needed
    const dispatch = useDispatch();

    const alert = useAlert();

    // The useEffect hook acts like a class lifecycle method but it can be used on
    // functional components
    // This hook will run everytime the page loads or reloads before everything else
    // So we will call the getProjects action function as soon as the page loads, which will send an
    // action to the reducer which will update the state, in this case it will send all projects
    // corresponding to the keyword into the state.
    // We also pass the 'keyword' variable in the array so this method will be called everytime
    // the keyword changes
    useEffect(() => {
        dispatch(getProjectsAction(keyword))

        if(error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [dispatch, keyword, alert, error])

    // Then once projects are in the state and been extracted with the 'useSelector' hook,
    // we set the current projects to a default value of the first project in the array (so that it will
    // display below as soon as the page loads).
    // We also pass the 'projects' variable in the array so this method will be called everytime
    // the projects changes 
    useEffect(() => {
        if(projects) {
            setCurrentProject(projects[0])
        }

        if(error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [projects, alert, error, dispatch])

    // Functions called onMouseOver and onMouseOut interacting with CV and Quiz links
    const addBackground = (e) => {
        let span = document.querySelector('.cv');
        let svg = document.querySelector('svg');
        span.style.color = '#335384';
        svg.style.stroke = '#335384';
    }

    const removeBackground = (e) => {
        let span = document.querySelector('.cv');
        let svg = document.querySelector('svg');
        span.style.color = '#00747C';
        svg.style.stroke = '#00747C';
    }

    const bounce = (e) => {
        let quizLogo = document.querySelectorAll('.quiz-img');
        quizLogo.forEach(logo => logo.style.webkitTransform = 'scale(1.2)');
        quizLogo.forEach(logo => logo.style.transform = 'scale(1.2)');
        quizLogo.forEach(logo => logo.style.webkitTransitionTimingFunction = 'cubic-bezier(0.47, 2.02, 0.31, -0.36)');
        quizLogo.forEach(logo => logo.style.transitionTimingFunction = 'cubic-bezier(0.47, 2.02, 0.31, -0.36)');
    }

    const unbounce = (e) => {
        let quizLogo = document.querySelectorAll('.quiz-img');
        quizLogo.forEach(logo => logo.style.webkitTransform = 'scale(1)');
        quizLogo.forEach(logo => logo.style.transform = 'scale(1)');
    }

    // Search functionality functions
    // This function sets the keyword to on submitting the search form,
    // which in turn will fire the 'getProjectsAction' in the useEffect with keyword as a query.
    const submitHandler = (e) => {
        e.preventDefault()

        setKeyword(value)
    }
    // This function resets the keyword to empty which in turn will fire the 'getProjectsAction'
    // in the useEffect with an empty query, querying all projects
    const resetHandler = (e) => {
        e.preventDefault()

        setKeyword('')

        // We set the class name of the search collapsible to just 'collapse' instead of 
        // 'collapse show', in order to hide it when resetting the search.
        document.querySelector('.collapse').className = 'collapse';
    }

    return (
        <>
        {/* Hero container */}
        <div className="container container-fluid hero-container">
            <About addBackground={addBackground} removeBackground={removeBackground} />
        </div>

        {/* Projects header */}
        <div className='container-fluid'>
            <div className='row pt-5'>
                <div className='col-12'>
                    <div className='header-font'>
                        <h2 className='text-center'>PROJECTS</h2>
                    </div>
                </div>
            </div>
        </div>

        {/* Dashboard container*/}
        <div className='container-fluid'>
            <div className='row pt-2 pb-5'>
                <div className='col-12 pb-4 text-center'>
                    {/* Search and reset icons */}
                    <div className='search-icons'>
                        {/* Search input icon */}
                        <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                            <img src='/images/search_logo.svg' alt='search_logo' />
                        </a>
                        {/* Reset icon */}
                        {keyword && 
                            <form onSubmit={resetHandler}>
                                <div>
                                    <button type='submit'>
                                        <i className="fa-solid fa-arrow-rotate-left ps-4"></i>
                                    </button>
                                </div>
                            </form>
                        }
                    </div>
                    {/* Search input collapsible */}
                    <div className="collapse" id="collapseExample">
                        <form onSubmit={submitHandler}>
                            <Search updateValue={setValue} />
                        </form>
                    </div>
                </div>
                {/* Dashboard */}
                <Dashboard currentProject={currentProject}
                            updateCurrentProject={setCurrentProject}
                            projects={projects} 
                            bounce={bounce}
                            unbounce={unbounce}/>
            </div>
        </div>

        {/* Project details container */}
        <div className='container-lg container-fluid proj-container'>
            {currentProject &&
                <Project currentProject={currentProject}/>
            }
        </div>
        </>
    )
}

export default Home