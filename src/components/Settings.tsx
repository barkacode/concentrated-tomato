import { Settings as SettingsIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { PomodoroStage } from "@/utils/time";
import { TimeSelector } from "./TimeSelector";
import { useSettings } from "@/hooks/useSettings";
import { StageSelector } from "./StageSelector";


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
            <DrawerTitle>Réglage du pomodoro</DrawerTitle>
            <DrawerDescription>Réglez la durée du pomodoro</DrawerDescription>
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
            <Button className="flex-1" onClick={() => handleClose(true)}>
              Appliquer
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
