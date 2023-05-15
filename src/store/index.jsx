import { useReducer } from "react";
import { createContext } from "react";

export function AppContextSource() {

  const [{ scoreOpen, roundCount, players, deckSize, roundId }, dispatch] = useReducer((state, action) => {
    switch(action.type){
      case 'setScoreOpen': return {...state, scoreOpen: action.payload};
      case 'setRoundCount': return {...state, roundCount: action.payload};
      case 'setPlayers': return {...state, players: action.payload};
      case 'setDeckSize': return {...state, deckSize: action.payload};
      case 'setRoundId': return {...state, roundId: action.payload};
      default: return {...state};
    }
  }, {
    scoreOpen: false,
    roundCount: 0,
    players: [{
      name: `Player 1`,
      id: 1,
      rounds:[],
    }],
    deckSize: 52,
    roundId: 0
  })

  function setScoreOpen(isOpen) {
    dispatch({
      type: 'setScoreOpen',
      payload: isOpen
    })
  }

  function setRoundCount(count) {
    dispatch({
      type: 'setRoundCount',
      payload: count
    })
  }

  function setPlayers(newPLayers) {
    dispatch({
      type: 'setPlayers',
      payload: newPLayers
    })
  }

  function setRoundId(newRoundId) {
    dispatch({
      type: 'setRoundId',
      payload: newRoundId
    })
  }

  return {
    scoreOpen,
    setScoreOpen,
    roundCount,
    setRoundCount,
    players,
    setPlayers,
    deckSize,
    roundId,
    setRoundId
  }
}

export const AppContext = createContext()