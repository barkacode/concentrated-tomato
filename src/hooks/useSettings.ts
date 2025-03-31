import { useState, useEffect } from "react";
import { PomodoroStage, getStageDuration } from "@/utils/time";
import { setStageDurationInStorage } from "@/utils/localStorage";

interface UseSettingsProps {
  currentStage: PomodoroStage;
  onStageChange: (stage: PomodoroStage) => void;
}

export const useSettings = ({ currentStage, onStageChange }: UseSettingsProps) => {
  const [selectedTime, setSelectedTime] = useState<number>(getStageDuration(currentStage));
  const [selectedStage, setSelectedStage] = useState<PomodoroStage>(currentStage);
  const [open, setOpen] = useState<boolean>(false);

  const handleTimeChange = (value: number) => {
    setSelectedTime((prev) => {
      // Limite min: 1 minute, max: 60 minutes
      const newValue = prev + value;
      if (newValue < 60) return 60; // Minimum 1 minute
      if (newValue > 3600) return 3600; // Maximum 60 minutes
      return newValue;
    });
  };

  const handleStageChange = (newStage: PomodoroStage) => {
    setSelectedStage(newStage);
    setSelectedTime(getStageDuration(newStage));
  };

  const handleClose = (isValidated: boolean) => {
    if (isValidated) {
      // Sauvegarder la nouvelle durée dans localStorage
      if (selectedTime !== getStageDuration(selectedStage)) {
        setStageDurationInStorage(selectedStage, selectedTime);
      }
      
      // Si on change de stage ou on est sur le même stage avec une nouvelle durée
      if (selectedStage !== currentStage || selectedTime !== getStageDuration(currentStage)) {
        onStageChange(selectedStage);
      }
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