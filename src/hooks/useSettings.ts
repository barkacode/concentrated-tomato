import { useState, useEffect } from "react";
import { PomodoroStage, getStageDuration } from "@/utils/time";

interface UseSettingsProps {
  currentStage: PomodoroStage;
  onStageChange: (stage: PomodoroStage) => void;
}

export const useSettings = ({ currentStage, onStageChange }: UseSettingsProps) => {
  const [selectedTime, setSelectedTime] = useState<number>(getStageDuration(currentStage));
  const [selectedStage, setSelectedStage] = useState<PomodoroStage>(currentStage);
  const [open, setOpen] = useState<boolean>(false);

  const handleTimeChange = (value: number) => {
    setSelectedTime((prev) => prev + value);
  };

  const handleStageChange = (newStage: PomodoroStage) => {
    setSelectedStage(newStage);
    setSelectedTime(getStageDuration(newStage));
  };

  const handleClose = (isValidated: boolean) => {
    if (isValidated) {
      onStageChange(selectedStage);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setSelectedTime(getStageDuration(currentStage));
      setSelectedStage(currentStage);
    }
  }, [currentStage, open]);

  return {
    selectedTime,
    selectedStage,
    open,
    setOpen,
    handleTimeChange,
    handleStageChange,
    handleClose,
  };
}; 