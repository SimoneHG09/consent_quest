import React from 'react';
import '../styles/Frame.css';

const Frame = ({ children, className = '', style = {} }) => {
  return (
    <div className={`phoneContainer ${className}`} style={style}>
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