import { useState } from 'react';


/**
 * 
 * @param {String} initial - initial state of a component
 * @returns new mode and a transition and back functions
 */
export default function useVisualMode(initial){
  
  // keeps track of each mode (EMPTY, SHOW, CREATE/EDIT, SAVING/DELETING, CONFIRM)
  const [mode, setMode] = useState(initial);
  // keeps track of each mode when user wants to go back to previous view
  // e.g. after cancelling, or hitting the X icon
  const [history, setHistory] = useState([initial]);

  // allows use to advance to any other mode
  const  transition = (newMode, replace = false)  => {

  if (replace) {
    setHistory(prev => {
      const newHistory = [...prev];
      newHistory[newHistory.length-1] = newMode 
      return newHistory;
    })
  } else {
    setHistory(prev => [...prev, newMode]);
  }
  setMode(newMode);
}

  // allows user to return to previous mode (e.g canceling)
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => { 
       const newHistory = [...prev];
       newHistory.pop();
       return newHistory;
      })
    }

  }
  return { mode, transition, back};
}


