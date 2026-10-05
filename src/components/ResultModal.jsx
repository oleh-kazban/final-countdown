import { useImperativeHandle, useRef } from 'react';

const ResultModal = ({targetTime, timeRemaining, ref, handleReset}) => {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => dialog.current.showModal()
    };
  })

  const userWon = timeRemaining > 0;
  const score = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);
  const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);

  return (
    <dialog ref={dialog} className="result-modal" onClose={handleReset}>
      <h2>{userWon ? `Your score: ${score}` : 'You lost'}</h2>
      <p>
        The target time was <strong>{targetTime} second{targetTime > 1 ? 's' : ''}.</strong>
      </p>
      <p>
        You stopped the timer with <strong>{formattedTimeRemaining} second{timeRemaining > 1 ? 's' : ''} left.</strong>
      </p>
      <form method="dialog" onSubmit={handleReset}>
        <button>Close</button>
      </form>
    </dialog>
  );
}

export default ResultModal;
