import React, { useState, useEffect, useReducer } from 'react';
import ProgressBar from './components/ProgressBar';
import Tooltip from './components/Tooltip';
import WelcomeScreen from './components/WelcomeScreen';
import './App.css';
import sleep from './images/icons/sleep.png';
import smiley from './images/icons/smiley.png';
import food from './images/icons/food.png';
import poo from './images/icons/poo.png';
import feedButton from './images/buttons/feed-button.png';
import pottyButton from './images/buttons/potty-button.png';
import zzzButton from './images/buttons/zzz-button.png';
import defaultDog from './images/character/default-dog.gif';
import feedDog from './images/character/feed-dog.png';
import petDog from './images/character/pet-dog.png';
import cleanDog from './images/character/clean-dog.png';
import pottyDog from './images/character/potty-dog.png';
import sadDog from './images/character/sad-dog.png';
import _ from 'lodash';


const initialState = {
  hunger: 60,
  happiness: 60,
  energy: 60,
  bladder: 40, //set initial values to lower s.t. you can see the workings upon game start
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
    case 'TIME_TICK':
      return {
        ...state,
        [action.attribute]: Math.max(state[action.attribute] - action.value, 0),
      };
    default:
      return state;
  }
};

// dispatch is just the one telling the reducer what type to use, it's just the messenger, per se

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [timer, setTimer] = useState(null);
  const [theme, setTheme] = useState('light');
  const [dogImage, setDogImage] = useState(defaultDog);
  const [gameStarted, setGameStarted] = useState(false);
  const [themeSwitchTimerActive, setThemeSwitchTimerActive] = useState(false);

  const updateAttributes = () => {
    dispatch({ type: 'TIME_TICK', attribute: 'happiness', value: 4 }); 
    dispatch({ type: 'TIME_TICK', attribute: 'energy', value: 4 }); 
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

  useEffect(() => {
    if (gameStarted) { // This is s.t. the timer starts when gameStarted changes, not upon mount
      setTimer(setInterval(updateAttributes, 25000)); // set to 25s rather than the inital 1min so users can observe changes
    }

    return () => {
      clearInterval(timer); // Don't forget to clean up
    };
  }, [gameStarted]); 

  const handleFeed = () => {
    !themeSwitchTimerActive && !isTherePoo && (dispatch({ type: 'FEED', value: 30 })); // This is s.t. you can't feed the dog while asleep
    setDogImage(feedDog)
    setTimeout(() => {
      setDogImage(defaultDog); // This is s.t. the image returns to default
    }, 500);
  };

  const handlePet = () => {
    !isTherePoo && (dispatch({ type: 'PET', value: 20 })); // if there's no poo, you can pet
    setDogImage(petDog)
    setTimeout(() => {
      setDogImage(defaultDog);
    }, 500);
  };

  const handlePotty = () => {
    !themeSwitchTimerActive && (dispatch({ type: 'BLADDER', value: 50 }));
    setDogImage(cleanDog)
    setTimeout(() => {
      setDogImage(defaultDog);
    }, 500);
  };

  const isTherePoo = state.bladder < 40;

  const handleSleep = () => {
    if (themeSwitchTimerActive) {
      clearTimeout(timer);
      setThemeSwitchTimerActive(false);
      setDogImage(defaultDog);
      setTheme('light'); // Manually set the theme back to light
    } else if (!isTherePoo) {
      switchTheme();
      dispatch({ type: 'SLEEP', value: 100 });
    }
  };
  

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  
    if (newTheme === 'dark') { // This is s.t. your pet "wakes up" after some time
      setThemeSwitchTimerActive(true);
      setTimeout(() => {
        setTheme('light');
        setThemeSwitchTimerActive(false);
      }, 5000); // 5s
    }
  };

  //debouncing for the event that people click too fast
  const debouncedHandleFeed = _.debounce(handleFeed, 500); //there is too noticeable a delay with 1s
  const debouncedHandlePet = _.debounce(handlePet, 500);
  const debouncedHandlePotty = _.debounce(handlePotty, 500);
  const debouncedHandleSleep = _.debounce(handleSleep, 500);
  

  return (
    <div className="app">
      <div className="screen" data-theme={theme}>
        {gameStarted ? (
          <>
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
            {!themeSwitchTimerActive && (
              <Tooltip text={"This is my dog Popeye."}>
                <span className="material-symbols-outlined">info</span>
              </Tooltip>
            )}
            {!themeSwitchTimerActive && (
              <img
              className="dog"
              src={
                state.bladder < 40 //the order in which the conditions are evaluated determine priority
                  ? pottyDog
                  : state.hunger < 40 || state.energy < 40 || state.happiness < 40
                  ? sadDog
                  : dogImage
              }
              alt="dog character"
              onClick={debouncedHandlePet}
            />
            )}
            <div className="buttons">
              <img
                className="feed"
                src={feedButton}
                alt="feed"
                onClick={debouncedHandleFeed}
              />
              <img
                className="potty"
                src={pottyButton}
                alt="potty"
                onClick={debouncedHandlePotty}
              />
              <img
                className="sleep"
                src={zzzButton}
                alt="zzz"
                onClick={debouncedHandleSleep}
              />
            </div>
          </>
        ) : (
          <WelcomeScreen onStart={() => setGameStarted(true)} />
        )}
      </div>
    </div>
  );
}  

export default App;
