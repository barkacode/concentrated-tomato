import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { formatTime, DEFAULT_TIMES } from "@/utils/time";

interface SettingsProps {
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

const Settings = ({ setTime }: SettingsProps) => {
  const [mode, setMode] = useState<keyof typeof DEFAULT_TIMES>("work");
  const [selectedTime, setSelectedTime] = useState<number>(DEFAULT_TIMES[mode]);
  const [open, setOpen] = useState<boolean>(false);

  const onClick = (value: number) => {
    setSelectedTime((prev) => prev + value);
  };

  const handleModeChange = (newMode: "work" | "pause" | "break") => {
    setMode(newMode);
    const newTime = DEFAULT_TIMES[newMode];
    setSelectedTime(newTime);
  };

  const onClose = (isValidated: boolean) => {
    if (isValidated) {
      setTime(selectedTime);
    }
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger>
        <Button>open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm py-4">
          <DrawerHeader>
            <DrawerTitle>Réglage du pomodoro</DrawerTitle>
            <DrawerDescription>Réglez la durée du pomodoro</DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center space-y-4">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onClick(-10)}
              disabled={selectedTime <= 0}
            >
              <Minus />
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">
                {formatTime(selectedTime)}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => onClick(10)}
              disabled={selectedTime >= 60 * 60}
            >
              <Plus />
            </Button>
          </div>

          <div className="flex space-x-4 mt-4">
            {[
              { id: "work", label: "Work", icon: "🔥" },
              { id: "pause", label: "Pause", icon: "☕" },
              { id: "break", label: "Break", icon: "😴" },
            ].map((period) => (
              <div key={period.id} className="flex flex-1">
                <input
                  type="radio"
                  name="period"
                  id={period.id}
                  checked={mode === period.id}
                  onChange={() =>
                    handleModeChange(period.id as keyof typeof DEFAULT_TIMES)
                  }
                  className="hidden peer"
                />
                <label
                  htmlFor={period.id}
                  className="flex flex-1 flex-col items-center rounded-lg peer bg-neutral-400 text-black px-4 peer-checked:bg-rose-500 peer-checked:text-white"
                >
                  <div>{period.label}</div>
                  <div>{period.icon}</div>
                </label>
              </div>
            ))}
          </div>
          <div className="flex mt-4 space-x-4">
            <Button variant={"outline"} onClick={() => onClose(false)}>
              Annuler
            </Button>
            <Button className="flex-1" onClick={() => onClose(true)}>
              Appliquer
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
