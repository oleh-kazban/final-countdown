import { useRef, useState } from 'react';
import ResultModal from './ResultModal';

const tickDuration = 10;

const TimerChallenge = ({ title, targetTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  const resultModal = useRef();
  const timer = useRef();

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    resultModal.current.open();
  }

  const handleStartChallenge = () => {
    timer.current = setInterval(() => {
      setTimeRemaining(prev => prev - tickDuration);
    }, tickDuration)
  }
  const handleStopChallenge = () => {
    clearInterval(timer.current);
    resultModal.current.open();
  }
  const handleReset = () => setTimeRemaining(targetTime * 1000);

  return (
    <>
      <ResultModal ref={resultModal} targetTime={targetTime} timeRemaining={timeRemaining} handleReset={handleReset}/>

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStopChallenge : handleStartChallenge}>{isTimerActive ? 'Stop' : 'Start'} Challenge</button>
        </p>
        <p className={isTimerActive ? 'active' : undefined}>Timer {isTimerActive ? 'active' : 'inactive'}</p>
      </section>
    </>
  );
};

export default TimerChallenge;
