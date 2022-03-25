import React from 'react';

// Search component
const Search = ({ updateValue }) => {

    return (
        <>
        <div className="mt-2 input-group">
            {/* Input */}
            <input type='text' 
                    placeholder='Search for a project by language, library, framework or database'
                    className="form-control p-2"
                    aria-label="Search for a project by language, library, framework or database" 
                    aria-describedby="button-addon2"
                    onChange={(e) => updateValue(e.target.value)}
            />

            {/* Submit button */}
            <button className="btn btn btn-outline-secondary" type="submit" id="button-addon2">
                <span className="icon">
                    <i className="fas fa-search"></i>
                </span>
            </button>
        </div>
        </>
    )
}

export default Search