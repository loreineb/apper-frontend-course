import React, { useState, useEffect, useReducer } from 'react';
import ProgressBar from './ProgressBar';
import Tooltip from './Tooltip';
import './App.css';
import sleep from './images/sleep.png';
import smiley from './images/smiley.png';
import food from './images/food.png';
import poo from './images/poo.png';
import feedButton from './images/feedButton.png';
import pottyButton from './images/pottyButton.png';
import zzzButton from './images/zzzButton.png';
import defaultDog from './images/defaultDog.gif';
import feedDog from './images/feedDog.png';
import petDog from './images/petDog.png';
import pottyDog from './images/pottyDog.png';
import sadDog from './images/sadDog.png';


const initialState = {
  hunger: 100,
  happiness: 100,
  energy: 100,
  bladder: 100,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FEED':
      return { ...state, hunger: Math.min(state.hunger + action.value, 100) };
    case 'PET':
      return { ...state, happiness: Math.min(state.happiness + action.value, 100) };
    case 'SLEEP':
      return { ...state, energy: Math.min(state.energy + action.value, 100) };
    case 'BLADDER':
      return { ...state, bladder: Math.min(state.bladder + action.value, 100) };
    case 'GAME_OVER':
        // Handle the pet's death scenario here, like displaying a game over screen.
      return { ...state, isGameOver: true };
    case 'TIME_TICK':
      return {
        ...state,
        [action.attribute]: Math.max(state[action.attribute] - action.value, 0),
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timer, setTimer] = useState(null);
  const [theme, setTheme] = useState('light');
  const [dogImage, setDogImage] = useState(defaultDog);

  // Function to update the pet's attributes over time
  const updateAttributes = () => {
    dispatch({ type: 'TIME_TICK', attribute: 'happiness', value: 3 }); 
    dispatch({ type: 'TIME_TICK', attribute: 'energy', value: 2 }); 
    dispatch({ type: 'TIME_TICK', attribute: 'hunger', value: 5 }); 
    dispatch({ type: 'TIME_TICK', attribute: 'bladder', value: 6 }); 

    if (
      state.happiness === 0 &&
      state.energy === 0 &&
      state.hunger === 0 &&
      state.bladder === 0
    ) {
      dispatch({ type: 'GAME_OVER' });
    }
  };

  // Start the timer when the component mounts
  useEffect(() => {
    setTimer(setInterval(updateAttributes, 60000)); // Update attributes every 7 seconds (adjust as needed)

    // Clean up the timer when the component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleFeed = () => {
    dispatch({ type: 'FEED', value: 30 });
    setDogImage(feedDog)
    setTimeout(() => {
      setDogImage(defaultDog); // Reset to default image after a delay
    }, 500);
  };

  const handlePet = () => {
    dispatch({ type: 'PET', value: 20 });
    setDogImage(petDog)
    setTimeout(() => {
      setDogImage(defaultDog); // Reset to default image after a delay
    }, 500);
  };

  const handlePotty = () => {
    dispatch({ type: 'BLADDER', value: 100 });
  };

  const handleSleep = () => {
    switchTheme();
    dispatch({ type: 'SLEEP', value: 100 });
  };

  const switchTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
  };
  const isDarkTheme = theme === 'dark';

  return (
    <div className="app">
      <div className="screen" data-theme={theme}>
      {!isDarkTheme && (
      <Tooltip text={"This is my dog Popeye"}>
        <span class="material-symbols-outlined">info</span>
      </Tooltip>
      )} 
      <div className="bars">
        <div className="happiness">
          <img className="smiley" src={smiley} alt="Happiness" />
          <ProgressBar value={state.happiness} />
        </div>
        <div className="energy">
          <img className="sleep" src={sleep} alt="Energy" />
          <ProgressBar value={state.energy} />
        </div>
        <div className="hunger">
          <img className="food" src={food} alt="Hunger" />
          <ProgressBar value={state.hunger} />
        </div>
        <div className="bladder">
          <img className="poo" src={poo} alt="Bladder" />
          <ProgressBar value={state.bladder} />
        </div>
      </div>
      {!isDarkTheme && (
      <img
        className="dog"
        //src="https://thumbs.gfycat.com/LegitimateWateryAfricanharrierhawk-size_restricted.gif"
        src={
          (state.hunger < 40 || state.energy < 40 || state.happiness < 40)
          ? sadDog
          : (state.bladder < 40) 
            ? pottyDog
            : dogImage
        }
        alt="dog character"
        onClick={handlePet}
      /> )}
      </div>
      <div className="buttons">
        <img className="feed" src={feedButton} alt="feed" onClick={handleFeed} />
        <img className="potty" src={pottyButton} alt="potty" onClick={handlePotty} />
        <img className="sleep" src={zzzButton} alt="zzz" onClick={handleSleep} />
      </div>
    </div>
  );
}

export default App;