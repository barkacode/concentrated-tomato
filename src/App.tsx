import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Settings from "./components/Settings";
import { formatTime, DEFAULT_TIMES } from "./utils/time";

const App = () => {
  const [initTime, setInitTime] = useState<number>(DEFAULT_TIMES.work);
  const [timeLeft, setTimeLeft] = useState<number>(initTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const reset = () => {
    setTimeLeft(initTime);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className=" bg-background text-foreground h-screen flex flex-col justify-center items-center">
      <Settings
        setTime={(time) => {
          setInitTime(time);
          setTimeLeft(time);
        }}
      />
      <div className="text-9xl font-mono">{formatTime(timeLeft)}</div>
      <div className="flex space-x-4 mt-4">
        <Button onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    </div>
  );
};

export default App;
