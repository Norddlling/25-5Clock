const App = () => {
  
  const [breakState, setBreakState] = React.useState(5);
  const [sessionState, setSessionState] = React.useState(25);
  const [displayState, setDisplayState] = React.useState("Session");
  const [timerMinutesState, setTimerMinutesState] = React.useState(25);
  const [timerSecondsState, setTimerSecondsState] = React.useState("00");
  const [playState, setPlayState] = React.useState(false);
  const [playPauseButton, setPlayPauseButton] = React.useState("glyphicon glyphicon-play p-1");
  const audio = React.useRef();
  
  React.useEffect(() => {
    setTimerSecondsState(prevTimerSecondsState => prevTimerSecondsState.toString());
    setTimerMinutesState(prevTimerMinutesState => prevTimerMinutesState.toString());
    if(timerMinutesState < 10 && timerMinutesState.length <= 1) {
      setTimerMinutesState(prevTimerMinutesState => "0" + prevTimerMinutesState);
    }
    if(timerSecondsState < 10 && timerSecondsState.length <= 1) {
      setTimerSecondsState(prevTimerSecondsState => "0" + prevTimerSecondsState);
    }
    if(timerMinutesState <= "00" && timerSecondsState <= "00" && displayState == "Session") {
      setPlayState(false);
      audio.current.play();
      setTimeout(() => {setDisplayState("Break"), setTimerMinutesState(breakState), setPlayState(true)}, 3000);
    } else if (timerMinutesState <= "00" && timerSecondsState <= "00" && displayState == "Break") {
      setPlayState(false);
      audio.current.play();
      setTimeout(() => {setDisplayState("Session"), setTimerMinutesState(sessionState), setPlayState(true)}, 3000);
    }
    const interval = setInterval(() => {
      if(playState) {
        if(timerSecondsState == 0 || timerSecondsState == "00") {
          setTimerMinutesState(prevTimerMinutesState => prevTimerMinutesState - 1)
          setTimerSecondsState(60);
        }
        setTimerSecondsState(prevTimerSecondsState => prevTimerSecondsState - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playState, timerMinutesState, timerSecondsState, displayState]);
  
   React.useEffect(() => {
     if(displayState == "Session" && playState == false) {
       setTimerMinutesState(sessionState);
     } else if (displayState == "Break" && playState == false) {
       setTimerMinutesState(breakState);
     }
   }, [sessionState, breakState, displayState])
  
  const breakDecrement = () => {
    if(breakState > 1 && playState == false) {
      setBreakState(prevBreakState => prevBreakState - 1);
      setTimerSecondsState("00");
    }
  }
  
  const breakIncrement = () => {
    if(breakState < 60 && playState == false) {
      setBreakState(prevBreakState => prevBreakState + 1);
      setTimerSecondsState("00");
    }
  }
  
  const sessionDecrement = () => {
    if(sessionState > 1 && playState == false) {
      setSessionState(prevSessionState => prevSessionState - 1);
      setTimerSecondsState("00");
    }
  }
  
  const sessionIncrement = () => {
    if(sessionState < 60 && playState == false) {
      setSessionState(prevSessionState => prevSessionState + 1);
      setTimerSecondsState("00");
    }
  }
  
  const playPause = () => {
    if(playState == false) {
      setPlayState(true);
      setPlayPauseButton("glyphicon glyphicon-pause p-1");
    } else {
      setPlayState(false);
      setPlayPauseButton("glyphicon glyphicon-play p-1");
    }
  }
  
  const reset = () => {
    setBreakState(5);
    setSessionState(25);
    setDisplayState("Session");
    setTimerMinutesState(25);
    setTimerSecondsState("00");
    setPlayState(false);
    setPlayPauseButton("glyphicon glyphicon-play p-1");
    audio.current.load();
  }
  
  return (
    <div className="p-2 border rounded shadow-lg">
      <div className="d-flex align-items-center justify-content-center text-center border-bottom">
        <div id="break-label" className="p-1 m-1">
          <div className="border-bottom">Break Length</div>
          <div id="break-length" className="p1 m-1 display-6">{breakState}</div>
          <div>
            <button id="break-decrement" type="button" className="rounded-circle btn btn-primary border shadow m-1" onClick={breakDecrement}><span className="glyphicon glyphicon-menu-down p-1"></span></button>
            <button id="break-increment" type="button" className="rounded-circle btn btn-primary border shadow m-1" onClick={breakIncrement}><span className="glyphicon glyphicon-menu-up p-1"></span></button>
          </div>
        </div>
        <div id="session-label" className="p-1 m-1">
          <div className="border-bottom">Session Length</div>
          <div id="session-length" className="p1 m-1 display-6">{sessionState}</div>
          <div>
            <button id="session-decrement" type="button" className="rounded-circle btn btn-primary border shadow m-1" onClick={sessionDecrement}><span className="glyphicon glyphicon-menu-down p-1"></span></button>
            <button id="session-increment" type="button" className="rounded-circle btn btn-primary border shadow m-1" onClick={sessionIncrement}><span className="glyphicon glyphicon-menu-up p-1"></span></button>
          </div>
        </div>
      </div>
      <div className="p-1 m-1">
        <div id="timer-label" className="text-center border-bottom">{displayState}</div>
        <div id="time-left" className="text-center display-1">
          {timerMinutesState}:{timerSecondsState}
          <audio id="beep" ref={audio} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      </div>
      <div className="text-center p-1 m-1 border-bottom">
        <button type="button" className="rounded-circle btn btn-primary border shadow m-1" id="start_stop" onClick={playPause}><span className={playPauseButton}></span></button>
        <button type="button" className="rounded-circle btn btn-primary border shadow m-1" id="reset" onClick={reset}><span className="glyphicon glyphicon-remove p-1"></span></button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
