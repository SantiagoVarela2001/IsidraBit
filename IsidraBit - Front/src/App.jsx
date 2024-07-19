import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homePage/homePage';
import SecretAddBeatPage from './components/AddBeatPage/secretAddBeatPage';


const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/secret-add-beat" element={<SecretAddBeatPage />} />
          </Routes>
      </Router>
  );
};

export default App;