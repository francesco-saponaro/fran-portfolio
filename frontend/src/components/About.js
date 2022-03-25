import React from 'react';

// About component
const About = ({ addBackground, removeBackground }) => {

    return(
        <>
        <div className='row pt-5 pb-md-4'>
            {/* About and CV */}
            <div className='col-12 col-md-6 about'>
                {/* About paragraph */}
                <p>
                I have recently obtained a diploma in Software Development from Code Institute,
                during which I have obtained Full Stack skills, specifically in HTML, CSS, JavaScript, 
                Python, Flask, Django, SQL and MongoDB.
                <br />
                Since my graduation I have been studying React and NodeJs and have been deep into solving 
                JavaScript and Python algorithms daily.
                <br />
                I have most recently completed my 5th portfolio project using the MERN stack. 
                </p>

                {/* CV link */}
                <a href='/docs/CV_SAPONARO_Francesco_Junior Full Stack Web Developer.pdf' 
                    target='blank' 
                    className='cta text-decoration-none mt-2'
                    onMouseOver={addBackground}
                    onMouseOut={removeBackground}>
                    <span>SEE <span className='cv'>CV</span></span>
                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </a>
            </div>

            {/* Profile pic and links */}
            <div className='col-12 col-md-6 pe-0 py-5 py-md-0'>
                <div className='row justify-content-center'>
                    {/* Profile pic */}
                    <div className='col-8 profile-pic pe-0'>
                        <img src='/images/profile-pic.jpg' alt='profile-pic' />
                    </div>

                    {/* Links */}
                    <div className='col-4 links pe-0'>
                        <a href='https://www.linkedin.com/in/francesco-saponaro87/' target='blank'>
                            <img src='/images/linkedin.png' alt='linkedin-logo' />
                        </a>
                        <a href='https://github.com/francesco-saponaro/' target='blank'>
                            <img src='/images/silhouette-de-logo-github-dans-un-carre.png' alt='github-logo' />
                        </a>
                        <a href='mailto:francescosaponaro5@gmail.com' className='email'>
                            <img src='/images/email.svg' alt='email-logo' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default About