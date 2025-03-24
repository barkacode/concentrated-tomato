import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Settings from "./components/Settings";
import { formatTime, DEFAULT_TIMES } from "./utils/time";

const App = () => {
  const [initTime, setInitTime] = useState<number>(DEFAULT_TIMES.work);
  const [timeLeft, setTimeLeft] = useState<number>(initTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [stage, setStage] = useState<number>(0);

  const reset = () => {
    setTimeLeft(initTime);
    setIsRunning(false);
  };

  const nextStep = () => {
    const newStep = step + 1;
    let newStage: number;
    if (newStep % 8 === 0) {
      newStage = 2; // break
    } else if (newStep % 2 === 0) {
      newStage = 1; // pause
    } else {
      newStage = 0; // travail
    }
    const newTime =
      DEFAULT_TIMES[
        Object.keys(DEFAULT_TIMES)[newStage] as keyof typeof DEFAULT_TIMES
      ];
    setTimeLeft(newTime);
    setInitTime(newTime);
    setStage(newStage);
    setStep((c) => c + 1);
    setIsRunning(true);
    return;
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 0) return prev - 1;
        else {
          setIsRunning(false); // Arrêter le minuteur
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Gérer les transitions entre les étapes
  useEffect(() => {
    if (timeLeft === 0) {
      nextStep();
    }
  }, [timeLeft]);

  return (
    <div className=" bg-background text-foreground h-screen flex flex-col  items-center">
      <div className="text-6xl py-8">concentrated tomato</div>
      <div className="text-4xl">{Object.keys(DEFAULT_TIMES)[stage]}</div>
      <div className="flex flex-col h-full justify-center">
        <Settings
          setTime={(time) => {
            setInitTime(time);
            setTimeLeft(time);
          }}
        />
        <div className="text-9xl font-mono">{formatTime(timeLeft)}</div>
        <div className="flex space-x-4 justify-center ">
          <Button onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button onClick={() => reset()}>Reset</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
