import React from 'react';

// Project details component
const Project = ({ currentProject }) => {

    return (
        <>
        <div className='row pb-5'>
            {/* Image */}
            <div className='col-12 col-md-8 mb-3'>
            {currentProject.name &&
                <div className='image-container'>
                    <img src={`/images/${currentProject.name.replace(/\s/g, '')}.png`} alt='project_image' />
                </div>
            }
            </div>

            {/* Info */}
            <div className='col-12 col-md-4'>
                <div className='row'>
                    <div className='col-12 project-info'>
                        {/* Live site link */}
                        <p className='project-fields mb-1'>Live Site</p>
                        <a href={currentProject.app && currentProject.app} 
                            target='blank'
                            className='live-site mb-3 text-decoration-underline'>
                            {currentProject.app && currentProject.app}
                        </a>
                    
                        {/* Description */}
                        <p className='project-fields mb-1'>Description</p>
                        <p className='description'>
                            {currentProject.description && currentProject.description}
                        </p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-6 project-info'>
                        {/* Languages */}
                        <p className='project-fields mb-1'>Languages</p>
                            {currentProject.languages && currentProject.languages.length > 0
                                ?
                                <ul>
                                    {currentProject.languages && currentProject.languages.map(language => (
                                        <li key={language._id}>{language.language}</li>
                                    ))}
                                </ul>
                                : <p>None</p>
                            }

                        {/* Libraries */}
                        <p className='project-fields mb-1'>Libraries</p>
                            {currentProject.libraries && currentProject.libraries.length > 0
                                ?
                                <ul>
                                    {currentProject.libraries.map(library => (
                                        <li key={library._id}>{library.library}</li>
                                    ))}
                                </ul>
                                : <p>None</p>
                            }
                        
                        {/* Frameworks */}
                        <p className='project-fields mb-1'>Frameworks</p>
                            {currentProject.frameworks && currentProject.frameworks.length > 0
                                ?
                                <ul>
                                    {currentProject.frameworks.map(framework => (
                                        <li key={framework._id}>{framework.framework}</li>
                                    ))}
                                </ul>
                                : <p>None</p>
                            }
                    </div>

                    <div className='col-6 project-info'>
                        {/* Database */}
                        <p className='project-fields mb-1'>Database</p>
                            {currentProject.frameworks && currentProject.frameworks.length > 0
                                ?
                                <p>
                                    {currentProject.database && currentProject.database}
                                </p>
                                : <p>None</p>
                            }

                        {/* Other */}
                        <p className='project-fields mb-1'>Other</p>
                            {currentProject.other && currentProject.other.length > 0 
                                ?
                                <ul>
                                    {currentProject.other.map(item => (
                                        <li key={item._id}>{item.item}</li>
                                    ))}
                                </ul> 
                                : <p>None</p>
                            }

                        {/* Github link */}
                        <p className='project-fields mb-1'>Github</p>
                        <a href={currentProject.github && currentProject.github} 
                            target='blank'
                            className='github mb-3 text-decoration-underline'>
                            {currentProject.github && currentProject.github}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Project