import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';

function Home() {
  return (
    <div className="analytics-dashboard">
      <header className="dashboard-header">
        <nav className="navigation">
          <div className="nav-item">←</div>
          <div className="nav-item">🔍 mytube.com</div>
          <div className="nav-item">Username</div>
        </nav>
        <div className="header-item">Analytics Dashboard</div>
      </header>
      <section className="content">
        <div className="content-row">
          <div className="content-box">
            <div className="box-header">MyTube Dashboard Header</div>
          </div>
        </div>
        <div className="content-row">
          <div className="content-box">
            <div className="box-header">Trending Graph showing views over time</div>
          </div>
          <div className="content-box">
            <div className="box-header">Highest Trending Videos for My Channel List</div>
          </div>
        </div>
        <div className="content-row">
          <div className="content-box">
            <div className="box-header">Insert Personal Video Into Table Header</div>
            <button className="button">Import CSV Button</button>
          </div>
          <div className="content-box">
            <div className="box-header">Search bar for Personal Video</div>
            <div className="search-output">Output of Search(Editable)</div>
            <button className="button delete-button">DELETE</button>
          </div>
          <div>
          <button className="trending-button">
              <Link to="/trending">Trending</Link>
          </button>
          <button className="trending-button">
              <Link to="/channel">My Channel</Link>
          </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
