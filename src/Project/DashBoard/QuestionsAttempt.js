import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuestionsAttempt= () => {
    const { technology } = useParams();
    const { id } = useParams();
//   const location = useLocation();
//   const user = location.state.user;
   
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
               
                const response = await axios.get(`http://localhost:3000/questions?technology=${technology}`);
                if (response.data.length > 0) {
                    setQuestions(response.data[0].questions);
                    setAnswers(new Array(response.data[0].questions.length).fill(null)); 
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [technology]);

    const handleAnswerChange = (value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = value;
        setAnswers(updatedAnswers);
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleFinish = async () => {
        let totalScore = 0;
        
       
        questions.forEach((question, index) => {
            if (answers[index] === question.answer) {
                totalScore += 1;
            }
        });
        setScore(totalScore);
    
        try {
           
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
           
            if (!loggedInUser || !loggedInUser.id) {
                console.error('User is not logged in or ID is missing');
                alert('There was a problem retrieving your user data. Please log in again.');
                navigate('/login'); 
                return; 
            }
    
            const userId = loggedInUser.id;  
    
           
            const response = await axios.get(`http://localhost:3000/users/${userId}`);
            const user = response.data;
    
           
            const scores = Array.isArray(user.scores) ? user.scores : [];
    
            
            const updatedUser = {
                ...user,
                scores: [
                    ...scores,
                    {
                        technology: technology,      
                        score: totalScore,            
                        totalQuestions: questions.length  
                    }
                ]
            };
            await axios.put(`http://localhost:3000/users/${userId}`, updatedUser);
    
            console.log('Score saved successfully!');
            alert(`Your score is ${totalScore} out of ${questions.length}`);
        } catch (error) {
            console.error('Error saving score:', error);
        }
    };
    
    
    if (score !== null) {
        return (
            <div>
                <h2>Your Score: {score} / {questions.length}</h2>
               <button> <Link to='/user-login'>Exit</Link></button>
            </div>
        );
      
    };

    return (
        <div>
            <h2>Attempt Questions for {technology}</h2>
            {questions.length === 0 ? (
                <p>No questions available.</p>
            ) : (
                <div>
                    <h3>Question {currentQuestionIndex + 1}</h3>
                    <p>{questions[currentQuestionIndex].question}</p>
                    {questions[currentQuestionIndex].options.map((option, idx) => (
                        <div key={idx}>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}`}
                                    value={option}
                                    checked={answers[currentQuestionIndex] === option}
                                    onChange={() => handleAnswerChange(option)}
                                />
                                {option}
                            </label>
                        </div>
                    ))}

                    <div>
                        {currentQuestionIndex < questions.length - 1 ? (
                            <button onClick={handleNext}>Next</button>
                        ) : (
                            <button onClick={handleFinish}>Finish</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuestionsAttempt;

// src/components/QuestionsAttempt.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useUser } from '../UserContext'; // Import the useUser hook

// const QuestionsAttempt = () => {
//     const { technology } = useParams();
//     const { user, setUser } = useUser(); // Access logged-in user data from context
//     const [questions, setQuestions] = useState([]);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [answers, setAnswers] = useState([]);
//     const [score, setScore] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchQuestions = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/questions?technology=${technology}`);
//                 if (response.data.length > 0) {
//                     setQuestions(response.data[0].questions);
//                     setAnswers(new Array(response.data[0].questions.length).fill(null));
//                 }
//             } catch (error) {
//                 console.error('Error fetching questions:', error);
//             }
//         };
//         fetchQuestions();
//     }, [technology]);

//     const handleAnswerChange = (value) => {
//         const updatedAnswers = [...answers];
//         updatedAnswers[currentQuestionIndex] = value;
//         setAnswers(updatedAnswers);
//     };

//     const handleNext = () => {
//         if (currentQuestionIndex < questions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//         }
//     };

//     const handleFinish = async () => {
//         let totalScore = 0;
//         questions.forEach((question, index) => {
//             if (answers[index] === question.answer) {
//                 totalScore += 1;
//             }
//         });
//         setScore(totalScore);

//         try {
//             const userId = user.id; // Get the user ID from context
//             const scoreData = {
//                 technology,
//                 score: totalScore,
//                 totalQuestions: questions.length
//             };

//             // Fetch the user's data to update the scores array
//             const response = await axios.get(`http://localhost:3000/users/${userId}`);
//             const userData = response.data;

//             // Update the user's scores array
//             const updatedUserData = {
//                 ...userData,
//                 scores: [...userData.scores, scoreData]
//             };

//             // Save the updated user data with the new score
//             await axios.put(`http://localhost:3000/users/${userId}`, updatedUserData);

//             // Update the user in the context
//             setUser(updatedUserData);

//             console.log('Score saved successfully!');
//         } catch (error) {
//             console.error('Error saving score:', error);
//         }
//     };

//     if (score !== null) {
//         return (
//             <div>
//                 <h2>Your Score: {score} / {questions.length}</h2>
//             </div>
//         );
//     }

//     return (
//         <div>
//             <h2>Attempt Questions for {technology}</h2>
//             {questions.length === 0 ? (
//                 <p>No questions available.</p>
//             ) : (
//                 <div>
//                     <h3>Question {currentQuestionIndex + 1}</h3>
//                     <p>{questions[currentQuestionIndex].question}</p>
//                     {questions[currentQuestionIndex].options.map((option, idx) => (
//                         <div key={idx}>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name={`question-${currentQuestionIndex}`}
//                                     value={option}
//                                     checked={answers[currentQuestionIndex] === option}
//                                     onChange={() => handleAnswerChange(option)}
//                                 />
//                                 {option}
//                             </label>
//                         </div>
//                     ))}

//                     <div>
//                         {currentQuestionIndex < questions.length - 1 ? (
//                             <button onClick={handleNext}>Next</button>
//                         ) : (
//                             <button onClick={handleFinish}>Finish</button>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QuestionsAttempt;
