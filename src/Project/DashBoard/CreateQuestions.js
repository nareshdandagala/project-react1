import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateQuestions.css'; // Import the CSS for styles

const CreateQuestions = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const technology = queryParams.get('tech');
    const numQuestions = parseInt(queryParams.get('num'), 10);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionData, setQuestionData] = useState(new Array(numQuestions).fill({
        question: '',
        options: ['', '', '', ''],
        answer: '',
    }));

    const [currentInputData, setCurrentInputData] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: '',
    });

    const navigate = useNavigate();

    const handleInputChange = (field, value) => {
        if (field === 'question') {
            setCurrentInputData({ ...currentInputData, question: value });
        } else if (field.startsWith('option')) {
            const optionIndex = parseInt(field.replace('option', ''), 10);
            const updatedOptions = [...currentInputData.options];
            updatedOptions[optionIndex] = value;
            setCurrentInputData({ ...currentInputData, options: updatedOptions });
        } else if (field === 'answer') {
            setCurrentInputData({ ...currentInputData, answer: value });
        }
    };

    const handleNext = () => {
        const updatedData = [...questionData];
        updatedData[currentQuestion] = currentInputData;
        setQuestionData(updatedData);

        setCurrentInputData({
            question: '',
            options: ['', '', '', ''],
            answer: '',
        });

        setCurrentQuestion(currentQuestion + 1);
    };

    const handleFinish = async () => {
        const updatedData = [...questionData];
        updatedData[currentQuestion] = currentInputData;
        
        try {
            await axios.post('http://localhost:3000/questions', {
                technology,
                questions: updatedData,
            });
            navigate('/');
        } catch (error) {
            console.error('Error saving questions:', error);
        }
        alert('Questions created successfully!');
    };

    return (
        <div className="question-form-container">
            <h2 className="question-title">Create Question {currentQuestion + 1} of {numQuestions}</h2>
            <form className="question-form">
                <label className="form-label">
                    Question:
                    <input
                        className="form-input"
                        type="text"
                        value={currentInputData.question}
                        onChange={(e) => handleInputChange('question', e.target.value)}
                    />
                </label>
                <br />
                {[0, 1, 2, 3].map((optionIndex) => (
                    <div key={optionIndex} className="form-group">
                        <label className="form-label">
                            Option {optionIndex + 1}:
                            <input
                                className="form-input"
                                type="text"
                                value={currentInputData.options[optionIndex]}
                                onChange={(e) => handleInputChange(`option${optionIndex}`, e.target.value)}
                            />
                        </label>
                    </div>
                ))}
                <br />
                <label className="form-label">
                    Answer:
                    <input
                        className="form-input"
                        type="text"
                        value={currentInputData.answer}
                        onChange={(e) => handleInputChange('answer', e.target.value)}
                    />
                </label>
            </form>
            <br />
            {currentQuestion < numQuestions - 1 ? (
                <button className="form-btns next-btn" onClick={handleNext}>Next</button>
            ) : (
                <button className="form-btns finish-btn" onClick={handleFinish}>Finish</button>
            )}
        </div>
    );
};

export default CreateQuestions;
