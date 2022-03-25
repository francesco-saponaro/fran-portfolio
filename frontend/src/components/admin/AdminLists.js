import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { adminProjectsAction, 
         adminQuestionsAction, 
         deleteProjectAction,
         deleteQuestionAction,
         clearErrors } from '../../actions/adminActions';

// Import installed package to display custom titles
import { Helmet } from 'react-helmet'

// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

// Admin component
const AdminList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    // We extract data from the store user with the useSelector hook,
    // To be passed in the front end and useEffect hook below.
    const { projects, error } = useSelector(state => state.projects);
    const { questions, error: qError } = useSelector(state => state.questions);
    const { isDeleted, error: deleteError } = useSelector(state => state.adminProject);
    const { isDeleted: isQDeleted, error: deleteQError } = useSelector(state => state.deleteQuestion);

    useEffect(() => {
        dispatch(adminProjectsAction());
        dispatch(adminQuestionsAction());

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(qError) {
            alert.error(qError);
            dispatch(clearErrors());
        }

        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(deleteQError) {
            alert.error(deleteQError);
            dispatch(clearErrors());
        }

        // If isDeleted is true in the store, meaning the project was deleted successfully,
        // show the success alert and dispatch the DELETE_PROJECT_RESET action which will reset the isDeleted
        // to false since at this point the new project will have been deleted.
        if(isDeleted) {
            alert.success('Project deleted successfully');
            dispatch({ type: 'DELETE_PROJECT_RESET' });
        }

        if(isQDeleted) {
            alert.success('Question deleted successfully');
            dispatch({ type: 'DELETE_QUESTION_RESET' });
        }

    }, [dispatch, alert, error, qError, deleteError, isDeleted, deleteQError, isQDeleted])

    return(
        <>
        {/* Custom title */}
        <Helmet><title>Francesco - Admin</title></Helmet>
        <div className='container container-fluid p-5'>
            {/* Projects */}
            <div className="row mb-5">
                {/* Projects table */}
                <div className='col-12'>
                    <table className="table table-hover table-bordered table-sm table-responsive">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>#</th>
                                <th>Project Name</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects && projects.map((project, index) => (
                                <tr key={project._id}>
                                    <th scope="row" className='text-center'>{index + 1}</th>
                                    <td>{project.name}</td>
                                    <td className='text-center'><Link to={`/admin/update/${project._id}`} className='btn btn-success'>Edit</Link></td>
                                    <td className='text-center'>
                                        <button className='btn btn-danger' onClick={() => dispatch(deleteProjectAction(project._id))}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add new project link */}
                <div className='col-12'>
                    <Link to={`/admin/newproject`} className="shuffle-btn py-2 px-2 d-block">
                        New project
                    </Link>
                </div>
            </div>

            {/* Questions */}
            <div className="row">
                {/* Questions table */}
                <div className='col-12'>
                    <table className="table table-hover table-bordered table-sm table-responsive">
                        <thead>
                            <tr>
                                <th scope="col" className='text-center'>#</th>
                                <th>Question</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions && questions.map((question, index) => (
                                <tr key={question._id}>
                                    <th scope="row" className='text-center'>{index + 1}</th>
                                    <td>{question.question}</td>
                                    <td className='text-center'>
                                        <button className='btn btn-danger' onClick={() => dispatch(deleteQuestionAction(question._id))}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Add new question link */}
                <div className='col-12'>
                    <Link to={`/admin/newquestion`} className="shuffle-btn py-2 px-2 d-block">
                        New Question
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default AdminList;
