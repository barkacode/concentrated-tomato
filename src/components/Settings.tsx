import { Settings as SettingsIcon, Info } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { PomodoroStage } from "@/utils/time";
import { TimeSelector } from "./TimeSelector";
import { useSettings } from "@/hooks/useSettings";
import { StageSelector } from "./StageSelector";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface SettingsProps {
  setStage: (stage: PomodoroStage) => void;
  currentStage: PomodoroStage;
  className?: string;
}

const Settings = ({ setStage, currentStage }: SettingsProps) => {
  const {
    selectedTime,
    selectedStage,
    open,
    setOpen,
    handleTimeChange,
    handleStageChange,
    handleClose,
    resetToDefaults,
  } = useSettings({ currentStage, onStageChange: setStage });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button variant="ghost">
          <SettingsIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-4">
          <DrawerHeader>
            <DrawerTitle className="flex items-center justify-between">
              <span>Réglage du pomodoro</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-neutral-500 hover:text-neutral-200" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs p-4 rounded-xl flex flex-col gap-2 items-start">
                    <p className="text-sm">
                      La technique Pomodoro recommande 25 minutes de travail
                      concentré suivi de 5 minutes de pause. Après 4 cycles,
                      prenez une pause plus longue de 15 minutes.
                    </p>
                    <p className="text-sm underline-offset-4 hover:underline hover:cursor-pointer" onClick={resetToDefaults}>
                      Réinitialiser les valeurs par défaut
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DrawerTitle>
          </DrawerHeader>

          <TimeSelector
            selectedTime={selectedTime}
            onTimeChange={handleTimeChange}
          />

          <StageSelector
            selectedStage={selectedStage}
            onStageChange={handleStageChange}
          />

          <div className="flex mt-4 space-x-4">
            <Button variant="outline" onClick={() => handleClose(false)}>
              Annuler
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={() => handleClose(true)}
            >
              Appliquer
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
