import React from 'react';
import './WelcomeScreen.css';
import startButton from '../images/buttons/startButton.png';
// the .. before the path is to navigate up the directory tree

function WelcomeScreen({ onStart }) {
  return (
    <div className="welcome-container">
      <div className='screen'>
      <h1 className='welcome'>Welcome to Your Virtual Pet Game!</h1>
      <p className='press'>Press the "Start" button to begin.</p>
      <img className="button" src={startButton} alt="start" onClick={onStart} />
      </div>
    </div>
  );
}

export default WelcomeScreen;
