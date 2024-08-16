import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import './reddit.css'

import Aimg from './icons/arrow-right.png'
import Rimg from './icons/reddit-logo.svg'

// import Styling from './animate.js'

function DataDisplay() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [commentSections, setCommentSections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/send_data');
                setData(response.data);
            }
            catch (error) {
                setError(error);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        }, []);

  return (
      <div>
          <button className="download-csv">
            Download CSV
          </button>

          <button>

          </button>

          <div className="posts-box">
              {error ? (
                  <div> Error: {error.message}</div>
              ) : (
                  data.map((post, index) => (

                      <div className="main-box" key={index}>
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
                                  </span>
                              </p>

                              <p>
                                  <span className="content">
                                      {post.postDesc}
                                  </span>
                              </p>

                              <button type="button" className="comments-buuton">
                                  <img src={Aimg} className="comments-arrow" id="comments-image"/>
                                  Show Comments
                              </button>
                          </div>

                          <div className="comments" id="comments-section">
                              <p>
                                  <span className="comment-1">
                                      <b className="bullet-points">#1</b>
                                      {post.comment1}
                                  </span>
                                  <br/>

                                  <span className="comment-2">
                                      <b className="bullet-points">#2</b>
                                      {post.comment2}
                                  </span>
                                  <br/>

                                  <span className="comment-3">
                                      <b className="bullet-points">#3</b>
                                      {post.comment3}
                                  </span>
                              </p>
                          </div>
                      </div>
                  ))
              )}
          </div>
      </div>
  );
}

export default DataDisplay;
