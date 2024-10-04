import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const QuestionForm = () => {
    const [technology, setTechnology] = useState('');
    const [numQuestions, setNumQuestions] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (technology && numQuestions > 0) {
            navigate(`/create-questions?tech=${technology}&num=${numQuestions}`);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="question-form-container">
            <h2 className="form-title">Create a Quiz</h2>
            <label className="form-label">
                Select Technology:
                <select
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                    className="form-input"
                >
                    <option value="">--Select--</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JS</option>
                    <option value="React">React</option>
                </select>
            </label>
            <br />
            <label className="form-label">
                Number of Questions:
                <input
                    type="number"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                    className="form-input"
                />
            </label>
            <br />
            <button type="submit" className="submit-btn">Submit</button>
        </form>
    );
};

export default QuestionForm;
