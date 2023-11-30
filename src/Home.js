import React, {useState} from 'react';
import axios from "axios";
import './Home.css';
import { Link } from 'react-router-dom';
import MyTube from './MyTube.jpg'
function Home() {
  const [setProfileData] = useState(null)
  const [searchInput, setSearchInput] = useState(""); // Added state for the search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  function handleSearchInputChange(event) {
    console.log("Event change")
    console.log(event)
    setSearchInput(event.target.value);
  }

  function getData(typerq,endpoint) {
    console.log("Search input: ")
    console.log(searchInput)
    console.log("Endpoint: ")
    console.log(endpoint)
    axios({
      method: typerq,
      url:`http://127.0.0.1:5000/${endpoint}`,
      params: {
        input : searchInput
      }
    })
    .then((response) => {
      const res =response.data
      console.log(res)
      setSearchResults(response.data)
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
        }
    })}


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
        <div className="content-row">
          <div className="content-box">
            <div className="box-header">Insert Personal Video Into Table Header</div>
            <button className="button">Import CSV Button</button>
          </div>
          <div className="content-box">
            <div className="box-header">Search bar for Personal Video</div>
            <button onClick={() => getData("POST", "searchBar")}>Click me</button>
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <div className="search-output">Output of Search(Editable)</div>
            <button className="button delete-button">DELETE</button>
          </div>
          <div className="content-row">
        <div className="content-box">
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
      </section>
    </div>
  );
}
export default Home;
