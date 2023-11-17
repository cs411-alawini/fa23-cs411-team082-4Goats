import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Trending from './Trending';
import Channel from './Channel';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/channel" element={<Channel />} />

        {/* You can add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
