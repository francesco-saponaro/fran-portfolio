import React from 'react';
import { Link } from 'react-router-dom'

// Dashboards (Medium and Small) component
const Dashboard = ({ currentProject, projects, bounce, unbounce, updateCurrentProject }) => {
    
    return (
        <>
        {/* Dashboard medium screens */}
        <div className='col-12 px-0 dashboard-lg d-none d-md-flex'>
            {/* Projects tabs */}
            {projects && projects.length > 0 ? (
                <>
                {currentProject ? (
                    projects.map(project => (
                        <p key={project._id}
                        className={`dashboard-links mb-0 py-4 text-center ${project.name.replace(/\s/g, '')} ` + 
                                    (`${currentProject.name.replace(/\s/g, '')}` === `${project.name.replace(/\s/g, '')}` && 'active')} 
                        style={{width: `${100 / (projects.length + 1)}%`}}
                        onClick={() => updateCurrentProject(project)}>
                            {project.name}
                        </p>
                    ))
                ) :
                    projects.map(project => (
                        <p key={project._id}
                        className={`dashboard-links mb-0 py-4 text-center ${project.name.replace(/\s/g, '')}`} 
                        style={{width: `${100 / (projects.length + 1)}%`}}
                        onClick={() => updateCurrentProject(project)}>
                            {project.name}
                        </p>
                    ))
                }
                </>
            ) : // If no projects matched notify the user
                <p className='dashboard-links mb-0 py-4 text-center no-match' 
                   style={{width: `${100 / (projects.length + 1)}%`}}>
                    No projects match your criteria
                </p>
            }

            {/* Quiz tab */}
            <p className='mb-0 text-center h-100'
            style={{width: `${100 / (projects.length + 1)}%`}}>
                {/* Quiz link */}
                <Link to='/quiz' className='quiz-link p-2'  
                        onMouseOver={bounce}
                        onMouseOut={unbounce}>
                    Test your JS skills
                    <img src='/images/test-quiz-svgrepo-com.svg' alt='quiz-logo' className='ps-1 quiz-img' />
                </Link>
            </p>
        </div>

        {/* Dashboard small screens */}
        <div className='col-12 px-0 dashboard-sm d-md-none'>
            {/* Projects tabs */}
            {projects && projects.length > 0 ? (
                <>
                {currentProject ? (
                    projects.map(project => (
                        <p key={project._id}
                        className={`dashboard-links dashboard-links-sm mb-0 py-3 text-center ${project.name.replace(/\s/g, '')} ` + 
                                (`${currentProject.name.replace(/\s/g, '')}` === `${project.name.replace(/\s/g, '')}` && 'active')}
                        onClick={() => updateCurrentProject(project)}>
                            {project.name}
                        </p>
                    ))
                ) :
                    projects.map(project => (
                        <p key={project._id}
                        className={`dashboard-links dashboard-links-sm mb-0 py-3 text-center ${project.name.replace(/\s/g, '')}`}
                        onClick={() => updateCurrentProject(project)}>
                            {project.name}
                        </p>
                    ))
                }
                </>
            ) : // If no projects matched notify the user
                <p className='dashboard-links dashboard-links-sm mb-0 py-3 text-center no-match' 
                style={{width: `${100 / (projects.length + 1)}%`}}>
                    No projects match your criteria
                </p>
            }

            {/* Quiz tab */}
            <p className='mb-0 text-center'>
                {/* Quiz link */}
                <Link to='/quiz' className='quiz-link py-3'  
                        onMouseOver={bounce}
                        onMouseOut={unbounce}>
                    Test your JS skills
                    <img src='/images/test-quiz-svgrepo-com.svg' alt='quiz-logo' className='ps-1 quiz-img' />
                </Link>
            </p>
        </div>
        </>
    )
}

export default Dashboard