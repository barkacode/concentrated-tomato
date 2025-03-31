import { Button } from "./ui/button";
import { formatTime, getStageTitle } from "@/utils/time";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { RotateCcw } from "lucide-react";
import { useTimer } from "@/hooks/useTimer";
import Settings from "./Settings";

export const Timer = () => {
  const { timeLeft, isRunning, stage, step, handleStart, reset, setStage } =
    useTimer();

  return (
    <Card className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {getStageTitle(stage)}
            {stage === "work" ? ` #${(step + 1) / 2}` : " ☕️"}
          </div>
          <Settings setStage={setStage} currentStage={stage} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="text-9xl font-londrina tabular-nums">
          {formatTime(timeLeft)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button className="flex-1 bg-amber-300" onClick={handleStart}>
          {isRunning ? "Pause" : "Start"}
        </Button>
        <Button className="group" onClick={reset}>
          <RotateCcw className="transition-transform group-active:-rotate-90" />
        </Button>
      </CardFooter>
    </Card>
  );
};
