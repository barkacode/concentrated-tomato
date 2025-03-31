import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { formatTime } from "@/utils/time";

interface TimeSelectorProps {
  selectedTime: number;
  onTimeChange: (value: number) => void;
}

export const TimeSelector = ({
  selectedTime,
  onTimeChange,
}: TimeSelectorProps) => {
  
  const increment = 10;
  
  return (
    <div className="flex items-center space-y-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => onTimeChange(-increment)}
        disabled={selectedTime <= 10 || selectedTime >= 60 * 60}
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
        onClick={() => onTimeChange(increment)}
        disabled={selectedTime >= 60 * 60} // Maximum 60 minutes
      >
        <Plus />
      </Button>
    </div>
  );
};
