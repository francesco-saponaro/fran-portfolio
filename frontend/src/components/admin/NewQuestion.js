import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import installed package to display custom titles
import { Helmet } from 'react-helmet'
// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

import { newQuestionAction, clearErrors } from '../../actions/adminActions';

// New question component
const NewQuestion = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    // States to be set by form fields below
    const [ question, setQuestion ] = useState('');
    const [ answers, setAnswers ] = useState([]);
    const [ index, setIndex ] = useState();

    // We extract data from the store newProject with the useSelector hook,
    // To be passed in the useEffect hook below
    const { loading, error, success } = useSelector(state => state.newQuestion);

    useEffect(() => {

        if(error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        // If success is true in the store, meaning the question was created successfully,
        // redirect the user to the admin page, show the success alert and dispatch 
        // the NEW_QUESTION_RESET action which will reset the success
        // to false since at this point the new question will have been created.
        if(success) {
            alert.success('New question added successfully');
            navigate('/admin');
            dispatch({ type: 'NEW_QUESTION_RESET' });
        }
    }, [error, alert, success, dispatch, navigate])

    // This function will run on submitting the form.
    // It will dispatch the newQuestion action function to the reducer with the form object
    // set below.
    const submitHandler = (e) => {
        e.preventDefault();

        // Object to be passed in the action function
        const form = {
            question: question,
            answers: [],
        }

        // Iterate through state answers and push items into corresponding form answers arrays
        // in object formats, as set by the model.
        // First check the index isnt undefined which means at least one answer has a value of
        // true. 
        if(index !== undefined) {
            for(let i=0; i < answers.length; i++) {
                // If the state index equals the iteration push the answer and the boolean property as true,
                // Otherwise just the answer and the boolean property will have a default value of false,
                // as specified in the model.
                if(Number(index) === i) {
                    form.answers.push({
                                    answer: answers[i],
                                    boolean: 'true'
                                    })
                } else {
                    form.answers.push({answer: answers[i]})
                }
            }

            dispatch(newQuestionAction(form));
        } else {
            alert.error('You must assign a true answer')
        }

    }

    // Variable to store the below form fields values onChange
    let tempVal = '';

    return(
        <>
        {/* Custom title */}
        <Helmet><title>Francesco - New Question</title></Helmet>
        <div className='container container-fluid p-5'>
            <div className="row">
                <div className="col-12">
                        <div className="wrapper my-5">
                        {/* New question form */}
                        <form className='admin-form' onSubmit={submitHandler}>
                            <h1 className="mb-4">New Question</h1>

                            {/* Question */}
                            <div className="form-group mb-3">
                                <label htmlFor="question_field">Question</label>
                                <input
                                    type="text"
                                    id="question_field"
                                    className="form-control"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                            </div>

                            {/* Answers */}
                            <div className="form-group mb-3">
                                <label htmlFor="answers_field">Answers</label>
                                <input
                                    type="text"
                                    id="answers_field"
                                    className="form-control"
                                    // OnChange store the value in a variable, which we will use to set this state
                                    // with. 
                                    // So on pressing enter add the variable to this particular state and reset 
                                    // the value to null so the user can keep adding more values to the state.
                                    onChange={(e) => tempVal = e.target.value}
                                    onKeyDown={(e) => {if(e.keyCode === 32 && e.target.value.trim() !== '') {
                                                            setAnswers(oldArray => [...oldArray, tempVal.trim()]);
                                                            e.target.value = null;
                                                        }
                                                    }
                                            }
                                />

                                {/* Display all state answers */}
                                <div className='array answersArray'>
                                    {answers && answers.map((answer, index) => (
                                        // Answer
                                        <span key={index} className='mt-2 btn'>
                                            {/* Answer number */}
                                            <strong className='pe-2'>{index + 1})</strong> 
                                            {/* Answer */}
                                            {answer}
                                            {/* OnClicking this icon remove answer from the state */}
                                            <i className="fa-solid fa-trash-can ps-4"
                                               onClick={() => setAnswers(answers.filter(item => item !== answer))}>
                                            </i>
                                            {/* OnClicking this checkbox set index state to this iteration */}
                                            <label htmlFor="answer" className='float-end d-inline-flex align-items-center'>
                                                <input type='radio'
                                                    id='answer'
                                                    name='answer'
                                                    onClick={() => setIndex(`${index}`)} 
                                                />
                                                True
                                            </label><br></br>                                   
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Submit button */}
                            <button
                                id="login_button"
                                type="submit"
                                className=" shuffle-btn btn d-block w-100 py-2"
                                disabled={loading ? true : false}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    ) 
}

export default NewQuestion;