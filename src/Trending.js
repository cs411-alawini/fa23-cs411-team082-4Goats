import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Trending.css'; 
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';


function Trending() {
  const [categories, setCategories] = useState([]);
  const [topChannels, setChannels] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
});

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/topTrending')
      .then(response => {
        setCategories(response.data);;
      })
      .catch(error => {
        console.error('Error deleting video:', error);
      });

      axios.get('http://127.0.0.1:5000/getTopChannels')
      .then(response => {
        setChannels(response.data);;
      })
      .catch(error => {
        console.error('Error deleting video:', error);
      });


      fetch('http://localhost:5000/getHighestTrendingVideos', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                const videoTitles = data.map(item => item.title);
                const viewCounts = data.map(item => item.view_count);

                setChartData({
                    labels: videoTitles,
                    datasets: [
                        {
                            label: 'View Count',
                            data: viewCounts,
                            backgroundColor: 'rgba(75, 192, 192, 0.5)'
                        }
                    ]
                });
            })
            .catch(error => console.error('Error:', error));
  }, []); 
  

  

  return (
    <div className="trending-page">
      <header className="dashboard-header">
        <nav className="navigation">
          {/* Placeholder for back button and site logo */}
          <div className="nav-item">
            <Link to="/home" className="nav-link">←</Link>
          </div>
          <div className="nav-item">🔍 mytube.com</div>
          <div className="nav-item">Username</div>
        </nav>
        <div className="header-item">Trending</div>
      </header>
      <section className="content">
        <div className="content-box">
          <div>
              <h2>Trending Videos View Count</h2>
              <Bar data={chartData} />
          </div>
        </div>
        <div className="content-box">
          <div className="box-header">Trending Categories List</div>
          {/* Placeholder for list of trending videos */}
          {categories.map((category, index) => (
                    <li key={index}>Top Category {index+1}: {category.categoryName} - Frequency: {category.frequency}</li>
                ))}
        </div>
        <div className="content-box">
          <div className="box-header">Trending Channels List</div>
          {/* Placeholder for list of trending channels */}
          {topChannels.map((channel, index) => (
                    <li key={index}>Top Channel {index+1}: {channel.channelId} - Frequency: {channel.total_views}</li>
                ))}
        </div>
        
      </section>
    </div>
  );
}

export default Trending;
