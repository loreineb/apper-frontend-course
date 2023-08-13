import React, { useState } from 'react';
import './WelcomeScreen.css';
import startButton from '../images/buttons/start-button.png';
import TutorialPage from './TutorialPage';
// the .. before the path is to navigate up the directory tree


function WelcomeScreen({ onStart }) {
  const [showTutorial, setShowTutorial] = useState(false);

  const handleStartClick = () => {
    setShowTutorial(true);
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    onStart(); // Start the actual game
  };

  if (showTutorial) {
    return <TutorialPage onTutorialComplete={handleTutorialComplete} />;
  }

  return (
    <div className="welcome-container">
      <div className='welcome-content'>
        <h1 className='welcome'>Welcome to Tamockgotchi!</h1>
        <h2 className='press'>Press 'Start' to begin!</h2>
        <img className="button" src={startButton} alt="start" onClick={handleStartClick} />
      </div>
    </div>
  );
}

export default WelcomeScreen;
