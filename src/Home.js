import React, {useState, useEffect} from 'react';
import axios from "axios";
import './Home.css';
import { Link } from 'react-router-dom';
import MyTube from './MyTube.jpg'
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
function Home() {
  const [searchInput, setSearchInput] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [trendingVideos, setTrendingVideos] = useState([]); 
  const [channelRating, setChannelRating] = useState([]);
  const [sortOrder, setSortOrder] = useState("ascending");

  const [likesAndViewData, setLikesAndViewData] = useState({
    labels: [],
    datasets: []
  });
  
  function handleSearchInputChange(event) {
    console.log("Event change")
    console.log(event)
    setSearchInput(event.target.value);
  }

  useEffect(() => {
    getData("POST", "getHighestTrendingVideos");
  }, []); 
  

  function getData(typerq, endpoint) {
    axios({
      method: typerq,
      url:`http://127.0.0.1:5000/${endpoint}`,
      params: {
        input: searchInput
      }
    })
    .then((response) => {
      if (endpoint === "searchBar") {
        setSearchResults(response.data);
      } else if (endpoint === "getHighestTrendingVideos") {
        setTrendingVideos(response.data);
      }
    }).catch((error) => {
    });
  }


  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'View Count',
        data: [],
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  const [chartDataLikes, setChartDataLikes] = useState({
    labels: [],
    datasets: [
      {
        label: 'Date vs Likes',
        data: [],
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  });
  
  useEffect(() => {

    axios({
      method: "GET",
      url:`http://127.0.0.1:5000/getChannelRating`
    })
    .then((response) => {
      setChannelRating(response.data)
    }).catch((error) => {
    });


    const combinedData = trendingVideos.map(video => ({
      date: video.date_published,
      likes: video.likes,
      view: video.view_count,
    }));
  
    combinedData.sort((a, b) => {
      if (sortOrder === "ascending") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return new Date(b.date) - new Date(a.date);
      }
    });
  
    setChartData({
      labels: combinedData.map(data => data.date),
      datasets: [{
        ...chartData.datasets[0],
        data: combinedData.map(data => data.view)
      }]
    });
  
    setChartDataLikes({
      labels: combinedData.map(data => data.date),
      datasets: [{
        ...chartDataLikes.datasets[0],
        data: combinedData.map(data => data.likes)
      }]
    });
  
    setLikesAndViewData({
      labels: combinedData.map(data => data.date),
      datasets: [
        {
          label: 'Likes',
          data: combinedData.map(data => data.likes),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'View Count',
          data: combinedData.map(data => data.view),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        }
      ]
    });
  }, [trendingVideos, sortOrder]);
  

  return (
    <div className="analytics-dashboard">
      
      <header className="dashboard-header">
        
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
          <div className="nav-item">Username: {localStorage.getItem('channelName')}</div>
        </nav>
        <div className="header-item">Your Channel Rating: {channelRating.map((ratings) => (
          <div className="header-item">{ratings.rating}</div>
        ))}</div>
      </header>
      <section className="content">
        <div className="channel-info">
          <div className="channel-name">Hi {localStorage.getItem('channelName')}! Welcome to MyTube! </div>
        </div>
        <div className="content-row">
          
          <div className="content-box">
            <div className="box-header">Search bar for Personal Video</div>
            <button onClick={() => getData("POST", "searchBar")}>Search</button>
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            
          </div>
          <div className="content-row">
        <div className="content-box">
          <div className="scrollable-list">
          {searchResults.length > 0 && searchResults.map((video, index) => (
            <div key={index}>
              <p>Title: {video.title}</p>
              <p>Likes: {video.likes}</p>
              <p>View Count: {video.view_count}</p>
              <p>Published Date: {video.date_published}</p>
            </div>
          ))}
          </div>
          </div>
        </div>
        </div>
        <div className="content-row">
          
        <div className="content-box">
          <div className="box-header">Highest Trending Videos for My Channel List</div>
          <div className="scrollable-list">
            {trendingVideos.length > 0 && trendingVideos.map((video, index) => (
              <div key={index}>
                <p>Title: {video.title}</p>
                <p>Likes: {video.likes}</p>
                <p>Published Date: {video.date_published}</p>
              </div>
            ))}
          </div>
        </div>
          <div className="content-box">
            
            <div className="box-header">Trending Videos View Count Over Time</div>
            <div>
              <button onClick={() => setSortOrder("ascending")}>Sort Ascending</button>
              <button onClick={() => setSortOrder("descending")}>Sort Descending</button>
            </div>
            <Line data={chartData} />
            

          </div>
          <div className="content-box">

            <div className="box-header">Trending Videos Likes Over Time</div>
            <div>
              <button onClick={() => setSortOrder("ascending")}>Sort Ascending</button>
              <button onClick={() => setSortOrder("descending")}>Sort Descending</button>
            </div>
            <Line data={chartDataLikes} />
          </div>
          <div className="content-box">
            <div className="box-header">Likes and View Count Over Videos</div>
            <div>
              <button onClick={() => setSortOrder("ascending")}>Sort Ascending</button>
              <button onClick={() => setSortOrder("descending")}>Sort Descending</button>
            </div>
            <Line data={likesAndViewData} />
          </div>
        </div>
      </section>
    </div>
  );
}
export default Home;
