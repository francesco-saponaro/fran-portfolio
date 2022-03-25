import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Import installed package to display custom titles
import { Helmet } from 'react-helmet'
// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

import { singleProjectAction, updateProjectAction, clearErrors } from '../../actions/adminActions';

// Update project component
const UpdateProject = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const params = useParams();

    // State to be set by form fields below
    const [ name, setName ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ languages, setLanguages ] = useState([]);
    const [ frameworks, setFrameworks ] = useState([]);
    const [ database, setDatabase ] = useState('');
    const [ libraries, setLibraries ] = useState([]);
    const [ other, setOther ] = useState([]);
    const [ github, setGithub ] = useState('');
    const [ app, setApp ] = useState('');

    // We extract data from the store project and adminProject with the useSelector hook,
    // To be passed in the useEffect hook below
    const { project, error } = useSelector(state => state.project);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.adminProject);

    // Extract the id parameter from the URL
    const { id } = params;

    useEffect(() => {

        // Preset the state fields with data from the project that equals the ID in the URL
        if (project && project._id !== id) {
            dispatch(singleProjectAction(id));
        } else {
            setName(project.name)
            setDescription(project.description)
            setLanguages(project.languages.map(language => language.language))
            setFrameworks(project.frameworks.map(framework => framework.framework))
            setDatabase(project.database)
            setLibraries(project.libraries.map(library => library.library))
            setOther(project.other.map(item => item.item))
            setGithub(project.github)
            setApp(project.app)
        }

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors())
        }

        // If isUpdated is true in the store, meaning the project was updated successfully,
        // show the success alert and dispatch the UPDATE_PROJECT_RESET action which will reset the isUpdated
        // to false since at this point the new project will have been updated.
        if(isUpdated) {
            alert.success('Project updated successfully');
            navigate('/admin');
            dispatch({ type: 'UPDATE_PROJECT_RESET' });
        }
    }, [error, alert, isUpdated, dispatch, navigate, id, updateError, project])

    // This function will run on submitting the form.
    // It will dispatch the newProject action function to the reducer with the form object
    // set below.
    const submitHandler = (e) => {
        e.preventDefault();

        console.log(languages)

        // Object to be passed in the action function
        const form = {
            name: name,
            description: description,
            languages: [],
            frameworks: [],
            database: database,
            libraries: [],
            other: [],
            github: github,
            app: app,
        }

        // Iterate through state arrays and push items into corresponding form object fields arrays
        // in object formats, as set by the model.
        for(let i=0; i < languages.length; i++) {
            form.languages.push({language: languages[i]})
        }
        for(let i=0; i < frameworks.length; i++) {
            form.frameworks.push({framework: frameworks[i]})
        } 
        for(let i=0; i < libraries.length; i++) {
            form.libraries.push({library: libraries[i]})
        } 
        for(let i=0; i < other.length; i++) {
            form.other.push({item: other[i]})
        } 

        dispatch(updateProjectAction(project._id, form));
    }

    // Variable to store the below form fields values onChange
    let tempVal = '';

    return(
        <>
        {/* Custom title */}
        <Helmet><title>Francesco - Update Project</title></Helmet>
        <div className='container container-fluid p-5'>
            <div className="row">
                <div className="col-12">
                        <div className="wrapper my-5">
                        {/* Update project form */}
                        <form className='admin-form' onSubmit={submitHandler}>
                            <h1 className="mb-4">Update Project</h1>

                            {/* Project name */}
                            <div className="form-group mb-3">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            {/* Project description */}
                            <div className="form-group mb-3">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" 
                                          id="description_field" 
                                          rows="8" 
                                          value={description} 
                                          onChange={(e) => setDescription(e.target.value)}>
                                </textarea>
                            </div>

                            {/* Project languages */}
                            <div className="form-group mb-3">
                                <label htmlFor="languages_field">Languages</label>
                                <input
                                    type="text"
                                    id="languages_field"
                                    className="form-control"
                                    // OnChange store the value in a variable, which we will use to set this state
                                    // with. 
                                    // So on pressing enter add the variable to this particular state and reset 
                                    // the value to null so the user can keep adding more values to the state.
                                    onChange={(e) => tempVal = e.target.value}
                                    onKeyDown={(e) => {if(e.keyCode === 32 && e.target.value.trim() !== '') {
                                                            setLanguages(oldArray => [...oldArray, tempVal.trim()]);
                                                            e.target.value = null;
                                                        }
                                                    }
                                            }
                                />
                                {/* Display all items in this state */}
                                <div className='array'>
                                    {languages && languages.map((language, index) => (
                                        <span key={index}
                                              className='me-2 mt-2 btn btn-primary'
                                              // OnClick remove this particular item from the state
                                              onClick={() => setLanguages(languages.filter(item => item !== language))}
                                        >
                                            {language} <i className="fa-solid fa-trash-can"></i>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project frameworks */}
                            <div className="form-group mb-3">
                                <label htmlFor="frameworks_field">Frameworks</label>
                                <input
                                    type="text"
                                    id="frameworks_field"
                                    className="form-control"
                                    // OnChange store the value in a variable, which we will use to set this state
                                    // with. 
                                    // So on pressing enter add the variable to this particular state and reset 
                                    // the value to null so the user can keep adding more values to the state.
                                    onChange={(e) => tempVal = e.target.value}
                                    onKeyUp={(e) => {if(e.keyCode === 32 && e.target.value.trim() !== '') {
                                                            setFrameworks(oldArray => [...oldArray, tempVal.trim()]);
                                                            e.target.value = null;
                                                        }
                                                    }
                                            }
                                />
                                {/* Display all items in this state */}
                                <div className='array'>
                                    {frameworks && frameworks.map((framework, index) => (
                                        <span key={index}
                                              className='me-2 mt-2 btn'
                                              // OnClick remove this particular item from the state
                                              onClick={() => setFrameworks(frameworks.filter(item => item !== framework))}
                                        >
                                            {framework} <i className="fa-solid fa-trash-can"></i>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project database */}
                            <div className="form-group mb-3">
                                <label htmlFor="database_field">Database</label>
                                <input
                                    type="text"
                                    id="database_field"
                                    className="form-control"
                                    value={database}
                                    onChange={(e) => setDatabase(e.target.value)}
                                />
                            </div>

                            {/* Project libraries */}
                            <div className="form-group mb-3">
                                <label htmlFor="libraries_field">libraries</label>
                                <input
                                    type="text"
                                    id="libraries_field"
                                    className="form-control"
                                    // OnChange store the value in a variable, which we will use to set this state
                                    // with. 
                                    // So on pressing enter add the variable to this particular state and reset 
                                    // the value to null so the user can keep adding more values to the state.
                                    onChange={(e) => tempVal = e.target.value}
                                    onKeyUp={(e) => {if(e.keyCode === 32 && e.target.value.trim() !== '') {
                                                            setLibraries(oldArray => [...oldArray, tempVal.trim()]);
                                                            e.target.value = null;
                                                        }
                                                    }
                                            }
                                />
                                {/* Display all items in this state */}
                                <div className='array'>
                                    {libraries && libraries.map((library, index) => (
                                        <span key={index}
                                              className='me-2 mt-2 btn btn-primary'
                                              // OnClick remove this particular item from the state
                                              onClick={() => setLibraries(libraries.filter(item => item !== library))}
                                        >
                                            {library} <i className="fa-solid fa-trash-can"></i>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project other */}
                            <div className="form-group mb-3">
                                <label htmlFor="other_field">Other</label>
                                <input
                                    type="text"
                                    id="other_field"
                                    className="form-control"
                                    // OnChange store the value in a variable, which we will use to set this state
                                    // with. 
                                    // So on pressing enter add the variable to this particular state and reset 
                                    // the value to null so the user can keep adding more values to the state.
                                    onChange={(e) => tempVal = e.target.value}
                                    onKeyUp={(e) => {if(e.keyCode === 32 && e.target.value.trim() !== '') {
                                                            setOther(oldArray => [...oldArray, tempVal.trim()]);
                                                            e.target.value = null;
                                                        }
                                                    }
                                            }
                                />
                                {/* Display all items in this state */}
                                <div className='array'>
                                    {other && other.map((item, index) => (
                                        <span key={index}
                                              className='me-2 mt-2 btn btn-primary'
                                              // OnClick remove this particular item from the state
                                              onClick={() => setOther(other.filter(i => i !== item))}
                                        >
                                            {item} <i className="fa-solid fa-trash-can"></i>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project github */}
                            <div className="form-group mb-3">
                                <label htmlFor="github_field">Github</label>
                                <input
                                    type="text"
                                    id="github_field"
                                    className="form-control"
                                    value={github}
                                    onChange={(e) => setGithub(e.target.value)}
                                />
                            </div>

                            {/* Project app */}
                            <div className="form-group mb-5">
                                <label htmlFor="app_field">app</label>
                                <input
                                    type="text"
                                    id="app_field"
                                    className="form-control"
                                    value={app}
                                    onChange={(e) => setApp(e.target.value)}
                                />
                            </div>
                            
                            {/* Submit button */}
                            <button
                                id="login_button"
                                type="submit"
                                className=" shuffle-btn btn d-block w-100 py-2"
                                disabled={loading ? true : false}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    ) 
}

export default UpdateProject;