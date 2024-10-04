import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import LoginForm from './Project/DashBoard/LoginForm';
import QuestionForm from './Project/DashBoard/QuestionForm'
import CreateQuiz from './Project/DashBoard/CreateQuestions';
import { QuestionsProvider } from './Project/QuestionsContext';
import UserSideBar from './Project/DashBoard/UserSideBar';

import HomePage from './Project/DashBoard/HomePage';
import UserLogin from './Project/DashBoard/UserLogin';
import UserCreateAccount from './Project/DashBoard/UserCreateAccount';
import AdminCreateAccount from './Project/DashBoard/AdminCreateAccount';
import AdminProfile from './Project/DashBoard/AdminSidebar';
import InstructionsPage from './Project/DashBoard/InstructionsPage';
import QuestionsStart from './Project/DashBoard/QuestionsStart';
import QuestionsAttempt from './Project/DashBoard/QuestionsAttempt';
import UserProfileWithScores from './Project/DashBoard/ViewResults';
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  return (
    <QuestionsProvider>
    <Router>
      <div className="App">
        <Routes>

        <Route path='/' element={<HomePage/>}/>
        <Route path="/admin-login" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/create-account" element={<AdminCreateAccount/>} />
          <Route  path='/user-login' element={<UserLogin onLogin={handleLogin}/>}/>
          <Route path='user-create-account' element={<UserCreateAccount/>}/>
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path='/user-profile' element={<UserSideBar/>}/>
          <Route path="/create-quiz" element={<QuestionForm/>} />
          <Route path='/create-questions' element={<CreateQuiz/>}/>
          <Route path='/instruction-popup' element={<InstructionsPage/>}/>
          <Route path='/questions/start' element={<QuestionsStart/>}/>
          <Route path='/questions/:technology' element={<QuestionsAttempt/>}/>
          <Route path='/view-results' element={<UserProfileWithScores/>}/>
        </Routes>
      </div>
    </Router>
    </QuestionsProvider>
  );
}

export default App;


