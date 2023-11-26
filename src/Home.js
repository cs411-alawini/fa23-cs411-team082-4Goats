import React, {useState, useEffect} from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import MyTube from './MyTube.jpg'
function Home() {

  // const [profile, setProfile] = useState({ name: '', about: '' });

  // useEffect(() => {
  //   fetch('http://localhost:5000/test')  // Replace with your Flask server URL
  //     .then(response => response.json())
  //     .then(data => setProfile(data))
  //     .catch(error => console.error('Error:', error));
  // }, []);


  return (
    <div className="analytics-dashboard">
      
      <header className="dashboard-header">
        
        {/* Move the Trending and My Channel buttons here */}
        <button className="trending-button">
          <Link to="/trending">Trending</Link>
        </button>
        <button className="trending-button">
          <Link to="/channel">My Channel</Link>
        </button>
        <nav className="navigation">
          <div className="nav-item"><img
          src={MyTube}
          alt="MyTube"
          className="top-right-image"
        /></div>
          <div className="nav-item">Username:</div>
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
        {/* <div className="content-row"> this is where we can put api calls
          <div className="content-box">
            <div className="box-header">Profile Information</div>
            <p>Name: {profile.name}</p>
            <p>About: {profile.about}</p>
          </div>
        </div> */}
        <div className="content-row">
          <div className="content-box">
            <div className="box-header">Insert Personal Video Into Table Header</div>
            <button className="button">Import CSV Button</button>
          </div>
          <div className="content-box">
            <div className="box-header">Search bar for Personal Video</div>
            <input type="text" placeholder="Search..." className="search-input" />
            <div className="search-output">Output of Search(Editable)</div>
            <button className="button delete-button">DELETE</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
