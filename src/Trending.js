import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trending.css'; 

function Trending() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/topTrending')
      .then((response) => {
        // Assuming the response.data is an array of categories
        setCategories(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

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
          <div className="box-header">Trending Categories List</div>
          {/* Placeholder for list of trending videos */}
          <ul>
            {/* Mock data: Replace with actual data */}
            <li>Trending Category 1:<bold>{categories[0][0][0]}</bold> with total videos #{categories[0][0][1]}</li>
            <li>Trending Category 2:<bold>{categories[0][1][0]}</bold> with total videos #{categories[0][1][1]}</li>
            <li>Trending Category 3:<bold>{categories[0][2][0]}</bold> with total videos #{categories[0][2][1]}</li>
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
