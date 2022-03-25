import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { loginAction, clearErrors, logout } from '../../actions/userActions';

// Import installed package to display custom titles
import { Helmet } from 'react-helmet'

// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

// Login component
const Login = () => {

    // This useState hooks will set the state of each of them onChanging their value in the form below
    // They will both be passed in the login action function below.
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // We extract data from the store user with the useSelector hook,
    // To be passed in the front end and useEffect hook below
    const { isAuthenticated, error } = useSelector(state => state.user)

    // Navigate hook to redirect to another page
    const navigate = useNavigate();

    const alert = useAlert();
    const dispatch = useDispatch();

    // The useEffect hook acts like a class lifecycle method but it can be used on
    // functional components
    // This hook will run everytime the page loads or reloads before everything else
    // So we will check if the user is authenticated as soon as the page loads
    useEffect(() => {
        // If user is logged in or theres an error show alert
        if(isAuthenticated) {
            alert.success('Successfully logged in')
        }

        // If there is an error show alert from the react-alert package and
        // dispatch clearErrors action function which will reset the error to null.
        if(error) {
            // Don't show the error alert if its equal to the below text, since this error is generated
            // by the loadUser action that loads from the app and therefore on every page, but it is
            // irrelevant in the login page
            if(error !== 'You must log in to access this page') {
                alert.error(error);
                dispatch(clearErrors());
            }
        }
        // We can also add all data that we want to watch in an array as a second parameter
        // So whenever there is a change in any of the parameters below the useEffect hook will
        // be called
    }, [alert, error, isAuthenticated, dispatch])
    
    // This function will run on submitting the form
    // It will dispatch the login action function to the reducer with the email and 
    // password parameters from the state
    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(loginAction(email, password));
    }

    // This function will dispatch the logout action function which will remove
    // the token from the cookie and therefore logging the user out.
    const logoutHandler = () => {
        dispatch(logout());
        
        navigate('/');
        alert.success('Successfully logged out');
    }
    

    return(
        <>
        {/* Custom title */}
        <Helmet><title>Francesco - Login</title></Helmet>
        <div className='container container-fluid p-5'>
            <div className="row"> 
                <div className="col-12 col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                    {/* Login form */}
                    <form className="admin-form" onSubmit={submitHandler}>
                        <h1 className="mb-3 text-center">Login</h1>

                        {/* Email */}
                        <div className="form-group mb-3">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
            
                        {/* Password */}
                        <div className="form-group mb-5">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
            
                        {/* Submit button */}
                        <button
                            id="login_button"
                            type="submit"
                            className="shuffle-btn py-2 w-50 mb-3"
                            >
                            Login
                        </button>

                        {/* Logout button */}
                        <button className="shuffle-btn py-2 w-50" onClick={logoutHandler}>
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login