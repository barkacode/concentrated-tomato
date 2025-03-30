import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Settings from "./components/Settings";

import { useTimer } from "./hooks/useTimer";
import { Timer } from "./components/Timer";

const App = () => {
  const {
    timeLeft,
    isRunning,
    stage,
    step,
    handleStart,
    reset,
    setStage
  } = useTimer();

  return (
    <div className="bg-background text-foreground h-screen flex flex-col items-center">
      <div className="text-6xl py-8">concentrated tomato</div>
      <Settings setStage={setStage} currentStage={stage} />
      <Timer
        isRunning={isRunning}
        timeLeft={timeLeft}
        stage={stage}
        step={step}
        onStart={handleStart}
        onReset={reset}
      />
    </div>
  );
};

export default App;
