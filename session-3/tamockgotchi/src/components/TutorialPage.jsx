import React from 'react';
import './TutorialPage.css';
import ProgressBar from './ProgressBar'; //don't put the file extension
import okayButton from '../images/buttons/okay-button.png';
import feedButton from '../images/buttons/feed-button.png';
import pottyButton from '../images/buttons/potty-button.png';
import zzzButton from '../images/buttons/zzz-button.png';
import dog from '../images/character/default-dog.gif';
import sleep from '../images/icons/sleep.png';
import smiley from '../images/icons/smiley.png';
import food from '../images/icons/food.png';
import poo from '../images/icons/poo.png';

function TutorialPage({ onTutorialComplete }) {
  return (
    <div className="tutorial">
        <div className='content'>
            <p className='monitor'>Watch the bars to monitor your pet's needs. If the bars become red, your pet will become unhappy or go potty by himself!</p>
            <p className='pet'>Click on your dog to pet them and increase their happiness.</p>
            <p className='press'>Press the buttons to feed your dog, let him go potty, or close the lights for his sleep. Note that while the lights are closed, you cannot do other actions.</p>
            <img className="okay" src={okayButton} alt="okay" onClick={onTutorialComplete} />  
        </div>
    </div>
  );
}

export default TutorialPage;