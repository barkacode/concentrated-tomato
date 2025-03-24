import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Settings from "./components/Settings";
import {
  PomodoroStage,
  formatTime,
  getStageDuration,
  getStageMessage,
  getStageTitle,
} from "./utils/time";

const App = () => {
  const [initTime, setInitTime] = useState<number>(getStageDuration("work"));
  const [timeLeft, setTimeLeft] = useState<number>(initTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [stage, setStage] = useState<PomodoroStage>("work");

  const handleStart = () => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    setIsRunning((prev) => !prev);
  };

  const reset = () => {
    setTimeLeft(initTime);
    setIsRunning(false);
  };

  const playSound = () => {
    const audio = new Audio("/sounds/ding.mp3");
    audio.play().catch((e) => console.log("Audio playback failed:", e));
  };

  const showNotification = (title: string) => {
    if (Notification.permission === "granted") {
      new Notification(title);
    }
  };

  const nextStep = () => {
    const newStep = step + 1;
    let newStage: PomodoroStage;

    if (newStep % 8 === 0) {
      newStage = "longBreak";
    } else if (newStep % 2 === 0) {
      newStage = "shortBreak";
    } else {
      newStage = "work";
    }

    const newTime = getStageDuration(newStage);

    setTimeLeft(newTime);
    setInitTime(newTime);
    setStage(newStage);
    setStep(newStep);

    playSound();

    showNotification(getStageMessage(newStage));
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft > 0 || isRunning) return;
    const timeout = setTimeout(nextStep, 300);

    return () => clearTimeout(timeout);
  }, [timeLeft, isRunning]);

  return (
    <div className="bg-background text-foreground h-screen flex flex-col items-center">
      <div className="text-6xl py-8">concentrated tomato</div>
      <div className="text-4xl capitalize">
        {getStageTitle(stage)} {stage === "work" ? `#${(step + 1) / 2}` : "☕️"}
      </div>
      <div className="flex flex-col h-full justify-center">
        <Settings
          setTime={(time) => {
            setInitTime(time);
            setTimeLeft(time);
          }}
        />
        <div className="text-9xl font-mono">{formatTime(timeLeft)}</div>
        <div className="flex space-x-4 justify-center">
          <Button onClick={handleStart}>{isRunning ? "Pause" : "Start"}</Button>
          <Button onClick={reset}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
