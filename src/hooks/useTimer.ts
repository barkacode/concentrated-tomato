import { useState, useEffect, useCallback } from "react";
import {
  PomodoroStage,
  getStageDuration,
  getStageMessage,
} from "@/utils/time";
import { playSound, showNotification } from "@/utils/notification";
import { addSettingsChangeListener } from "@/utils/localStorage";

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

  const reset = useCallback(() => {
    const currentDuration = getStageDuration(stage);
    setInitTime(currentDuration);
    setTimeLeft(currentDuration);
    setIsRunning(false);
  }, [stage]);

  const changeStage = useCallback((newStage: PomodoroStage) => {
    const newTime = getStageDuration(newStage);
    setTimeLeft(newTime);
    setInitTime(newTime);
    setStage(newStage);
    setIsRunning(false);
  }, []);

  const nextStep = useCallback(() => {
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
  }, [step]);

  useEffect(() => {
    const handleSettingsChange = () => {
      if (!isRunning) {
        const newDuration = getStageDuration(stage);
        setInitTime(newDuration);
        setTimeLeft(newDuration);
      }
    };

    const unsubscribe = addSettingsChangeListener(handleSettingsChange);

    return () => unsubscribe();
  }, [stage, isRunning]);

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
  }, [timeLeft, isRunning, nextStep]);

  useEffect(() => {
    const currentDuration = getStageDuration(stage);
    setInitTime(currentDuration);
    setTimeLeft(currentDuration);
    
  }, [stage]);

  return {
    timeLeft,
    isRunning,
    stage,
    step,
    handleStart,
    reset,
    setStage: changeStage,
  };
};
