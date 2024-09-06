import React, { useState, useEffect } from "react";
import axios from 'axios';
import './reddit.css'

import Aimg from './icons/arrow-right.png'
import Rimg from './icons/reddit-logo.svg'

import Comments from "./Comments";
import NSFW from "./NSFW";
import csvFile from './data.csv'; // Adjust the path if necessary

// import Styling from './Comments'

function DataDisplay() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentURL, setCurrentURL] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/send_data');
                setData(response.data);

                if (response.data.length > 0) {
                    setCurrentURL(response.data[0]?.postURL || ''); // Adjust as needed
                    // const lastItem = response.data[response.data.length - 1];
                    // setCurrentURL(lastItem?.postURL || ''); // Default t
                }
            }
            catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        }, []);

    const handleSubmit = () => {
        // URL of the CSV file
        const csvUrl = '/data.csv';

        // Create a temporary link element
        const link = document.createElement('a');
        link.href = csvUrl;
        link.download = '/data.csv'; // Specify the file name

        // Append the link to the body and click it
        document.body.appendChild(link);
        link.click();

        // Remove the link from the body
        document.body.removeChild(link);
    };

    const handleClick = () => {
        if (currentURL) {
            window.open(currentURL, '_blank'); // Open the URL in a new tab
        } else {
            console.error('No URL available');
        }
    };

  return (
      <div>
          <button className="download-csv" type="submit" onClick={handleSubmit}>
              Download CSV
          </button>

          <div className="container">
              <h1>r/Pakistan</h1>
          </div>

          <div className="posts-box">
              {error ? (
                  <div> Error: {error.message}</div>
              ) : (
                  data.map((post, index) => (
                      // <a href="post.postURL">
                      <div className="main-box" key={index} onClick={handleClick}>
                          <img src={Rimg} className="reddit-logo"/>
                          <div className="top-box">
                              <p>
                                  <span className="author">
                                      {post.authorName}
                                      ·
                                  </span>

                                  <span className="time">
                                      {post.postTime}
                                  </span>
                              </p>

                              <p>
                                  <span className="title">
                                      {post.postTitle}
                                      {/*<div className="nsfw">*/}
                                      {/*    NSFW*/}
                                      {/*</div>*/}
                                      <NSFW nsfw = {post.isNSFW} />

                                  </span>
                              </p>

                              <p>
                                  <span className="content">
                                      {post.postDesc}
                                  </span>
                              </p>

                              {/*<button type="button" className="comments-buuton">*/}
                              {/*    <img src={Aimg} className="comments-arrow" id="comments-image"/>*/}
                              {/*    Show Comments*/}
                              {/*</button>*/}
                              <Comments comments={[post.comment1, post.comment2, post.comment3]} />


                          </div>
                      </div>
                      // </a>
                  ))
              )}
          </div>
      </div>
  );
}

export default DataDisplay;
