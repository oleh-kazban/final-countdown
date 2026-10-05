# The Almost Final Countdown

A small React timer game. Pick a challenge, start the timer, and try to stop it as close to zero as possible without letting it run out.

## How it works

- Enter a player name in the header (defaults to "unknown entity").
- Four challenges are available:

  | Challenge     | Target time |
  | ------------- | ----------- |
  | Easy          | 1 second    |
  | Not easy      | 5 seconds   |
  | Getting tough | 10 seconds  |
  | Pros only     | 15 seconds  |

- Click **Start Challenge**. The card flashes and shows "Timer active"; the button turns into **Stop Challenge**.
- Stopping the timer, or letting it reach zero, opens a result modal:
  - **You lost** if the time ran out (0.00 seconds left).
  - **Your score: N** otherwise, where `score = round((1 - timeRemaining / targetTime) * 100)`. The closer to zero, the higher the score.
- Closing the modal resets the challenge.

## Tech stack

- React 19
- Vite 4
- Plain CSS (`src/index.css`)

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

| Command           | Description                    |
| ----------------- | ------------------------------ |
| `npm run build`   | Production build               |
| `npm run preview` | Preview the production build   |
| `npm run lint`    | Run ESLint                     |

## Project structure

```
src/
  App.jsx                    Renders the player and four challenges
  main.jsx                   Entry point
  index.css                  Global and component styles
  components/
    Player.jsx               Name input and greeting
    TimerChallenge.jsx       Challenge card with start/stop logic
    ResultModal.jsx          Native <dialog> showing the result
```

## Implementation notes

- `TimerChallenge` keeps the remaining time in state and ticks every 10 ms via `setInterval`, stored in a ref.
- `ResultModal` is a native `<dialog>` opened with `showModal()`. It exposes an `open()` method to its parent through `useImperativeHandle`, and the `ref` is passed as a regular prop (React 19).
- The modal's `onClose` and form submit both reset the timer.
