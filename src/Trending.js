import React from 'react';
import './Trending.css'; // Make sure this path is correct for your project structure

function Trending() {
  return (
    <div className="trending-page">
      <header className="dashboard-header">
        <nav className="navigation">
          {/* Placeholder for back button and site logo */}
          <div className="nav-item">←</div>
          <div className="nav-item">🔍 mytube.com</div>
          <div className="nav-item">Username</div>
        </nav>
        <div className="header-item">Trending</div>
      </header>
      <section className="content">
        <div className="content-box">
          <div className="box-header">TRENDING HEADER</div>
          {/* Placeholder for trending header content */}
        </div>
        <div className="content-box">
          <div className="box-header">Trending Videos List</div>
          {/* Placeholder for list of trending videos */}
          <ul>
            {/* Mock data: Replace with actual data */}
            <li>Video 1</li>
            <li>Video 2</li>
            <li>Video 3</li>
          </ul>
        </div>
        <div className="content-box">
          <div className="box-header">Trending Channels List</div>
          {/* Placeholder for list of trending channels */}
          <ul>
            {/* Mock data: Replace with actual data */}
            <li>Channel 1</li>
            <li>Channel 2</li>
            <li>Channel 3</li>
          </ul>
        </div>
        <div className="content-box">
          <div className="box-header">Trending Tags List</div>
          {/* Placeholder for list of trending tags */}
          <ul>
            {/* Mock data: Replace with actual data */}
            <li>Tag 1</li>
            <li>Tag 2</li>
            <li>Tag 3</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Trending;
