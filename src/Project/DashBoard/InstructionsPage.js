import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './InstructionsPage.css'

const InstructionsPage = () => {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const navigate = useNavigate()

  // Handler for checkbox change
  const handleCheckboxChange = (event) => {
    setIsTermsAccepted(event.target.checked);
  };

  // Handler for starting the quiz
  const handleStartQuiz = () => {
    if (isTermsAccepted) {
      setIsQuizStarted(true);
      // Logic to start the quiz can be added here
    } else {
      alert('You must accept the terms and conditions to start the quiz.');
    }

    navigate(`/questions/start`)
  };

  return (
    <div className="exam-instructions-container">
           <header className="header">
           <div className="brand-logo">Lyros Online Portal</div>
           </header>

        <div className="instructions-content">
        {/* Left Section with Text */}
        <div className="instructions-text">
          <h1>Online Exam</h1>
          <p>
            Please read the following instructions carefully before starting the exam:
          </p>
          <ol typeof='1'>
            <li>Ensure a stable internet connection.</li>
            <li>Do not refresh the page during the exam.</li>
            <li>Time allotted for the exam is 60 minutes.</li>
            <li>Each question carries equal marks.</li>
            <li>Do not close the browser window during the exam.</li>
          </ol>
          <div>
        <input
          type="checkbox"
          id="termsCheckbox"
          checked={isTermsAccepted}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="termsCheckbox">I accept the terms and conditions</label>
      </div>
        </div>

        <button
        onClick={handleStartQuiz}
        disabled={!isTermsAccepted} className='in-btn'>
        Start Quiz
      </button>

      {isQuizStarted && <p>Quiz is starting...</p>}

        {/* Right Section with Image */}
        <div className="instructions-illustration">
          <img src='https://www.ncl.ac.uk/mediav8/exams/images/exams-header.jpg' alt="Exam Illustration" />
        </div>
      </div>
    </div>
  );
};
export default InstructionsPage;