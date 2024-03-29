import { useCallback, useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { PLAYERS } from '../assets/players';
import Card from '../components/Card';

const Play = () => {
  const [inputValue, setInputValue] = useState('');
  const [bestSuggestion, setBestSuggestion] = useState('');
  // const [showSuggestions, setShowSuggestions] = useState(false); // Track if suggestions should be shown
  const [allSuggestions, setAllSuggestions] = useState([]); // Track all suggestions
  const [player1, setplayer1] = useState({
    team: '',
    jerseyNumber: '',
    role: '',
    nation: '',
    age: '',
    playerName: '',
  });
  const [player2, setplayer2] = useState({
    team: '',
    jerseyNumber: '',
    role: '',
    nation: '',
    age: '',
    playerName: '',
  });
  const [player3, setplayer3] = useState({
    team: '',
    jerseyNumber: '',
    role: '',
    nation: '',
    age: '',
    playerName: '',
  });
  const [player4, setplayer4] = useState({
    team: '',
    jerseyNumber: '',
    role: '',
    nation: '',
    age: '',
    playerName: '',
  });
  const [guessPlayer1, setGuessPlayer1] = useState(false);
  const [guessPlayer2, setGuessPlayer2] = useState(false);
  const [guessPlayer3, setGuessPlayer3] = useState(false);
  const [guessPlayer4, setGuessPlayer4] = useState(false);
  const [done, setDone] = useState(false);
  const [HintLeft, setHintLeft] = useState(3);
  const [LivesLeft, setLivesLeft] = useState(15);
  const [reveal, setReveal] = useState(false);
  const [isEnterPressed, setEnterPressed] = useState(false);

  // console.log(data);
  const updateLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const curDate = new Date();
  const curDay = curDate.getDate();

  function generatePlayer(day) {
    const selectedPlayer = [];
    for (let i = 0; i < 4; i++) {
      const index = (day + i * 2) % PLAYERS.length;
      selectedPlayer.push(PLAYERS[index]);
    }
    return selectedPlayer;
  }
  const hero = generatePlayer(curDay);
  // console.log(hero);

  useEffect(() => {
    const player1Data = localStorage.getItem('player1');
    const player2Data = localStorage.getItem('player2');
    const player3Data = localStorage.getItem('player3');
    const player4Data = localStorage.getItem('player4');
    const lives = localStorage.getItem('lives');

    if (player1Data) {
      setplayer1(JSON.parse(player1Data));
      const res = JSON.parse(player1Data);
      if (res.name !== '') {
        if (res.playerName.toLowerCase() === hero[0].playerName.toLowerCase()) {
          setGuessPlayer1(true);
        }
      }
    }
    if (player2Data) {
      setplayer2(JSON.parse(player2Data));
      const res = JSON.parse(player2Data);
      if (res.name !== '') {
        if (res.playerName.toLowerCase() === hero[1].playerName.toLowerCase()) {
          setGuessPlayer2(true);
        }
      }
    }
    if (player3Data) {
      setplayer3(JSON.parse(player3Data));
      const res = JSON.parse(player3Data);
      if (res.name !== '') {
        if (res.playerName.toLowerCase() === hero[2].playerName.toLowerCase()) {
          setGuessPlayer3(true);
        }
      }
    }
    if (player4Data) {
      setplayer4(JSON.parse(player4Data));
      const res = JSON.parse(player4Data);
      if (res.name !== '') {
        if (res.playerName.toLowerCase() === hero[3].playerName.toLowerCase()) {
          setGuessPlayer4(true);
        }
      }
    }

    if (lives) {
      setLivesLeft(JSON.parse(lives));
    } else {
      setLivesLeft(15);
    }
  }, []);

  const updateLife = () => {
    setLivesLeft((prevLives) => {
      const temp = prevLives - 1;
      if (temp === 0) {
        return 0;
      }
      localStorage.setItem('lives', JSON.stringify(temp));
      return temp;
    });
  };

  const compareInput = useCallback(
    (inputValue) => {
      updateLife();

      const guess = PLAYERS.find(
        (player) => player.playerName.toLowerCase() === inputValue.toLowerCase()
      );

      if (!guess) {
        alert('Player not found');
        return;
      }

      const setPlayerValue = (index, property, value) => {
        switch (index) {
          case 0:
            setplayer1((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage('player1', updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          case 1:
            setplayer2((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage('player2', updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          case 2:
            setplayer3((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage('player3', updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          case 3:
            setplayer4((prevValues) => {
              const updatedPlayer = { ...prevValues, [property]: value };
              updateLocalStorage('player4', updatedPlayer); // Update localStorage here
              return updatedPlayer;
            });
            break;
          default:
            break;
        }
      };
      for (let i = 0; i < hero.length; i++) {
        if (guess.jerseyNumber === hero[i].jerseyNumber) {
          setPlayerValue(i, 'jerseyNumber', guess.jerseyNumber);
        }
        if (guess.team === hero[i].team) {
          setPlayerValue(i, 'team', guess.team);
        }
        if (guess.age === hero[i].age) {
          setPlayerValue(i, 'age', guess.age);
        }
        if (guess.nation.toLowerCase() === hero[i].nation.toLowerCase()) {
          setPlayerValue(i, 'nation', guess.nation);
        }
        if (guess.playerName === hero[i].playerName) {
          setPlayerValue(i, 'playerName', guess.playerName);
          switch (i) {
            case 0:
              setGuessPlayer1(true);
              break;
            case 1:
              setGuessPlayer2(true);
              break;
            case 2:
              setGuessPlayer3(true);
              break;
            case 3:
              setGuessPlayer4(true);
              break;
            default:
              break;
          }
        }
      }

      if (guessPlayer1 && guessPlayer2 && guessPlayer3 && guessPlayer4) {
        alert('You have guessed all players');
        setDone(true);
      }
    },
    [hero, player1, player2, player3, player4]
  );

  const undo = () => {
    setHintLeft((prevHint) => prevHint + 1);
    setReveal(false);
  };

  const showPlayer = (value) => {
    setInputValue(value);
    setInterval(2000);
    setInputValue('');
  };
  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace'],
    ['Hint', 'Space', 'Enter'],
  ];
  const handleKeyPress = useCallback(
    (key) => {
      if (key === 'Hint') {
        if (HintLeft === 0) {
          alert('No hints left');
          return;
        }
        setHintLeft((prevHint) => prevHint - 1);
        setReveal(true);
      } else if (key === 'Backspace') {
        if (inputValue === '') {
          setBestSuggestion('');
        }
        setInputValue((prevValue) => {
          const newValue = prevValue.slice(0, -1);
          updateBestSuggestion(newValue); // Update suggestion after updating inputValue
          return newValue;
        });
      } else if (key === 'Space' || key === 'Spacebar' || key === ' ') {
        setInputValue((prevValue) => {
          const newValue = prevValue + ' ';
          updateBestSuggestion(newValue); // Update suggestion after updating inputValue
          return newValue;
        });
      } else if (key === 'Enter') {
        // set state when enter is pressed and execute
        // setTimeout to set it to false after 2 seconds
        setTimeout(() => {
          setEnterPressed(false);
        }, 2000);

        setEnterPressed(true);

        setInputValue(bestSuggestion);
        const value = bestSuggestion;
        showPlayer(value);
        compareInput(value);
        setInputValue('');
        setBestSuggestion('');
      } else {
        if (/^[a-zA-Z]$/.test(key)) {
          setInputValue((prevValue) => prevValue + key.toUpperCase());
        }
      }
      // For non-Backspace, non-Space, non-Enter keys, update suggestion after updating inputValue
      if (
        key !== 'Backspace' &&
        key !== 'Space' &&
        key !== 'Spacebar' &&
        key !== 'Enter'
      ) {
        updateBestSuggestion(inputValue + key);
      }
    },
    [inputValue, bestSuggestion, compareInput]
  ); // Add bestSuggestion as a dependency

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key === 'Hint') {
        // if(HintLeft === 0){
        //     alert("No hints left");
        //     return;
        // }
        // alert("Hint: " + hero[0].playerName);
        // setReveal(true);
        setHintLeft((prevHint) => prevHint - 1);
      }
      if (checkDisableButton(key)) {
        event.preventDefault(); // Prevent default action if the key is disabled
      } else {
        handleKeyPress(key);
      }
    };
    if (guessPlayer1 && guessPlayer2 && guessPlayer3 && guessPlayer4) {
      setDone(true);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  const updateBestSuggestion = (value) => {
    // Find the best suggestion from PLAYERS array
    const filteredPlayers = PLAYERS.filter((player) =>
      player.playerName.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredPlayers.length > 0) {
      const best = filteredPlayers[0].playerName; // Get the playerName of the first match
      const suggestions = filteredPlayers.map((player) => player.playerName); // Get all suggestions
      setAllSuggestions(suggestions);
      setBestSuggestion(best);
      //   setShowSuggestions(true);
    } else {
      setBestSuggestion('');
      setAllSuggestions([]);
      //   setShowSuggestions(false);
    }
  };

  const displayInputInSuggestion = () => {
    if (!inputValue) return;
    if (!bestSuggestion) return inputValue;
    const index = bestSuggestion
      .toLowerCase()
      .indexOf(inputValue.toLowerCase());
    if (index === -1) return bestSuggestion;
    const firstLetters = bestSuggestion.slice(0, index);
    const remainingLetters = bestSuggestion.slice(index + inputValue.length);
    return (
      <>
        <span style={{ opacity: 0.3 }}>{firstLetters.toUpperCase()}</span>
        <span style={{ opacity: 1 }}>{inputValue.toUpperCase()}</span>
        <span style={{ opacity: 0.3 }}>{remainingLetters.toUpperCase()}</span>
      </>
    );
  };

  const checkDisableButton = (key) => {
    if (!inputValue) {
      return false; // No input, keep button enabled
    }
    if (done || !LivesLeft) {
      return true;
    }
    const combination = (inputValue + key).toLowerCase();
    // Check if there's any suggestion that starts with the combination
    const hasFollowingSuggestion = allSuggestions.some((suggestion) =>
      suggestion.toLowerCase().includes(combination)
    );
    if (key === 'Enter') return false;
    if (key === 'Backspace') return false;
    if (key === 'Hint') return false;

    // If the pressed key is a space and there's no following suggestion, disable the spacebar
    if (
      (key === 'Space' || key === 'Spacebar' || key === ' ') &&
      !hasFollowingSuggestion
    ) {
      return false;
    }

    // Otherwise, disable the button if there's no following suggestion
    return !hasFollowingSuggestion;
  };

  // const show = () => {
  //     return displayInputInSuggestion();
  // }

  return (
    <>
      <div className="bg-design-white">
        {
          <div className="px-4 flex justify-center items-center">
            <div className="w-25">
              <div className="px-4 flex justify-between items-center">
                <div className="flex items-center justify-between">
                  <div className="flex items-center hint-color mb-1 ">
                    <h2 className="text-xl search inline text-center pr-1 ">
                      <CiSearch />
                    </h2>
                    <h2 className="text-base text-white font-bold inline pr-1 mb-1">
                      {HintLeft}
                    </h2>
                  </div>
                </div>

                <div className="w-25">
                  <h2 className="text-lg font-inter font-normal text-center">
                    Find today&#39;s players
                  </h2>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center live-color p-1 mb-1">
                    <h2 className="text-xl search inline text-center mr-1">
                      <FaHeart />
                    </h2>
                    <h2 className="text-base text-white mb-1 font-bold inline">
                      {LivesLeft}
                    </h2>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 text-center">
                <Card
                  player={player1}
                  hero={hero[0]}
                  isGuessed={guessPlayer1}
                />
                <Card
                  player={player2}
                  hero={hero[1]}
                  isGuessed={guessPlayer2}
                />
                <Card
                  player={player3}
                  hero={hero[2]}
                  isGuessed={guessPlayer3}
                />
                <Card
                  player={player4}
                  hero={hero[3]}
                  isGuessed={guessPlayer4}
                />
              </div>
            </div>
          </div>
        }
        <div className={`input text-gray-600 text-center`}>
          <span>
            {isEnterPressed && 'Some Animation component here'}
            {inputValue
              ? displayInputInSuggestion()
              : isEnterPressed
              ? ''
              : 'Enter text here'}
          </span>
        </div>
        {LivesLeft === 0 ? (
          <>
            <div className="keyboard bg-design-white flex flex-col items-center justify-center">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">
                  You have lost all your lives
                </h2>
                <div className="flex items-center justify-center mb-4">
                  <button
                    onClick={() => alert('shared')}
                    className="share py-2 px-4 rounded mr-2"
                  >
                    Share
                  </button>
                </div>
                <div className="flex flex-wrap justify-center">
                  <div className="mx-4 my-2">
                    <p className="text-sm font-bold">Game Completed</p>
                    <p className="text-lg font-bold">10</p>
                  </div>
                  <div className="mx-4 my-2">
                    <p className="text-sm font-bold">Total Games</p>
                    <p className="text-lg font-bold">100</p>
                  </div>
                  <div className="mx-4 my-2">
                    <p className="text-sm font-bold">Streak</p>
                    <p className="text-lg font-bold">5</p>
                  </div>
                  <div className="mx-4 my-2">
                    <p className="text-sm font-bold">Highest Streak</p>
                    <p className="text-lg font-bold">10</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {reveal ? (
              <div className="keyboard py-20 px-40 bg-design-white">
                <button
                  onClick={undo}
                  className="bg-red-button text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="keyboard bg-design-white">
                {keyboardLayout.map((row, rowIndex) => (
                  <div key={rowIndex} className="keyboard-row">
                    {row.map((key, keyIndex) => (
                      <button
                        key={keyIndex}
                        onClick={() => handleKeyPress(key)}
                        className={
                          key === 'Space'
                            ? 'space-key'
                            : key === 'Enter'
                            ? 'guess-key'
                            : key === 'Hint'
                            ? 'hint-key'
                            : ''
                        }
                        disabled={checkDisableButton(key)}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Play;
