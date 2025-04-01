import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { formatTime } from "@/utils/time";
import { useEffect, useRef, useState } from "react";

interface TimeSelectorProps {
  selectedTime: number;
  onTimeChange: (value: number) => void;
}

export const TimeSelector = ({
  selectedTime,
  onTimeChange,
}: TimeSelectorProps) => {
  
  const increment = 10;
  
  const [isIncrementing, setIsIncrementing] = useState(false);
  const [isDecrementing, setIsDecrementing] = useState(false);
  
  const incrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const decrementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const initialDelay = 1000; // ms
  const repeatInterval = 100; // ms
  
  // Fonction pour incrémenter ou décrémenter
  const changeTime = (value: number) => {
    onTimeChange(value);
  };
  
  // Gestionnaires pour le maintien
  const handleIncrementStart = () => {
    if (selectedTime < 60 * 60) {
      changeTime(increment);
    }
    
    // Démarrer le mode continu après le délai initial
    incrementIntervalRef.current = setTimeout(() => {
      setIsIncrementing(true);
    }, initialDelay);
  };
  
  const handleIncrementEnd = () => {
    if (incrementIntervalRef.current) {
      clearTimeout(incrementIntervalRef.current);
      incrementIntervalRef.current = null;
    }
    setIsIncrementing(false);
  };
  
  const handleDecrementStart = () => {
    if (selectedTime > increment) {
      changeTime(-10);
    }
    
    // Démarrer le mode continu après le délai initial
    decrementIntervalRef.current = setTimeout(() => {
      setIsDecrementing(true);
    }, initialDelay);
  };
  
  const handleDecrementEnd = () => {
    if (decrementIntervalRef.current) {
      clearTimeout(decrementIntervalRef.current);
      decrementIntervalRef.current = null;
    }
    setIsDecrementing(false);
  };
  
  // Effet pour gérer l'incrément continu
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isIncrementing) {
      interval = setInterval(() => {
        if (selectedTime < 60 * 60) {
          changeTime(increment);
        } else {
          handleIncrementEnd();
        }
      }, repeatInterval);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isIncrementing, selectedTime]);
  
  // Effet pour gérer le décrément continu
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isDecrementing) {
      interval = setInterval(() => {
        if (selectedTime > increment) {
          changeTime(-60);
        } else {
          handleDecrementEnd();
        }
      }, repeatInterval);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isDecrementing, selectedTime]);
  
  return (
    <div className="flex items-center space-y-4">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onMouseDown={handleDecrementStart}
        onMouseUp={handleDecrementEnd}
        onMouseLeave={handleDecrementEnd}
        onTouchStart={handleDecrementStart}
        onTouchEnd={handleDecrementEnd}
        disabled={selectedTime <= increment}
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
        onMouseDown={handleIncrementStart}
        onMouseUp={handleIncrementEnd}
        onMouseLeave={handleIncrementEnd}
        onTouchStart={handleIncrementStart}
        onTouchEnd={handleIncrementEnd}
        disabled={selectedTime >= 60 * 60}
      >
        <Plus />
      </Button>
    </div>
  );
};
