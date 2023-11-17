import React from 'react';
import { Link } from 'react-router-dom';
import './Channel.css'; 
function Channel() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <nav className="navigation">
          {/* Placeholder for back button and site logo */}
          <div className="nav-item">←</div>
          <div className="nav-item">🔍 mytube.com</div>
          <div className="nav-item">Username</div>
        </nav>
        <div className="site-name">MyTube</div>
      </header>
      <main className="main-content">
        <div className="channel-info">
          <div className="channel-name">CHANNEL NAME</div>
          <div className="subscriber-count">Subscriber Count</div>
        </div>
        <div className="buttons-section">
          <Link to="/trending-ideas" className="button">Trending Ideas Button</Link>
          <Link to="/analytics" className="button">Analytics Dashboard Button</Link>
        </div>
        <div className="images-section">
          <div className="image-container">
            {/* Placeholder for image */}
            <div className="image-placeholder">Image</div>
          </div>
          <div className="image-container">
            {/* Placeholder for image */}
            <div className="image-placeholder">Image</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Channel;
