import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getQuestionsAction, clearErrors } from '../../actions/quizActions'

// Import installed package to display custom titles
import { Helmet } from 'react-helmet'

// Import necessary property from react alert to display alerts
import { useAlert } from 'react-alert';

const Quiz = () => {

    const dispatch = useDispatch();

    const alert = useAlert();

    // Extract questions sent to by the 'getQuestionAction' function to the state 
    const { error, questions } = useSelector(state => state.questions);

    // On page load get questions from backend
    useEffect(() => {
        dispatch(getQuestionsAction())

        if(error) {
            alert.error(error)
            dispatch(clearErrors());
        }
    }, [alert, dispatch, error])
    
    // Function to get questions from backend (which will send a new set of questions) 
    const resetQuestions = () =>{
        dispatch(getQuestionsAction())
    }

    // Quiz form submit function
    const submitHandler = (e) => {
        e.preventDefault();

        // Scroll page to top
        document.querySelector("body").scrollTo({ top: 0, behavior: 'smooth' })

        // Grab all required dom elements
        let selectedInputs = document.querySelectorAll('input[type="radio"]:checked');
        let otherInputs = document.querySelectorAll('input[type="radio"]:not(:checked)');
        let result = document.querySelector('.result');
        let startAgain = document.querySelector('.start-again');
        let newQuestions = document.querySelector('.new-questions');

        // Count variable (to be increased on each input with a value of true)
        let count = 0;

        // Check the user has filled answered all 12 questions
        if(selectedInputs.length !== 12) {
            alert.error('You must submit all answers')
        } else {
            // For each checked answer....
            selectedInputs.forEach(input => {
                // Disable the answer
                input.disabled = true
                // If the answer has a value of true (correct answer), increase count 
                // by 1 and change style to green and white
                if(input.value === 'true') {
                    count++
                    input.parentElement.style.backgroundColor = 'green'
                    input.parentElement.style.color = 'white'
                    input.style.backgroundColor = 'green'
                    input.style.borderColor = 'white'         
                } else {
                    // Else just change styles to red and white
                    input.parentElement.style.backgroundColor = 'red'
                    input.parentElement.style.color = 'white'
                    input.style.backgroundColor = 'red'
                    input.style.borderColor = 'white'
                }
            })

            // For all unchecked answers...
            otherInputs.forEach(input => {
                // Disable the answer
                input.disabled = true
                // If the answer has a value of true (correct answer), add text and
                // style to span to indicate it was the right answer.
                if(input.value === 'true') {
                    input.nextElementSibling.innerText = 'Right answer'
                    input.nextElementSibling.style.color = 'green'
                    input.nextElementSibling.style.fontWeight = 'bold'
                    input.nextElementSibling.classList.add('ms-3')
                }
            })

            // Add inner text to indicate score and make the start again button visible
            result.innerText = `${count === 12 ? 'Congratulations!' : ''} Your score is: ${count} `;
            startAgain.style.display = 'inline-block';
            newQuestions.style.display = 'none';
        }
    }

    return(
        <>
        {/* Custom title */}
        <Helmet><title>Francesco - Quiz</title></Helmet>
        {/* Quiz header */}
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-12 text-center py-4 px-2 nav-title header-font'>
                    <h2 className='mb-0'>Test your JavaScript skills with this simple quiz</h2>
                </div>
            </div>
        </div>

        {/* Quiz container */}
        <div className='container container-fluid quiz-container p-5'>
            {/* Quiz instructions and ctas */}
            <div className='row'>
                {/* Quiz instructions and reset button */}
                <div className='col-6 pb-4'>
                    <ul>
                        <li><small>Test contains 12 questions</small></li>
                        <li><small>1 point for each correct answer. Maximum score 12 points</small></li>
                        <li><small>Your score will be diplayed at the end of the quiz</small></li>
                    </ul>
                    <p onClick={() => resetQuestions()}
                        className='shuffle-btn p-2 new-questions'>
                            Get new questions 
                            <i className="fa-solid fa-shuffle ms-2"></i>
                    </p>
                </div>
                {/* Home link */}
                <div className='col-6 pb-4'>
                    <div className='float-end'>
                        <Link to='/' className='p-2 home-icon'>
                            <i class="fa-solid fa-left-long"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Result and start again button */}
            <div className='row'>
                <div className='col-12 text-center pb-5'>
                    <h3 className='result'></h3>
                    <a href='/quiz'
                        className='shuffle-btn p-2 start-again' 
                        style={{ display:'none' }}>
                            Start again 
                            <i className="fa-solid fa-shuffle ms-2"></i>
                    </a>
                </div>
            </div>

            {/* Quiz form */}
            <div className='row'>
                <form onSubmit={submitHandler}>
                    {/* Question */}
                    {questions && questions.map((question, qIndex) => (
                        <div key={question._id} className='col-12 pb-4'>
                            <div className="list-group question">
                                <p><strong>{question.question}</strong></p>
                                {/* Answers */}
                                {question.answers.map((answer, index) => (
                                    <label key={answer._id} className="list-group-item answers py-3">
                                        <input className="form-check-input me-2" 
                                            name={`question${qIndex}`} 
                                            id={`flexRadioDefault${index}`}
                                            type="radio" 
                                            value={answer.boolean} />
                                        {answer.answer} <span className='right-answer'></span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Submit button */}
                    <div className='col-12'>
                        <button className='p-2 shuffle-btn'>Submit your answers</button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Quiz