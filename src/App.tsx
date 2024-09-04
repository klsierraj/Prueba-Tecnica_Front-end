import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './domains/users/pages/Home';
import Profile from './domains/users/pages/Profile';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/:username" element={<Profile />} />
            </Routes>
        </Router>
    );
};

export default App;
