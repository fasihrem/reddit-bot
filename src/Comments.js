import React, { useState, useRef, useEffect } from 'react';
import Aimg from './icons/arrow-right.png';
import './reddit.css';

const CommentsToggle = ({ comments }) => {
  // State to toggle comments visibility
  const [isVisible, setIsVisible] = useState(false);

  // Refs to access DOM elements
  const commentsRef = useRef(null);
  const imgRef = useRef(null);

  // Handle button click
  const handleClick = () => {
    setIsVisible(prev => !prev);
  };

  // Use effect to apply transition styles
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.style.transition = 'opacity 0.3s ease-in-out';
      commentsRef.current.style.opacity = isVisible ? '1' : '0';
    }
    if (imgRef.current) {
      imgRef.current.style.transform = isVisible ? 'rotate(90deg)' : 'rotate(0deg)';
    }
  }, [isVisible]);

  return (
    <div>
        <button className="comments-button" onClick={handleClick} type="button">
            <img
                className="comments-arrow"
                src={Aimg}
                alt="Arrow"
                ref={imgRef}
                style={{ transition: 'transform 0.3s ease-in-out' }}
            />
            Toggle Comments
        </button>

        <div className="comments" ref={commentsRef} style={{ display: isVisible ? 'block' : 'none' }}>
            {comments.map((comment, index) => (
                <div key={index} className={`comment-${index + 1}`}>
                    <b className="bullet-points">#{index + 1}</b>
                    {comment}
                    <br/>
                </div>
            ))}
        </div>
    </div>
  );
};

export default CommentsToggle;
