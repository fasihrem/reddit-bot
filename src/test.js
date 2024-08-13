import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './test.css'

function DataDisplay() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/send_data');
        setData(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="reddit-container">
      {error ? (
        <div>Error: {error.message}</div>
      ) : (
        data.map((post, index) => (
          <div className="reddit-box" key={index}>
            <div className="reddit-box-header">
              <span className="reddit-box-author">{post.authorName}</span>
              <span className="reddit-box-title">{post.postTitle}</span>
            </div>
            <div className="reddit-box-content">
              {post.postDesc}
            </div>
            <div className="reddit-box-footer">
              {post.isNSFW && <span className="reddit-box-nsfw">NSFW</span>}
              <div className="reddit-box-actions">
                <span>{post.comment1}</span>
                {/*<span>{post.comment2}</span>*/}
                {/*<span>{post.comment3}</span>*/}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DataDisplay;
