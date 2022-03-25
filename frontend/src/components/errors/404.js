import React from 'react';
import { Link } from 'react-router-dom'

// 404 component
const NotFound = () => {
    return(
        <div className="container container-fluid hero-container mt-5">
            <div className='row'>
                <div className='col-12 text-center'>
                    <h3>404 page not found</h3>
                    <p>We are sorry but the page you are looking for does not exist.</p>
                    {/* Logout button */}
                    <Link to="/" className="shuffle-btn p-2 w-50">
                        Home Page
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound;