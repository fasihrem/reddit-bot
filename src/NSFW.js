import React, { useState, useRef, useEffect } from 'react';

const NSFWToggle = ({ nsfw }) => {
    const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
        if (nsfw) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [nsfw]); // Run this effect whenever the NSFW prop changes

    return (
        <div
            className="nsfw"
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            NSFW
        </div>
    );

};

export default NSFWToggle;