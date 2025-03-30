import { Button } from "./ui/button";
import { formatTime, getStageTitle, PomodoroStage } from "@/utils/time";

interface TimerProps {
  timeLeft: number;
  isRunning: boolean;
  stage: PomodoroStage;
  step: number;
  onStart: () => void;
  onReset: () => void;
}

export const Timer = ({ timeLeft, isRunning, stage, step, onStart, onReset }: TimerProps) => {
  return (
    <div className="flex flex-col items-center bg-neutral-200 rounded-lg p-4">
      <div className="text-4xl capitalize">
        {getStageTitle(stage)} {stage === "work" ? `#${(step + 1) / 2}` : "☕️"}
      </div>
      <div className="text-9xl font-londrina">{formatTime(timeLeft)}</div>
      <div className="flex space-x-4 justify-center">
        <Button onClick={onStart}>{isRunning ? "Pause" : "Start"}</Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
};