import React, { useState } from 'react';
import './Tooltip.css';
// re: css import, if they're in the same folder, you can just ./<file>

const Tooltip = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className="tooltip-container"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && <div className='tooltip-text'>{text}</div>}
    </div>
  );
};

export default Tooltip;
