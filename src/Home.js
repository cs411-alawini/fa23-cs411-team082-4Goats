import React, {useState} from 'react';
import axios from "axios";
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
  const [setProfileData] = useState(null)
  const [searchInput, setSearchInput] = useState(""); // Added state for the search input

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
        </div>
      </section>
    </div>
  );
}
export default Home;
