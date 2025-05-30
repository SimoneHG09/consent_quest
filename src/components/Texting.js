import React, { useState, useEffect } from 'react';
import '../styles/Texting.css';

const Texting = ({ onBack }) => {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    setZoomed(true); // Trigger zoom animation on mount
  }, []);

  return (
    <div className={`texting-container ${zoomed ? 'zoomed' : ''}`}>
      <div className="phone-frame-texting">
        <button className="back-button" onClick={onBack}>← Back</button>
        <div className="chat-screen">
          {/* Your existing texting interface */}
        </div>
      </div>
    </div>
  );
};

export default Texting;