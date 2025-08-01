import React from 'react';
import '../styles/Frame.css';

function Frame ({ children, className = '' }) {
  return (
    <div className={`phoneContainer ${className}`}>
      <img 
        src="/images/cards/phone.png" 
        alt="Decorative frame" 
        className="frameImage"
      />
      <div className="screen">
        {children}
      </div>
    </div>
  );
};

export default Frame;