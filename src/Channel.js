import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './Channel.css'; 
function Channel() {

  const [setProfileData] = useState(null)
  const [searchInput] = useState(""); // Added state for the search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Assuming searchResults.tags is the array of tags
    if (searchResults && searchResults.tags) {
      setTags(searchResults.tags);
    }
  }, [searchResults]);


  const deleteTag = (tagToDelete) => {
    const updatedTags = tags.filter(tag => tag !== tagToDelete);
    setTags(updatedTags);
    updateTagsInDatabase(updatedTags); // Update the database with new tags list
  };

  const updateTagsInDatabase = (updatedTags) => {
    const videoId = searchResults.video_id; // Assuming searchResults contain video_id
    axios.post('http://127.0.0.1:5000/updateTags', {
      video_id: videoId,
      tags: updatedTags.join('|') // Join the tags array into a string separated by '|'
    })
    .then(response => {
      console.log('Tags updated successfully:', response);
    })
    .catch(error => {
      console.error('Error updating tags:', error);
    });
  };
  


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
      console.log(searchResults)
      setProfileData(({
        profile_name: res.name,
        about_me: res.about}))
    }).catch((error) => {
      if (error.response) {
        console.log(error.response)
        }
    })}


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
        
        <div className="content-box">
          <div className="box-header">Get Videos and Their Tags</div>
          <button onClick={() => getData("POST", "getVideosByChannelName")}>Click me</button>
          <div className="content-box">
            {searchResults && (
              <div>
                <p>Video ID: {searchResults.video_id}</p>
                <p>Tags:</p>
                <ul>
                  {tags.map((tag, index) => (
                    <li key={index}>
                      {tag} <button onClick={() => deleteTag(tag)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>


      </main>
    </div>
  );
}

export default Channel;
