import react, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import * as THREE from "three";

import './main-page.css'

const App = () => {
  const [sort, setSort] = useState('');
  const [limit, setLimit] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:5000/run_code', {sort, limit, subreddit});
      console.log(response.data)

      // Redirect after successful response
      navigate('/display');

    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsLoading(false);
    }
  };

  const refContainer = useRef(null);
  useEffect(() => {

    // === THREE.JS CODE START ===

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
      <div>
          <h1>Automatic Reddit Scrapper</h1>

          <div className="input-form">
              <form onSubmit={handleSubmit}>
                  <label htmlFor="sort"><b>Type: </b></label>
                  <input type="text"
                         id="sort"
                         name="sort"
                         placeholder="hot/top/new"
                         value={sort}
                         onChange={(event) => setSort(event.target.value)}
                  />

                  <label htmlFor="limit"><b> Number of Docs: </b></label>
                  <input type="number"
                         id="limit"
                         name="limit"
                         placeholder="10"
                         value={limit}
                         onChange={(event) => setLimit(event.target.value)}
                  />
                  <br/><br/>

                  <label htmlFor="subreddit"><b>Subreddit: </b></label>
                  <input type="text"
                         id="subreddit"
                         name="subreddit"
                         placeholder="wallstreetbets"
                         value={subreddit}
                         onChange={(event) => setSubreddit(event.target.value)}
                  />

                  <br/><br/>
                  <button type="submit" className="submit-button">Get thy data</button>
              </form>

              {isLoading && (
                  <div className="loading-screen" ref={refContainer}></div>
              )}
          </div>
      </div>
  );
};

export default App;
