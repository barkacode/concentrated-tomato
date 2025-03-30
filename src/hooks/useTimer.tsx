import { useState, useEffect } from "react";
import { PomodoroStage, getStageDuration, getStageMessage, getStageTitle, formatTime } from "@/utils/time";
import { playSound, showNotification } from "@/utils/notification";

export const useTimer = () => {
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
    setIsRunning(true);
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
    const timeout = setTimeout(nextStep, 10);

    return () => clearTimeout(timeout);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    setInitTime(getStageDuration(stage));
    setTimeLeft(getStageDuration(stage));
  }, [stage]);

  return {
    timeLeft,
    isRunning,
    stage,
    step,
    handleStart,
    reset,
    setStage,
    formatTime,
    getStageTitle,
  };
};
